import "./style.module.css";

type Props = {
  onClick: () => void;
}

const Button = ({ onClick }: Props) => {
  return (
    <button onClick={onClick}>
      Get Characters
    </button>
  );
};

export default Button; 