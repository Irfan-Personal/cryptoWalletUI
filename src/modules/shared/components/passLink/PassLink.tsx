import React from 'react';
import { Link } from '@react-navigation/native';
import classNames from 'classnames';
import { HomeScreens } from '~src/layouts/HomeNavigation.tsx';
import { RootScreens } from '~src/layouts/RootNavigation.tsx';
import { TransactionNavigationScreens } from '~src/layouts/TransactionNavigation.tsx';

const PassLink = ({ to, className, children }: PassLinkProps) => {
  return (
    <Link
      className={classNames('text-black dark:text-white', className)}
      to={to}
    >
      {children}
    </Link>
  );
};

interface PassLinkProps {
  className?: string;
  children?: React.ReactNode;
  to: {
    screen:
      | keyof typeof TransactionNavigationScreens
      | keyof typeof RootScreens
      | keyof typeof HomeScreens;
    params?: Record<string, object | undefined>;
  };
}

export { PassLink };
