import React from 'react'

interface ShareButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ label, icon, onClick }) => (
  <a
    aria-label={label}
    className=" bg-gray-dark mb-3 inline-flex h-9 w-9 items-center 
    justify-center rounded-sm text-body-color duration-300 
    hover:text-white hover:bg-on-primary cursor-pointer"
    onClick={onClick}
  >
    {icon}
  </a>
);

export default ShareButton