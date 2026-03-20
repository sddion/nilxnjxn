'use client';

import { ErrorView } from '@/components/layout/ErrorView';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorView 
      code="500" 
      title="System Crash." 
      description="Transmission Failed" 
    />
  );
}
