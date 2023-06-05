import { useCustomer } from '@/contexts/customerContext';
import {
  createContactData,
  createContactSchema,
} from '@/schemas/contact.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseCookies } from 'nookies';
import { useForm, SubmitHandler } from 'react-hook-form';
import jwt_decode from 'jwt-decode';

export const ContactForm = ({}) => {
  const { currContact, deleteContact } = useCustomer();
  const cookies = parseCookies();
  const decoded: any = jwt_decode(cookies['myconts.token']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createContactData>({
    mode: 'onChange',
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: currContact?.name,
      email: currContact?.email,
      phone: currContact?.phone,
      customerId: decoded.sub,
    },
  });

  const { contactSubmit, modalType } = useCustomer();

  const onSubmit: SubmitHandler<createContactData> = (data) =>
    contactSubmit(data);

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
      {modalType === 'contact' ? (
        <div className={'w-full px-3'}>
          <button className={'button-primary w-full'} type="submit">
            Criar contato
          </button>
        </div>
      ) : (
        <div className={'flex gap-2 w-full px-3'}>
          <button className={'button-primary w-full'} type="submit">
            Salvar
          </button>
          <button
            className={'button-danger w-full'}
            type="button"
            onClick={() => deleteContact(currContact!.id)}
          >
            Deletar contato
          </button>
        </div>
      )}
    </form>
  );
};
