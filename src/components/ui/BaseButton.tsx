import React, { FC, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const BaseButton: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button 
      className={`bg-on-primary px-2 py-1 rounded-md text-lg
      ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default BaseButton
