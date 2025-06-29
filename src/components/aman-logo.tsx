import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { SVGProps } from 'react';

export function AmanLogo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <ShieldCheck className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold text-foreground font-headline">Aman ID</span>
    </Link>
  );
}
