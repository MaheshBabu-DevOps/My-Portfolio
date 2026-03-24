'use client';
import { useEffect, useState } from 'react';

type Props = {
  icon: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

// import('@iconify/react') lives exclusively inside useEffect, which never
// runs during SSR/SSG — so the iconify module is never loaded server-side.
export default function ClientIcon({ icon, width, height, className }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Comp, setComp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import('@iconify/react').then((m) => setComp(() => m.Icon));
  }, []);

  if (!Comp) return <span style={{ display: 'inline-block', width, height }} />;
  return <Comp icon={icon} width={width} height={height} className={className} />;
}
