import { useState } from 'react';
import { FormHook, FormUncontrolled, Modal } from '../components';
import { BaseButton } from '../components/button/BaseButton';

type MainPageState = {
  isModalOpen: boolean;
  isHookOpen: boolean;
  isUncontrolledOpen: boolean;
};

export function MainPage() {
  const [isOpen, setIsOpen] = useState<MainPageState>({
    isModalOpen: false,
    isHookOpen: false,
    isUncontrolledOpen: false,
  });
  return (
    <main className="h-full mx-auto">
      <Modal isOpen={isOpen.isModalOpen}>
        {isOpen.isHookOpen && <FormHook />}
        {isOpen.isUncontrolledOpen && (
          <FormUncontrolled onSubmit={() => console.log('submitted')} />
        )}
      </Modal>

      <div className="w-5vw flex flex-row gap-4">
        <BaseButton
          onClick={() =>
            setIsOpen({ ...isOpen, isModalOpen: true, isHookOpen: true })
          }
        >
          Open React Hook Form
        </BaseButton>
        <BaseButton
          onClick={() =>
            setIsOpen({
              ...isOpen,
              isModalOpen: true,
              isUncontrolledOpen: true,
            })
          }
        >
          Open uncontrolled form
        </BaseButton>
      </div>
    </main>
  );
}
