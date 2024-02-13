import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Button', () => {

  test('it calls handleOption on option click', async () => {
    const mockHandleCartModal = jest.fn();
    const mockHandleUpdate = jest.fn();
    render(<Header
      handleCartModal={mockHandleCartModal}
      handleUpdate={mockHandleUpdate}
    />);
    const filter = screen.getAllByRole('img')[1];
    await userEvent.click(filter);
    expect(screen.getByText('Electronic'));
    await userEvent.click(screen.getByText('Electronic'));
    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
    expect(mockHandleUpdate).toHaveBeenCalledWith('Electronic');

    await userEvent.click(filter);
    expect(screen.queryByText('Electronic')).not.toBeTruthy();

    const sort = screen.getAllByRole('img')[2];
    await userEvent.click(sort);
    expect(screen.getByText('By Name Ascending'));
    await userEvent.click(screen.getByText('By Name Ascending'));
    expect(mockHandleUpdate).toHaveBeenCalledTimes(2);
    expect(mockHandleUpdate).toHaveBeenCalledWith('NameAsc');

    await userEvent.click(filter);
    expect(screen.getByText('Electronic'));
    await userEvent.click(screen.getByText('Electronic'));
    expect(mockHandleUpdate).toHaveBeenCalledTimes(3);
  });
});
