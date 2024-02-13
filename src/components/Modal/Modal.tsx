import { FC } from 'react';
import './Modal.css';
import { FilterOptions, SortOptions } from '../../utils/enums';

export type ModalMode = 'filter' | 'sort';

interface ModalProps {
  mode: ModalMode;
  children: typeof FilterOptions | typeof SortOptions | [];
  handleOption: React.MouseEventHandler<HTMLDivElement>;
}

const Modal: FC<ModalProps> = ({ mode, children, handleOption }) => {
  return (
    <div className={`modal modal-${mode}`}>
      {Object.values(children).map((option) => {
        const index = Object.values(children).indexOf(option);
        const key = Object.keys(children)[index];
        return <div key={key} id={key} onClick={handleOption}>{option}</div>})
      }
    </div>
  )
}

export default Modal;
