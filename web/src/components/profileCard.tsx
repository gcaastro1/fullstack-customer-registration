import { useAuth } from '@/contexts/authContext';
import { customerData } from '@/schemas/customer.schema';
import { PencilSimple, Power, User } from 'phosphor-react';

interface ICardProps {
  customer: customerData;
  openModal: (mtype: string) => void;
}

export const ProfileCard = ({ customer, openModal }: ICardProps) => {
  const { logout } = useAuth();

  return (
    <div
      className={
        'flex flex-row items-center justify-between bg-gray-100 rounded-2xl p-4 max-w-full sm:w-[600px] gap-4'
      }
    >
      <div className="flex flex-row items-center gap-4">
        <User
          size={50}
          className={'bg-slate-800 rounded-full p-2 text-gray-100'}
        />
        <div>
          <p className="font-bold text-xl">{customer.name}</p>
          <p className="text-md text-gray-600">{customer.email}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button className={'button-icon'}>
          <PencilSimple size={20} onClick={() => openModal('customer')} />
        </button>
        <button className={'button-icon'} onClick={() => logout()}>
          <Power size={20} />
        </button>
      </div>
    </div>
  );
};
