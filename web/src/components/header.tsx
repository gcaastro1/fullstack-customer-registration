import Image from 'next/image';
import logo from '../../public/logo.svg';
import { useCustomer } from '@/contexts/customerContext';

interface IHeaderProps {
  openModal: (mtype: string) => void;
}

const Header = ({ openModal }: IHeaderProps) => {
  const { setCurrContact } = useCustomer();

  const createContact = () => {
    setCurrContact(null);
    openModal('contact');
  };

  return (
    <div className={'my-4 flex flex-row items-center justify-between'}>
      <h3
        className={
          'text-1xl font-bold tracking-tight text-gray-800 sm:text-2xl'
        }
      >
        <Image src={logo} alt="Logo" className="w-[140px] sm:w-[180px] mb-2" />
      </h3>
      <button className={'button-primary'} onClick={() => createContact()}>
        Adicionar Contato
      </button>
    </div>
  );
};

export default Header;
