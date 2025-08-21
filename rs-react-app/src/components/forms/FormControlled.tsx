import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tile } from '../tile/Tile';
import { BaseButton } from '../button/BaseButton';

const schema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, {
      message: 'Password must contain at least one special character',
    }),
  confirmPassword: z
    .string()
    .min(1, { message: 'Confirm password is required' }),
  gender: z.enum(['male', 'female'], { error: 'Gender is required' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms',
  }),
  file: z.instanceof(File).optional(),
});

const FormHook = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>IM CONTROLLED</h1>
      <Tile register={register} />
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  );
};

export default FormHook;
