// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from 'mocks/server';

jest.mock('use-debounce', () => {
  return {
    useDebounce: (value: unknown) => value,
    useDebouncedCallback: (value: unknown) => value,
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
