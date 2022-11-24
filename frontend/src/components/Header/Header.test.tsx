import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Components/Header', () => {
  describe('Normal state', () => {
    it('Should correctly display a title', () => {
      const title = 'Policies';
      render(<Header title={title} />);
      screen.getByRole('heading', { name: title });
    });

    it('Should correctly display Content', () => {
      const title = 'Policies';
      render(<Header title={title}>Content</Header>);
      screen.getByText('Content');
    });
  });
});
