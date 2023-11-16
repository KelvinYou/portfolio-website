import React, { useState, FC, ReactNode, useRef, useEffect, MouseEvent } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent<HTMLDocument>) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    // Add global click event listener
    document.addEventListener('click', handleOutsideClick as any);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleOutsideClick as any);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="" onClick={toggleDropdown}>
        {trigger}
      </div>
      {isOpen && (
        <div             
          className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
          onClick={closeDropdown}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
