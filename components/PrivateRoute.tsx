'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermissions: string[];
  entity: string;
}

const ProtectedRoute = ({ children, requiredPermissions, entity }: ProtectedRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    const userPermissionsObj = session?.user?.permissions;
    if (!userPermissionsObj || typeof userPermissionsObj !== 'object') {
      router.push('/unauthorized'); // Redirect to an unauthorized page
      return;
    }

    // Flatten the permissions array for the specific entity
    const userPermissions = userPermissionsObj[entity] || [];

    // Check if user has all required permissions for the entity
    const hasPermission = requiredPermissions.every(permission => userPermissions.includes(permission));

    if (status === 'unauthenticated' || !hasPermission) {
      router.push('/unauthorized'); // Redirect to an unauthorized page
    }
  }, [session, status, requiredPermissions, entity, router]);

  // Show loading state while loading or if permissions check fails
  if (status === 'loading' || (session && !requiredPermissions.every(permission => (session?.user?.permissions?.[entity] || []).includes(permission)))) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
