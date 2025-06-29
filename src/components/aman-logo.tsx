import Link from 'next/link';

function EthioPassIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="15" fill="hsl(var(--primary))" />
      <path
        d="M16 4L18.3273 11.2188L25.8557 12.146L20.211 17.104L22.1455 24.5L16 20.3125L9.8545 24.5L11.789 17.104L6.14428 12.146L13.6727 11.2188L16 4Z"
        fill="hsl(var(--accent))"
      />
    </svg>
  );
}


export function EthioPassLogo() {
  return (
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <EthioPassIcon />
      <span className="text-2xl font-bold text-foreground font-headline">Ethio Pass</span>
    </Link>
  );
}
