import { FC, useState } from 'react';
import shoppingCart from '../../assets/icons/cart-shopping.svg';
import filter from '../../assets/icons/filter.svg';
import sort from '../../assets/icons/sort.svg';
import { FilterOptions, SortOptions } from '../../utils/enums';
import Modal, { ModalMode } from '../Modal/Modal';
import './Header.css';

interface HeaderProps {
  handleCartModal: () => void;
  handleUpdate: (option: string) => void;
}

const options = {
  filter: FilterOptions,
  sort: SortOptions
}

const Header: FC<HeaderProps> = ({ handleCartModal, handleUpdate }) => {
  const [modal, setModal] = useState('');

  const toggleModal = (mode: ModalMode) => {
    if (modal) {
      modal === mode ? setModal('') : setModal(mode);
    } else {
      setModal(mode);
    }
  }

  return (
    <>
      <img src={shoppingCart} alt="shopping cart" className="cart" onClick={handleCartModal} />
      <h1>Products</h1>
      <div className="controller">
        <img src={filter} alt="filter by category" onClick={() => toggleModal('filter')} />
        <img src={sort} alt="sort by name" onClick={() => toggleModal('sort')} />
        {!!modal &&
          <Modal
            mode={modal as ModalMode}
            children={modal ? options[modal as keyof typeof options] : [] }
            handleOption={(a: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLDivElement>) => handleUpdate(a.target.id)}
          />}
      </div>
    </>
  )
}

export default Header;
