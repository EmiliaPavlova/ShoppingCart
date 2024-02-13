import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { mockProducts } from '../../__mocks__/mock-data';
import ProductList from './ProductList';

describe('ProductList', () => {
  beforeEach(() => {
    const productsMock = mockProducts;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(productsMock)
    })) as jest.Mock;
  });

  test('it filters products according given category', async () => {
    const { rerender } = render(<ProductList
      openCart={true}
      option={''}
    />);
    await waitForElementToBeRemoved(() => screen.getByRole('img'));
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    rerender(<ProductList openCart={true} option={'Audio'} />);
    await waitFor(() => expect(screen.queryByText('USB Cable')).toBeNull());

    rerender(<ProductList openCart={true} option={'ResetFilter'} />);
    await waitFor(() => expect(screen.queryByText('USB Cable')));
    expect(screen.getAllByTestId('product')).toHaveLength(4);
  });

  test('it sorts products according given criteria', async () => {
    const { rerender } = render(<ProductList
      openCart={false}
      option={''}
    />);
    await waitForElementToBeRemoved(() => screen.getByRole('img'));
    expect(screen.getAllByTestId('product')[0].textContent).toContain('USB Cable');

    rerender(<ProductList openCart={false} option={'NameAsc'} />);
    expect(screen.getAllByTestId('product')[0].textContent).toContain('Headphones');

    rerender(<ProductList openCart={false} option={'NameDesc'} />);
    expect(screen.getAllByTestId('product')[0].textContent).toContain('USB Cable');

    rerender(<ProductList openCart={false} option={'PriceAsc'} />);
    expect(screen.getAllByTestId('product')[0].textContent).toContain('USB Cable');

    rerender(<ProductList openCart={false} option={'PriceDesc'} />);
    expect(screen.getAllByTestId('product')[0].textContent).toContain('Laptop');
  });

  test('it increases count of item on plus click', async () => {
    const { rerender } = render(<ProductList
      openCart={false}
      option={''}
    />);
    await waitForElementToBeRemoved(() => screen.getByRole('img'));
    rerender(<ProductList openCart={true} option={''} />);
    await userEvent.click(screen.getAllByText('Add to Cart')[0]);
    expect(screen.getAllByTestId('product')[0].textContent).toContain('USB Cable');
    await userEvent.click(screen.getAllByRole('button', {name: '+'})[0]);
    expect(screen.getByTestId('count').textContent).toEqual('2');
  });

  test('it decreases count of item on minus click until reaches 0', async () => {
    const { rerender } = render(<ProductList
      openCart={false}
      option={''}
    />);
    await waitForElementToBeRemoved(() => screen.getByRole('img'));
    rerender(<ProductList openCart={true} option={''} />);
    await userEvent.click(screen.getAllByText('Add to Cart')[0]);
    expect(screen.getAllByTestId('product')[0].textContent).toContain('USB Cable');
    await userEvent.click(screen.getAllByRole('button', {name: '-'})[0]);
    expect(screen.getByTestId('count').textContent).toEqual('0');
    await userEvent.click(screen.getAllByRole('button', {name: '-'})[0]);
    expect(screen.getByTestId('count').textContent).toEqual('0');
  });
});
