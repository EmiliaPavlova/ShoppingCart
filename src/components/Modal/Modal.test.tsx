import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import { FilterOptions } from '../../utils/enums';

describe('Modal', () => {
  test('it calls handleOption on option click', async () => {
    const mockFn = jest.fn();
    render(<Modal
      mode={'filter'}
      children={FilterOptions}
      handleOption={mockFn}
    />);
    const option = screen.getByText('Electronic');
    await userEvent.click(option);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
