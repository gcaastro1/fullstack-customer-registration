import React from 'react';
import { Card } from '@/components/card';
import { customerData } from '@/schemas/customer.schema';
import api from '@/services/api';
import { GetServerSideProps, NextPage } from 'next';
import { Inter } from 'next/font/google';
import { AddressBook } from 'phosphor-react';

const inter = Inter({ subsets: ['latin'] });

interface CustomersProps {
  customers: customerData[];
}

const Customers: NextPage<CustomersProps> = ({ customers }) => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <main className={`body ${inter.className}`}>
      <div className={'mx-auto max-w-2xl lg:mx-0'}>
        <div className={'flex flex-row gap-1 items-center'}>
          <AddressBook size={50} className={'text-primary-700'} />
          <h2 className={'title'}>MyConts</h2>
        </div>

        <p className={'mt-6 text-lg leading-8 text-gray-300'}>
          Aplicação para cadastro e visualização de clientes e contatos
          utilizando Typescript, Next.js e Nest.
        </p>

        <div className={'my-4 flex flex-row justify-between'}>
          <h3
            className={
              'text-1xl font-bold tracking-tight text-gray-800 sm:text-2xl'
            }
          >
            Lista de Clientes
          </h3>
          <button
            className={'button-primary'}
            onClick={() => setShowModal(true)}
          >
            Cadastrar cliente
          </button>
        </div>

        <ul className={'grid gap-4 md:grid-cols-2 sm:grid-cols-1'}>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <Card key={customer.id} customer={customer} />
            ))
          ) : (
            <li className={'font-bold text-gray-800'}>
              Nenhum cliente cadastrado
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (cxt) => {
  const response = await api.get<customerData[]>('/customers');

  return {
    props: { customers: response.data },
  };
};

export default Customers;
