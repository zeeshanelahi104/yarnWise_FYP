'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface SessionProviderWrapperProps {
  children: ReactNode;
  session: any;
}

const SessionProviderWrapper = ({ children, session }: SessionProviderWrapperProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default SessionProviderWrapper;
