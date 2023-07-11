import * as React from 'react';

import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref: any = React.useRef(fn);

  // we copy a ref to the callback scoped to the current state/props on each render
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });

  return React.useCallback(
    (...args: any[]) => ref.current.apply(void 0, args),
    [],
  ) as T;
}

export default useEventCallback;
