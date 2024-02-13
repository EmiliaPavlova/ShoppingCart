import { render, screen, cleanup } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import ShoppingCart from './ShoppingCart';
import userEvent from "@testing-library/user-event";

const productsMock1 = [
  {
    id: 1,
    name: 'Laptop',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 2,
    wholesalePrice: 800,
    price: 1000,
    categories: [
      'electronic'
    ],
    count: 1
  },
  {
    id: 2,
    name: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 20,
    price: 30,
    categories: [
      'accessory',
      'electronic',
      'audio'
    ],
    count: 2
  }
];

const productsMock2 = [
  {
    id: 1,
    name: 'USB Cable',
    imageUrl: 'https://images.unsplash.com/photo-1492107376256-4026437926cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 2,
    price: 4,
    categories: [
      'accessory'
    ],
    count: 5
  },
  {
    id: 3,
    name: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1546538915-a9e2c8d0a0b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 180,
    price: 220,
    categories: [
      'electronic'
    ],
    count: 5
  },
  {
    id: 4,
    name: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 20,
    price: 30,
    categories: [
      'accessory',
      'electronic',
      'audio'
    ],
    count: 5
  }
];

const productsMock3 = [
  {
    id: 1,
    name: 'USB Cable',
    imageUrl: 'https://images.unsplash.com/photo-1492107376256-4026437926cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 2,
    price: 4,
    categories: [
      'accessory'
    ],
    count: 1
  },
  {
    id: 2,
    name: 'Laptop',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 800,
    price: 1000,
    categories: [
      'electronic'
    ],
    count: 1
  },
  {
    id: 4,
    name: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 3,
    wholesalePrice: 20,
    price: 30,
    categories: [
      'accessory',
      'electronic',
      'audio'
    ],
    count: 20
  }
];

const productsMock4 = [
  {
    id: 2,
    name: 'Headphones',
    imageUrl: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80',
    supplierId: 1,
    wholesalePrice: 20,
    price: 30,
    categories: [
      'accessory',
      'electronic',
      'audio'
    ],
    count: 50
  }
];

describe('ShoppingCart', () => {

  afterEach(cleanup);

  test.each([
    [productsMock1, 'AUDIO15', '$7', 9, 1058],
    [productsMock2, 'ELEC25', '$7', 312.5, 964.5],
    [productsMock3, 'APPL10', '$5', 100.4, 1508.6],
    [productsMock3, 'freeShipping!', 'FREE', 0, 1604],
    [productsMock4, 'APPL10', 'FREE', 150, 1350],
  ])('it applyes correct shipping cost and discount', async (products, coupon, shippingCost, discount, totalCost) => {
    const mockAddProduct = jest.fn();
    const mockRemoveProduct = jest.fn();
    render(<ShoppingCart
      selectedProducts={products}
      addProduct = {mockAddProduct}
      removeProduct = {mockRemoveProduct}
    />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, coupon);
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Shipping Cost: ' + shippingCost));
    expect(screen.getByText('Discount: $' + discount));
    expect(screen.getByText('Total Cost: $' + totalCost));
  });

  test('it applyes only one coupon discount', async () => {
    const mockAddProduct = jest.fn();
    const mockRemoveProduct = jest.fn();
    render(<ShoppingCart
      selectedProducts={productsMock1}
      addProduct = {mockAddProduct}
      removeProduct = {mockRemoveProduct}
    />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'AUDIO15');
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Discount: $' + 9));
    expect(screen.getByText('Total Cost: $' + 1058));

    userEvent.clear(input);
    await userEvent.type(input, 'ELEC25');
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Discount: $' + 265));
    expect(screen.getByText('Total Cost: $' + 802));
  });

  test('the coupon discount is reset if unexisting code is entered', async () => {
    const mockAddProduct = jest.fn();
    const mockRemoveProduct = jest.fn();
    render(<ShoppingCart
      selectedProducts={productsMock1}
      addProduct = {mockAddProduct}
      removeProduct = {mockRemoveProduct}
    />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'AUDIO15');
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Discount: $' + 9));
    expect(screen.getByText('Total Cost: $' + 1058));

    await userEvent.type(input, 'asd');
    await userEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('Discount: $' + 0));
    expect(screen.getByText('Total Cost: $' + 1067));
  });

  test('displays message for empty cart if no products are selected', async () => {
    const mockAddProduct = jest.fn();
    const mockRemoveProduct = jest.fn();
    render(<ShoppingCart
      selectedProducts={[]}
      addProduct = {mockAddProduct}
      removeProduct = {mockRemoveProduct}
    />);
    expect(screen.getByText('Your shopping cart is empty'));
  });
});
