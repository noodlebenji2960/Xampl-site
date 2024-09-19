import React, { useState, ReactNode } from "react";
import "./Dropdown.css";

type DropdownProps = {
  trigger: ReactNode; // The element that triggers the dropdown
  onMouseLeave: () => void;
  children: ReactNode; // Dropdown items will be passed as children
};

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Apply a class based on whether the dropdown is open
  const dropdownClass = isOpen ? "dropdown-open" : "dropdown-closed";

  return (
    <div className="dropdown-wrapper" onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="dropdown-trigger">
        {trigger}
      </div>
      <ul className={`dropdown ${dropdownClass}`} onMouseLeave={handleMouseLeave}>
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
