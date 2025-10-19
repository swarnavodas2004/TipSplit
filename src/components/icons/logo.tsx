export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="15" y1="9" x2="9" y2="15" />
      <circle cx="10.5" cy="10.5" r="1.5" fill="currentColor"/>
      <circle cx="13.5" cy="13.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}
