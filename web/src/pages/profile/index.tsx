import React, { useEffect } from 'react';
import { customerData } from '@/schemas/customer.schema';
import api from '@/services/api';
import { GetServerSideProps, NextPage } from 'next';
import jwt_decode from 'jwt-decode';

import nookies from 'nookies';
import { ProfileCard } from '@/components/profileCard';
import Header from '@/components/header';
import { Modal } from '@/components/modal';
import { useCustomer } from '@/contexts/customerContext';
import { ContactCard } from '@/components/contactCard';
import { ContactForm } from '@/components/contactForm';
import { UpdateCustomerForm } from '@/components/updateCustomerForm';

interface CustomersProps {
  customer: customerData;
}

const Profile: NextPage<CustomersProps> = ({ customer }) => {
  const { contacts, setContacts, openModal, closeModal, isOpen, modalType } =
    useCustomer();

  useEffect(() => {
    setContacts(customer.contacts);
  });

  return (
    <main className={`body justify-center`}>
      <div className={'mx-auto max-w-2xl lg:mx-0'}>
        <Header openModal={openModal} />
        <ProfileCard
          key={customer.id}
          customer={customer}
          openModal={openModal}
        />

        <ul className={'container overflow-auto max-h-[600px]'}>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                openModal={openModal}
              />
            ))
          ) : (
            <li className={'text-center'}>
              Ainda não possui contatos cadastrados.
            </li>
          )}
        </ul>
      </div>
      {isOpen ? (
        modalType === 'contact' ? (
          <Modal title="Cadastrar contato" onClose={closeModal}>
            <ContactForm />
          </Modal>
        ) : modalType === 'customer' ? (
          <Modal title="Editar perfil" onClose={closeModal}>
            <UpdateCustomerForm customer={customer} />
          </Modal>
        ) : (
          <Modal title="Editar contato" onClose={closeModal}>
            <ContactForm />
          </Modal>
        )
      ) : null}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies['myconts.token'];

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const decoded: any = jwt_decode(token);

  api.defaults.headers.common.authorization = `Bearer ${token}`;
  const response = await api.get<customerData[]>(`/customers/${decoded.sub}`);

  return {
    props: { customer: response.data },
  };
};

export default Profile;
