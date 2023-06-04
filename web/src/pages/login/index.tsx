import { NextPage } from 'next';
import { CaretLeft } from 'phosphor-react';
import Link from 'next/link';
import { LoginForm } from '@/components/loginForm';

const Login: NextPage = () => {
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
        <LoginForm />
      </div>
    </main>
  );
};

export default Login;
