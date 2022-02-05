export interface CircleProps {
  onClick?: () => void;
}

export const Circle = ({ onClick }: CircleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M 14 14 m 7 -2 a 9 9 0 1 1 -18 0 a 9 9 0 0 1 18 0 z"
    />
  </svg>
);
