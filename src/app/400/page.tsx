import { ErrorView } from '@/components/layout/ErrorView';

export default function Error400() {
  return (
    <ErrorView 
      code="400" 
      title="Bad Request" 
      description="Malformed trace detected." 
    />
  );
}
