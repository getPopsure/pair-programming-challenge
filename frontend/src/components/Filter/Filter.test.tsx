import { render, screen } from '@testing-library/react';
import { Filter } from './Filter';

describe('Components/Filter', () => {
  describe('Normal state', () => {
    it('Should load correctly', () => {
      render(<Filter onChange={()=>{}} />);
      screen.getByLabelText('Customer name filter');
    });
  });
});
