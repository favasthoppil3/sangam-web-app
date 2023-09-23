import React, { ComponentProps, ComponentType, Suspense } from 'react';
// import { useLocation } from 'react-router-dom';
import ComponentLoading from './ComponentLoading';

function Loadable(Component: ComponentType) {
  function WrappedComponent(props: ComponentProps<typeof Component>) {
    // const { pathname } = useLocation();

    return (
      <Suspense fallback={<ComponentLoading />}>
        <Component {...props} />
      </Suspense>
    );
  }

  return WrappedComponent;
}

export default Loadable;
