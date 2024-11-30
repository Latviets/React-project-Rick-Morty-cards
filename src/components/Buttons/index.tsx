interface ButtonProps {
  onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      Get Characters
    </button>
  );
};

export default Button; 