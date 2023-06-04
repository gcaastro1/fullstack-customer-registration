import { RegisterForm } from '@/components/registerForm';
import { NextPage } from 'next';
import Link from 'next/link';

import { CaretLeft } from 'phosphor-react';

export const Register: NextPage = () => {
  return (
    <main className={`body justify-center`}>
      <div className={'mx-auto max-w-2xl lg:mx-0 w-full'}>
        <Link
          href={`/`}
          className="flex flex-row items center font-bold text-gray-200"
        >
          <CaretLeft size={32} />
          Voltar
        </Link>
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
