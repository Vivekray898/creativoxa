'use client';
import "./Hamburger.css";

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Hamburger({ isOpen, onClick }: HamburgerProps) {
  return (
    <button 
      onClick={onClick}
      className={`nav-icon-wrapper ${isOpen ? 'open' : ''}`}
      aria-label="Toggle Menu"
    >
      <div className="nav-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
}