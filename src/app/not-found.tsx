'use client';

import { ErrorView } from '@/components/layout/ErrorView';

export default function NotFound() {
  return (
    <ErrorView 
      code="404" 
      title="Void Lost." 
      description="Shades Not Found" 
    />
  );
}
