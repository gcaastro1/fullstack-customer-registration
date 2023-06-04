import { X } from 'phosphor-react';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface IModal {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ onClose, title, children }: IModal) => {
  const handleClose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return createPortal(
    <div className="modal-wrapper" id="wrapper" onClick={handleClose}>
      <div className="w-[600px]">
        <div className="bg-white p-4 rounded">
          <div className="modal-header">
            <p className="font-bold text-gray-800">{title}</p>
            <button
              className="text-black text-xl items-end"
              onClick={() => onClose()}
            >
              <X size={20} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
