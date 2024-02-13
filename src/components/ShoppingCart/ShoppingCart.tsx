import { FC, useState, useRef, useEffect } from 'react';
import { couponCodes } from '../../utils/coupons';
import { Product } from '../Product/Product';
import ProductPreview from '../ProductPreview/ProductPreview';
import './ShoppingCart.css';

export interface SelectedProductsProps extends Product {
  count: number;
}

interface ShoppingCartProps {
  selectedProducts: SelectedProductsProps[];
  addProduct: (id: number) => void;
  removeProduct: (id: number) => void;
}

const ShoppingCart: FC<ShoppingCartProps> = ({ selectedProducts, addProduct, removeProduct }) => {
  const [coupon, setCoupon] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (inputRef.current && couponCodes.map(coupon => coupon.code).includes(inputRef.current.value)) {
      setCoupon(inputRef.current.value);
    } else {
      setCoupon('');
    }
  }

  const cartItemsCount = selectedProducts.reduce((acc, cur) => acc + cur.count, 0);

  useEffect(() => {
    if (coupon === 'freeShipping!') {
      setShippingCost(0);
      setDiscount(0);
    } else if (cartItemsCount < 20) {
      setShippingCost(7);
    } else if (cartItemsCount < 40) {
      setShippingCost(5);
    } else {
      setShippingCost(0);
    }
  }, [coupon, cartItemsCount])

  useEffect(() => {
    const appliedCoupon = couponCodes.find(c => c.code === coupon);
    if (coupon === 'APPL10') {
      const discountedItems = selectedProducts.filter(product => product.supplierId === appliedCoupon?.supplierId);
      setDiscount(discountedItems.reduce((acc, cur) => acc + cur.price * cur.count, 0) * (appliedCoupon?.discount || 1));
    }
    if (coupon === 'AUDIO15' || coupon === 'ELEC25') {
      const discountedItems = appliedCoupon?.category && selectedProducts.filter(product => product.categories.includes(appliedCoupon?.category)) || [];
      setDiscount(discountedItems.reduce((acc, cur) => acc + cur.price * cur.count, 0) * (appliedCoupon?.discount || 1));
    }
    if (!coupon) {
      setDiscount(0);
    }
  }, [coupon, selectedProducts])

  useEffect(() => {
    const cartItemsCost = selectedProducts.reduce((acc, cur) => acc + cur.price * cur.count, 0);
    setTotalCost(cartItemsCost + shippingCost - discount);
  }, [shippingCost, discount, selectedProducts])

  /*
  const itemsToSend = {
    items: selectedProducts.map(product => {
      return {productId: product.id, unitQuantity: product.count}
    }),
  }

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemsToSend)
    };
    fetch('https://man-shopping-cart-test.azurewebsites.net/api/Cart/CalculateCost', requestOptions)
      .then(response => response.json())
      .then(data => setTotalPrice(data));
  }, [coupon, cartItemsCount])
  */

  return (
    <div className="cart-wrapper">
      {selectedProducts.length
        ? <>
          <div className="cart-content">
            {selectedProducts.map(product => <ProductPreview
              key={product.id} {...product} handleRemove={removeProduct} handleAdd={addProduct}
            />)}
          </div>
          <div className="cart-footer">
            <div className="cart-input">
              <input placeholder="Discount code" ref={inputRef} />
              <button onClick={onSubmit}>Submit</button>
            </div>
            <div className="cart-shipping">Shipping Cost: {shippingCost === 0 ? 'FREE' : '$' + shippingCost}</div>
            <div className="cart-shipping">Discount: ${discount}</div>
            <div className="cart-price">Total Cost: ${totalCost}</div>
          </div>
        </>
        : <div className="cart-empty">Your shopping cart is empty</div>
      }
    </div>
  )
}

export default ShoppingCart;
