import { render, screen } from '@testing-library/react';
import { Filters } from './Filters';

describe('Components/Filter', () => {
  describe('Normal state', () => {
    it('Should load correctly', () => {
      render(<Filters onNameChange={()=>{}} />);
      screen.getByLabelText('Customer name filter');
    });
  });
});
