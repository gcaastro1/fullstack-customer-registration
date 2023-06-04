import { customerData } from '@/schemas/customer.schema';
import { ReactNode, useContext, useState, createContext } from 'react';
import {} from 'vm';

interface Props {
  children: ReactNode;
}

interface CustomerProviderData {
  customers: customerData[];
}

const CustomerContext = createContext<CustomerProviderData>(
  {} as CustomerProviderData
);

export const CustomerProvider = ({ children }: Props) => {
  const [customers, setCustomers] = useState<customerData[]>([]);

  return (
    <CustomerContext.Provider value={{ customers }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
