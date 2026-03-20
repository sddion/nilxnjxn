import { ErrorView } from '@/components/layout/ErrorView';

export default function Error504() {
  return (
    <ErrorView 
      code="504" 
      title="Timeout" 
      description="The void did not respond in time." 
      glowColor="bg-cyan-500/10"
    />
  );
}
