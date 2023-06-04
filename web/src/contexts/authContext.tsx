import { loginData, registerData } from '@/schemas/customer.schema';
import api from '@/services/api';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { ReactNode, useContext, createContext } from 'react';
import Toast from '@/components/toast';

interface Props {
  children: ReactNode;
}

interface AuthProviderData {
  register: (registerData: registerData) => void;
  login: (loginData: loginData) => void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const register = ({ name, email, password, phone }: registerData) => {
    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };

    api
      .post('/customers', data)
      .then(() => {
        Toast({ message: 'Cadastrado com sucesso!', isSuccess: true });
        router.push('/login');
      })
      .catch((err) => {
        console.error(err);
        Toast({
          message: 'Erro ao cadastrar usuário. Verifique o email utilizado.',
          isSuccess: false,
        });
      });
  };

  const login = (loginData: loginData) => {
    api
      .post('/login', loginData)
      .then((res) => {
        setCookie(null, 'myconts.token', res.data.token, {
          maxAge: 60 * 30,
          path: '/customers',
        });
      })
      .then(() => {
        Toast({ message: 'Login realizado com sucesso!', isSuccess: true });
        router.push('/customers');
      })
      .catch((err) => {
        console.error(err);
        Toast({
          message: 'Erro ao logar. Verifique o email e senha utilizado.',
          isSuccess: false,
        });
      });
  };

  return (
    <AuthContext.Provider value={{ register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
