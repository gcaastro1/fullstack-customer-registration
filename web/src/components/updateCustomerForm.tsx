import { SubmitHandler, useForm } from 'react-hook-form';
import {
  customerData,
  updateCustomerData,
  updateCustomertSchema,
} from '../schemas/customer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/authContext';
import { useCustomer } from '@/contexts/customerContext';

interface UpdateCustomerFormProps {
  customer: customerData;
}

export const UpdateCustomerForm = ({ customer }: UpdateCustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateCustomerData>({
    mode: 'onChange',
    resolver: zodResolver(updateCustomertSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    },
  });

  const { update } = useCustomer();

  const onSubmit: SubmitHandler<updateCustomerData> = (data) => update(data);

  return (
    <form className={'container'} noValidate onSubmit={handleSubmit(onSubmit)}>
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
      <div className={'flex gap-2 w-full px-3 mt-4'}>
        <button className={'button-primary w-full'} type="submit">
          Salvar
        </button>
        <button className={'button-danger w-full'} type="submit">
          Deletar conta
        </button>
      </div>
    </form>
  );
};
