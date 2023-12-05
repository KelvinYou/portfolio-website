import React, { FC, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BaseButton: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button 
      className={`bg-on-primary w-full px-2 py-1 rounded-md text-lg hover:bg-on-secondary
      ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default BaseButton
