import { FC } from 'react';
import './Product.css';

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  supplierId: number;
  price: number;
  categories: string[];
}

export interface ProductProps extends Product {
  onClick: (id: number) => void;
}

const Product: FC<ProductProps> = ({id, name, imageUrl, price, categories, onClick}) => {
  return (
    <div className="product" data-testid="product">
      <img className="image" src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Categories: {categories.join(', ')}</p>
      <button className="add-button" onClick={() => onClick(id)}>Add to Cart</button>
    </div>
  )
}

export default Product;
