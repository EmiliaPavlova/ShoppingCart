import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Product from './Product';

describe('Product', () => {
  test('it calls onClick on button click', async () => {
    const mockFn = jest.fn();
    render(<Product
      id={1}
      name={'name'}
      imageUrl={'url'}
      price={100}
      categories={[]}
      supplierId={1}
      onClick={mockFn}
    />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
