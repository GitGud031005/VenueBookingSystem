import {
  createRootRouteWithContext,
  Outlet,
  // useRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Suspense, useEffect } from 'react';

import { useAuthStore } from '@/stores';

type RouterContext = {
  authContext: { isAuthenticated: boolean };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  console.log('[RootComponent] Component rendering');
  const { isAuthenticated } = useAuthStore();
  console.log('[RootComponent] isAuthenticated:', isAuthenticated);
  // const router = useRouter();

  useEffect(() => {
    console.log('[RootComponent] useEffect triggered');
    // router.invalidate();
  }, [isAuthenticated]);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <Suspense></Suspense>
    </>
  );
}
