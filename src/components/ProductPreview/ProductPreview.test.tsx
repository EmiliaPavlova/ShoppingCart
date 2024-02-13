import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ProductPreview from './ProductPreview';

describe('ProductPreview', () => {
  test('it calls handleAdd on + click', async () => {
    const mockHandleRemove = jest.fn();
    const mockHandleAdd = jest.fn();
    render(<ProductPreview
      id={1}
      name={'name'}
      imageUrl={'url'}
      price={100}
      categories={[]}
      count={1}
      supplierId={1}
      handleRemove={mockHandleRemove}
      handleAdd={mockHandleAdd}
    />);
    const plus = screen.getByText('+');
    await userEvent.click(plus);
    expect(mockHandleAdd).toHaveBeenCalledTimes(1);
  });

  test('it calls handleRemove on - click', async () => {
    const mockHandleRemove = jest.fn();
    const mockHandleAdd = jest.fn();
    render(<ProductPreview
      id={1}
      name={'name'}
      imageUrl={'url'}
      price={100}
      categories={[]}
      count={1}
      supplierId={1}
      handleRemove={mockHandleRemove}
      handleAdd={mockHandleAdd}
    />);
    const minus = screen.getByText('-');
    await userEvent.click(minus);
    expect(mockHandleRemove).toHaveBeenCalledTimes(1);
  });
});
