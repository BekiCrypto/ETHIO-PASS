import Link from 'next/link';

function EthioPassIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ethio-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#078930' }} />
          <stop offset="50%" style={{ stopColor: '#FCDD09' }} />
          <stop offset="100%" style={{ stopColor: '#DA121A' }} />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#ethio-gradient)" />
      <g stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M13.5 31C13.5 26.8579 16.8579 23.5 21 23.5H22" />
        <path d="M11 26C11 19.9249 15.9249 15 22 15C28.0751 15 33 19.9249 33 26" />
        <path d="M23 23.5H24C26.7614 23.5 29 21.2614 29 18.5C29 15.7386 26.7614 13.5 24 13.5H22" />
        <path d="M22 15V9" />
        <path d="M18.5 31V28.5C18.5 25.7386 20.7386 23.5 23.5 23.5H27" />
      </g>
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
