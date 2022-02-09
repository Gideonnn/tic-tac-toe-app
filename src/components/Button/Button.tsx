export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({ children, className, onClick = () => {}, ...props }: ButtonProps) => (
  <button
    className={`${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
