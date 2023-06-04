import { customerData } from '@/schemas/customer.schema';
import { Dropdown } from '@nextui-org/react';
import Link from 'next/link';
import { DotsThree, Eye } from 'phosphor-react';

interface ICardProps {
  customer: customerData;
}

export const Card = ({ customer }: ICardProps) => {
  return (
    <li className={'flex flex-row'}>
      <div
        className={
          'w-20 h-16 flex items-center justify-center bg-primary-600 rounded-l-lg'
        }
      >
        <h1 className={'text-2xl font-bold text-gray-50'}>
          {customer.name.substring(0, 2).toLocaleUpperCase()}
        </h1>
      </div>
      <div
        className={
          'flex flex-row justify-between items-center  h-16 border-2 border-gray-300 rounded-r-lg px-4 w-full'
        }
      >
        <div className={'flex flex-col justify-center'}>
          <p className={'font-bold text-gray-800'}>{customer.name}</p>
          <p className={'text-sm text-gray-500'}>
            {customer.contacts.length} Contato
          </p>
        </div>
        <Link
          href={`/customers/${customer.id}`}
          className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-2.5 py-2.5 text-center"
        >
          <Eye size={16} />
        </Link>
      </div>
    </li>
  );
};
