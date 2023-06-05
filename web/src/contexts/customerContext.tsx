import Toast from '@/components/toast';
import {
  contactData,
  createContactData,
  updateContactData,
} from '@/schemas/contact.schema';
import { customerData, updateCustomerData } from '@/schemas/customer.schema';
import api from '@/services/api';
import { destroyCookie, parseCookies } from 'nookies';
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

interface CustomerProviderData {
  contactSubmit: (data: createContactData | updateContactData) => void;
  closeModal: () => void;
  openModal: (mtype: string) => void;
  update: (data: updateCustomerData) => void;
  deleteContact: (id: string) => void;
  deleteCustomer: () => void;
  setContacts: Dispatch<SetStateAction<contactData[]>>;
  setCurrContact: Dispatch<SetStateAction<contactData | null>>;
  isOpen: boolean;
  modalType: string;
  currContact: contactData | null;
  contacts: contactData[];
}

const CustomerContext = createContext<CustomerProviderData>(
  {} as CustomerProviderData
);

export const CustomerProvider = ({ children }: Props) => {
  const [contacts, setContacts] = useState<contactData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currContact, setCurrContact] = useState<contactData | null>(null);

  const router = useRouter();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (mtype: string) => {
    setModalType(mtype);
    setIsOpen(true);
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const contactSubmit = (data: createContactData | updateContactData) => {
    const cookies = parseCookies();

    api.defaults.headers.common.authorization = `Bearer ${cookies['myconts.token']}`;
    if (modalType === 'contact') {
      api
        .post('/contacts', data)
        .then((res) => {
          refreshData();
          Toast({ message: 'Contato criado com sucesso!', isSuccess: true });
          setContacts([...contacts, res.data]);
        })
        .catch((err) => {
          console.error(err);
          Toast({
            message: 'Erro ao cadastrar contato.',
            isSuccess: false,
          });
        });
    } else if (modalType === 'edit_contact') {
      api
        .patch('/contacts', data)
        .then((res) => {
          refreshData();
          Toast({ message: 'Contato editado com sucesso!', isSuccess: true });

          const index = contacts.findIndex(
            (contact) => contact.id === currContact!.id
          );

          contacts[index] = res.data;

          setContacts(contacts);
        })
        .catch((err) => {
          console.error(err);
          Toast({
            message: 'Erro ao cadastrar contato.',
            isSuccess: false,
          });
        });
    }

    setIsOpen(false);
  };

  const update = (data: updateCustomerData) => {
    const cookies = parseCookies();
    const decoded: any = jwt_decode(cookies['myconts.token']);

    if (data.password === '') delete data.password;

    api.defaults.headers.common.authorization = `Bearer ${cookies['myconts.token']}`;

    api
      .patch(`/customers/${decoded.sub}`, data)
      .then(() => {
        refreshData();
        Toast({ message: 'Editado com sucesso!', isSuccess: true });
      })
      .catch((err) => {
        console.error(err);
        Toast({
          message: 'Erro ao editar usuário. Verifique o email utilizado.',
          isSuccess: false,
        });
      });

    setIsOpen(false);
  };

  const deleteCustomer = () => {
    const cookies = parseCookies();
    const decoded: any = jwt_decode(cookies['myconts.token']);

    api.defaults.headers.common.authorization = `Bearer ${cookies['myconts.token']}`;
    api
      .delete(`/customers/${decoded.sub}`)
      .then(() => {
        refreshData();
        Toast({ message: 'Deletado com sucesso!', isSuccess: true });
        setIsOpen(false);
        destroyCookie(null, 'myconts.token');
        router.push('/');
      })
      .catch((err) => {
        console.error(err);
        Toast({
          message: 'Erro ao deletar conta.',
          isSuccess: false,
        });
      });
  };

  const deleteContact = (id: string) => {
    const cookies = parseCookies();

    api.defaults.headers.common.authorization = `Bearer ${cookies['myconts.token']}`;
    api
      .delete(`/contacts/${id}`)
      .then(() => {
        refreshData();
        Toast({ message: 'Deletado com sucesso!', isSuccess: true });
        setIsOpen(false);
      })
      .catch((err) => {
        console.error(err);
        Toast({
          message: 'Erro ao deletar contato.',
          isSuccess: false,
        });
      });
  };

  return (
    <CustomerContext.Provider
      value={{
        contacts,
        setContacts,
        contactSubmit,
        closeModal,
        openModal,
        isOpen,
        modalType,
        currContact,
        setCurrContact,
        update,
        deleteContact,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
