import { useCustomer } from '@/contexts/customerContext';
import { contactData } from '@/schemas/contact.schema';
import { PencilSimple, User } from 'phosphor-react';

interface ICardProps {
  contact: contactData;
  openModal: (mtype: string) => void;
}

export const ContactCard = ({ contact, openModal }: ICardProps) => {
  const { setCurrContact } = useCustomer();

  const editContact = () => {
    setCurrContact(contact);
    openModal('edit_contact');
  };

  return (
    <li className={'flex flex-row'}>
      <div
        className={
          'flex flex-row justify-between items-center  h-16 border-b-2 border-gray-300 pb-6 w-full'
        }
      >
        <div className={'flex flex-row gap-4 items-center'}>
          <User
            size={40}
            className={'bg-slate-800 rounded-full p-2 text-gray-100'}
          />
          <div className={'flex flex-col justify-center'}>
            <p className={'font-bold text-gray-800'}>{contact.name}</p>
            <p className={'text-gray-500'}>{contact.email}</p>
          </div>
        </div>
        <button className={'button-icon'}>
          <PencilSimple size={20} onClick={() => editContact()} />
        </button>
      </div>
    </li>
  );
};
