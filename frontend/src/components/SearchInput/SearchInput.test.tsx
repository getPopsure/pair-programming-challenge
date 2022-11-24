import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

const onChange = jest.fn();
const onValueChange = jest.fn();
const value = 'ABC';

describe('Components/Header', () => {
  describe('Callbacks', () => {
    it('Should correctly trigger onValue', async () => {
      render(<SearchInput onChange={onChange} />);
      const input = screen.getByTestId('search-input');
      userEvent.type(input, value);

      expect(onChange).toHaveBeenCalled();
    });

    it('Should correctly trigger onValueChange', () => {
      render(<SearchInput onValueChange={onValueChange} />);
      const input = screen.getByTestId('search-input');
      userEvent.type(input, value);

      expect(onValueChange).toBeCalled();
    });
  });
});
