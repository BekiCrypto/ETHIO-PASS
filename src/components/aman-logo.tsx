import Link from 'next/link';

export function EthioPassLogo() {
  return (
    <Link href="/" className="flex items-center" prefetch={false}>
      <svg 
        viewBox="0 0 220 48" 
        className="h-12 w-auto"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ethio-gradient-fingerprint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#078930' }} />
            <stop offset="50%" style={{ stopColor: '#FCDD09' }} />
            <stop offset="100%" style={{ stopColor: '#DA121A' }} />
          </linearGradient>
        </defs>
        
        <text 
          x="0" 
          y="38" 
          fontFamily="var(--font-inter), sans-serif" 
          fontSize="38" 
          fontWeight="bold" 
          className="fill-foreground"
        >
          Ethi
        </text>
        
        <g transform="translate(82, 6) scale(1.5)">
          <g stroke="url(#ethio-gradient-fingerprint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
            <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
            <path d="M12 11v2a14 14 0 0 0 2.5 8" />
            <path d="M8 15a18 18 0 0 0 1.8 6" />
            <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
          </g>
        </g>
        
        <text 
          x="125" 
          y="38" 
          fontFamily="var(--font-inter), sans-serif" 
          fontSize="38" 
          fontWeight="bold" 
          className="fill-foreground"
        >
          Pass
        </text>
      </svg>
    </Link>
  );
}
