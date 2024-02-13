import { FC } from 'react';
import { SelectedProductsProps } from '../ShoppingCart/ShoppingCart';
import './ProductPreview.css';

interface ProductPreviewProps extends SelectedProductsProps {
  handleRemove: (id: number) => void;
  handleAdd: (id: number) => void;
}

const ProductPreview: FC<ProductPreviewProps> = ({id, name, imageUrl, price, count, handleRemove, handleAdd}) => {
  return (
    <div className="product-preview">
      <img className="preview-image" src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>Count:
          <button className="preview-button" onClick={() => handleRemove(id)}>-</button>
          <span data-testid="count">{count}</span>
          <button className="preview-button" onClick={() => handleAdd(id)}>+</button>
        </p>
      </div>
      <p className="preview-price">${(price * count).toFixed(2)}</p>
    </div>
  )
}

export default ProductPreview;
