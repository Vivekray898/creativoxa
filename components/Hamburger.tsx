'use client';
import "./Hamburger.css";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    /* We add the 'active' class based on the 'isOpen' prop */
    <label className={`hamburger ${isOpen ? 'active' : ''}`}>
      <input 
        type="checkbox" 
        checked={isOpen} 
        onChange={onClick} // This triggers the state change in Navbar
      />
      <svg viewBox="0 0 32 32">
        <path
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          className="line line-top-bottom"
        ></path>
        <path d="M7 16 27 16" className="line"></path>
      </svg>
    </label>
  );
}