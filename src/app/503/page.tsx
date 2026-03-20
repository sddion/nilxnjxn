import { ErrorView } from '@/components/layout/ErrorView';

export default function Error503() {
  return (
    <ErrorView 
      code="503" 
      title="Service Down" 
      description="The network is resting. Try again." 
      glowColor="bg-cyan-500/10"
    />
  );
}
