// import { useRef } from 'react';
import { Tile } from '../tile/Tile';
import { BaseButton } from '../button/BaseButton';
import { changeFields } from '../../store/formSlice';
import { useDispatch } from 'react-redux';
import type { FormFields } from '../../shared/types';

const FormUncontrolled = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = new FormData(e.currentTarget as HTMLFormElement);
    const formFields: FormFields = {
      name: fields.get('name') as string,
      age: parseInt(fields.get('age') as string, 10),
      email: fields.get('email') as string,
      password: fields.get('password') as string,
      confirmPassword: fields.get('confirmPassword') as string,
      gender: fields.get('gender') as 'male' | 'female',
      terms: fields.get('terms') === 'true',
      file: {
        name: (fields.get('file') as File)?.name,
        size: (fields.get('file') as File)?.size,
      },
    };
    onSubmit(dispatch(changeFields(formFields)));
    console.log(formFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>IM UNCONTROLLED</h1>
      <Tile />
      <BaseButton type="submit">Submit</BaseButton>
    </form>
  );
};

export default FormUncontrolled;
