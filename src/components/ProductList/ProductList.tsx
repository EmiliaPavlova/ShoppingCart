import { FC, useState, useEffect } from 'react';
import Product, { ProductProps } from '../../components/Product/Product';
import loader from '../../assets/icons/loader.gif';
import { FilterOptions, SortOptions } from '../../utils/enums';
import ShoppingCart, { SelectedProductsProps } from '../ShoppingCart/ShoppingCart';
import './ProductList.css';

interface ProductListProps {
  openCart: boolean;
  option?: string;
}

const ProductList: FC<ProductListProps> = ({ openCart, option }) => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedProducts, setUpdatedProducts] = useState<ProductProps[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProductsProps[]>([]);

  const sortProductsByNameAsc = () => {
    const sortedProducts = [...updatedProducts].sort((a, b) => a.name.localeCompare(b.name));
    setUpdatedProducts(sortedProducts);
  };

  const sortProductsByNameDesc = () => {
    const sortedProducts = [...updatedProducts].sort((a, b) => b.name.localeCompare(a.name));
    setUpdatedProducts(sortedProducts);
  };

  const sortProductsByPriceAsc = () => {
    const sortedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
    setUpdatedProducts(sortedProducts);
  };

  const sortProductsByPriceDesc = () => {
    const sortedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
    setUpdatedProducts(sortedProducts);
  };

  const sortProducts = {
    NameAsc: () => sortProductsByNameAsc(),
    NameDesc: () => sortProductsByNameDesc(),
    PriceAsc: () => sortProductsByPriceAsc(),
    PriceDesc: () => sortProductsByPriceDesc()
  }

  const filterProducts = (category: keyof typeof FilterOptions) => {
    if (category === 'ResetFilter') {
      setUpdatedProducts(products);
    } else {
      const filteredProducts = products.filter(product => product.categories.includes(category.toLowerCase()))
      setUpdatedProducts(filteredProducts);
    }
  }

  const addProduct = (id: number) => {
    const existingProductIndex = selectedProducts.findIndex((p) => p.id === id);
    if (existingProductIndex !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex].count++;
      setSelectedProducts(updatedProducts);
    } else {
      const selected = products.find(product => product.id === id);
      selected && setSelectedProducts([...selectedProducts, { ...selected, count: 1 }]);
    }
  }

  const removeProduct = (id: number) => {
    const existingProductIndex = selectedProducts.findIndex((p) => p.id === id);
    const updatedProducts = [...selectedProducts];
    if (updatedProducts[existingProductIndex].count > 0) {
      updatedProducts[existingProductIndex].count--;
      setSelectedProducts(updatedProducts);
    }
  }

  useEffect(() => {
    fetch('https://man-shopping-cart-test.azurewebsites.net/api/Products')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setProducts(data);
        setUpdatedProducts(data);
      });
  }, []);

  useEffect(() => {
    if (option && Object.keys(SortOptions).includes(option)) {
      sortProducts[option as keyof typeof SortOptions]()
    }
    if (option && Object.keys(FilterOptions).includes(option)) {
      filterProducts(option as keyof typeof FilterOptions)
    }
  }, [option])

  return (
    loading
      ? <img src={loader} alt="loading" />
      : <>
        <div className="products-list">
          {updatedProducts.map((product) => (
            <Product key={product.id} {...product} onClick={addProduct} />
            ))}
        </div>
        {openCart && <ShoppingCart selectedProducts={selectedProducts} addProduct={addProduct} removeProduct={removeProduct} />}
      </>
  );
};

export default ProductList;
