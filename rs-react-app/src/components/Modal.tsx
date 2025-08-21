import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';
type ModalProps = {
  isOpen?: boolean;
  onClose?: VoidFunction;
  children?: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') ?? document.body
  );
};

export default Modal;
