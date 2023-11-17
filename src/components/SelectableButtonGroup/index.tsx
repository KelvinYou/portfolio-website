"use client";

import React, { useState } from 'react';

interface Option {
  id: string;
  label: string;
}

interface SelectableButtonGroupProps {
  options: Option[];
  onOptionChange: (option: string) => void;
}

const SelectableButtonGroup: React.FC<SelectableButtonGroupProps> = ({
  options,
  onOptionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0].id);

  const handleButtonClick = (option: Option) => {
    setSelectedOption(option.id);
    onOptionChange(option.id);
  };

  return (
    <div className="inline-flex rounded-lg border border-tertiary bg-tertiary p-1">
      {options.map((option, index) => (
        <button
          key={index}
          className={`inline-block rounded-md px-4 py-2 text-sm ${
            option.id === selectedOption
              ? 'bg-on-primary text-primary shadow-sm'
              : 'text-on-primary hover:text-on-secondary focus:relative'
          }`}
          onClick={() => handleButtonClick(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectableButtonGroup;