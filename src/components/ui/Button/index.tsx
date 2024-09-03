import './button.css';

import LoadingSvg from '../../../assets/loading.gif';

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
      {loading ? <img src={LoadingSvg} /> : ''}
      <span>{value}</span>
    </button>
  );
};

export default Button;
