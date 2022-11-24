import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

export const Header = ({ children, title }: HeaderProps) => {
  return (
    <header className="md:flex justify-between">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <div className="w-64">{children}</div>
    </header>
  );
};
