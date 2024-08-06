import './button.css';

interface ButtonProps {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickEvent: any;
  loading: boolean;
}

const Button = ({ value, clickEvent, loading }: ButtonProps) => {
  return (
    <button
      className={`button ${loading ? 'loading' : ''}`}
      onClick={clickEvent}
    >
      {value}
    </button>
  );
};

export default Button;
