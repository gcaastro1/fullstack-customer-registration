import { SubmitHandler, useForm } from 'react-hook-form';
import { registerData, registerSchema } from '../schemas/customer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/authContext';

export const RegisterForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerData>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  const { register: registerCustomer } = useAuth();

  const onSubmit: SubmitHandler<registerData> = (data) =>
    registerCustomer(data);

  return (
    <form className={'form'} noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className={'w-full px-3 mb-6'}>
        <p className={'font-bold text-2xl text-center'}>Cadastro</p>
      </div>
      <div className={'w-full px-3'}>
        <label className="input-label" htmlFor="name">
          Nome
        </label>
        <input
          className={'input'}
          id="name"
          type="text"
          placeholder="Digite seu nome."
          {...register('name')}
        />
        {errors.name && (
          <span className={'text-error'}>{errors.name.message}</span>
        )}
      </div>
      <div className={'w-full px-3'}>
        <label className={'input-label'} htmlFor="phone">
          Telefone
        </label>
        <input
          className={'input'}
          id="phone"
          type="text"
          placeholder="(99)99999-9999"
          {...register('phone')}
        />
        {errors.phone && (
          <span className={'text-error'}>{errors.phone.message}</span>
        )}
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
      <div className="w-full px-3">
        <label className={'input-label'} htmlFor="password">
          Confirmar senha
        </label>
        <input
          className={'input'}
          id="confirm_password"
          type="password"
          placeholder="Digite novamente sua senha."
          {...register('confirm_password')}
        />
        {errors.confirm_password && (
          <span className={'text-error'}>
            {errors.confirm_password.message}
          </span>
        )}
      </div>
      <div className={'w-full px-3 mt-4'}>
        <button className={'button-primary w-full'} type="submit">
          Criar conta
        </button>
      </div>
    </form>
  );
};
