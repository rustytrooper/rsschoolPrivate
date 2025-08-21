import { useRef } from 'react';
import { Tile } from '../tile/Tile';
import { BaseButton } from '../button/BaseButton';

const FormUncontrolled = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name: nameRef.current?.valueOf,
      age: ageRef.current?.valueOf,
    });
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
