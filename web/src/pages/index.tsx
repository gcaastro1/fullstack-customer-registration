import React from 'react';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import Link from 'next/link';
import { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className={`body justify-center`}>
      <div className={'max-w-2xl flex flex-col'}>
        <Image src={logo} alt="Logo" className="max-w-full w-[380px] mb-2" />
        <p className={'max-w-full sm:w-[380px] text-gray-400 text-xl mb-10'}>
          Uma agenda de contatos feita especialmente para você!
        </p>
        <Link className="button-primary w-full" href={'/register'}>
          Cadastrar
        </Link>
        <div className={'flex flex-row mt-4 gap-2 items-center self-center'}>
          <p className={'text-gray-400 text-md'}>Ja possui uma conta?</p>
          <Link
            href={'/login'}
            className={'text-gray-200 text-md font-bold hover:text-blue-400'}
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
