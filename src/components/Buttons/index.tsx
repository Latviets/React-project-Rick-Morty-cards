import './Button.css'

type ButtonProps = {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

const Button = ({
  onClick,
  disabled = false,
  children,
  variant = 'primary',
  className = ''
}: ButtonProps) => {
  return (
    <button
      className={`button ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button