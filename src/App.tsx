import { useState } from 'react'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'
import './App.css'

function App() {
  const [option, setOption] = useState<string | undefined>();
  const [cartModal, setCartModal] = useState(false);

  const handleCartModal = () => setCartModal(!cartModal);
  const handleUpdate = (option: string) => setOption(option);

  return (
    <>
      <Header handleCartModal={handleCartModal} handleUpdate={handleUpdate} />
      <ProductList option={option} openCart={cartModal} />
    </>
  )
}

export default App
