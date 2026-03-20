import { ErrorView } from '@/components/layout/ErrorView';

export default function Error501() {
  return (
    <ErrorView 
      code="501" 
      title="Not Implemented" 
      description="Feature absent from this realm." 
    />
  );
}
