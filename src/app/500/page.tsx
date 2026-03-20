import { ErrorView } from '@/components/layout/ErrorView';

export default function Error500() {
  return (
    <ErrorView 
      code="500" 
      title="Server Error" 
      description="Transmission completely failed." 
    />
  );
}
