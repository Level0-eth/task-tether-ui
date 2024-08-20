import './button.css';

interface ButtonProps {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickEvent: any;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({ value, clickEvent, loading, disabled }: ButtonProps) => {
  return (
    <button
      className={`button ${loading ? 'loading' : ''} ${!disabled && disabled != disabled ? 'disabled' : ''}`}
      onClick={clickEvent}
    >
      {value}
    </button>
  );
};

export default Button;
