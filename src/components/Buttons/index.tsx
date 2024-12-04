import React from 'react'

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
      className={`
        px-4 py-2 rounded cursor-pointer transition-all duration-300 text-base border-2
        ${variant === 'primary'
          ? 'bg-[#1abc9c] text-white border-[#1abc9c] hover:enabled:bg-white hover:enabled:text-[#1abc9c]'
          : 'bg-white text-[#1abc9c] border-[#1abc9c] hover:enabled:bg-[#1abc9c] hover:enabled:text-white'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button