import { useAuth } from '@/contexts/authContext';
import { loginData, loginSchema } from '@/schemas/customer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

export const LoginForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit: SubmitHandler<loginData> = (data) => login(data);

  return (
    <form className={'container'} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={'w-full px-3 mb-6'}>
        <p className={'font-bold text-2xl text-center'}>Login</p>
      </div>
      <div className="w-full px-3">
        <label className={'input-label'} htmlFor="email">
          Email
        </label>
        <input
          className={'input'}
          id="email"
          type="email"
          placeholder="Digite seu email."
          {...register('email')}
        />
        {errors.email && (
          <span className={'text-error'}>{errors.email.message}</span>
        )}
      </div>
      <div className="w-full px-3">
        <label className={'input-label'} htmlFor="password">
          Senha
        </label>
        <input
          className={'input'}
          id="password"
          type="password"
          placeholder="Digite sua senha."
          {...register('password')}
        />
        {errors.password && (
          <span className={'text-error'}>{errors.password.message}</span>
        )}
      </div>
      <div className={'w-full px-3 mt-4'}>
        <button className={'button-primary w-full'} type="submit">
          Entrar
        </button>
      </div>
    </form>
  );
};
