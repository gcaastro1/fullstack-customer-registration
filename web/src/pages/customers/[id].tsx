import { customerData } from '@/schemas/customer.schema';
import api from '@/services/api';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { CaretLeft } from 'phosphor-react';

interface CustomerProps {
  customer: customerData;
}

const CustomerProfile: NextPage<CustomerProps> = ({
  customer,
}: CustomerProps) => {
  return (
    <main
      className={
        'flex min-h-screen flex-col items-center justify-center p-10 ${inter.className}'
      }
    >
      <div className={'mx-auto max-w-2xl lg:mx-0 w-full'}>
        <Link href={`/`} className="flex flex-row items center font-bold">
          <CaretLeft size={32} />
          Voltar
        </Link>
        <p>Cliente</p>
        {customer.name}
      </div>
    </main>
  );
};

export const getStaticPaths = async ({}) => {
  return {
    paths: [
      {
        params: { id: '1' },
      },
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<CustomerProps> = async (ctx) => {
  const id = ctx.params!.id;
  const response = await api.get<customerData>(`/customers/${id}`);

  return { props: { customer: response.data }, revalidate: 60 };
};

export default CustomerProfile;
