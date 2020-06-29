import { useMemo } from 'react';

export function useOptions(context) {
  return useMemo(
    () => ({
      credentials: context.getCredentials(),
    }),
    [context]
  );
}
