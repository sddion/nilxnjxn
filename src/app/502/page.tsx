import { ErrorView } from '@/components/layout/ErrorView';

export default function Error502() {
  return (
    <ErrorView 
      code="502" 
      title="Bad Gateway" 
      description="Invalid response from the void." 
    />
  );
}
