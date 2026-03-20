'use client';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import "./ThemeToggle.css"; // We will create this next

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-[60px] h-[34px]"></div>;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <label className="switch scale-75 sm:scale-90">
      <input 
        type="checkbox" 
        onChange={toggleTheme} 
        checked={resolvedTheme === "dark"} 
      />
      <div className="slider round">
        <div className="sun-moon">
          <svg className="moon-dot" id="moon-dot-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="moon-dot" id="moon-dot-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="moon-dot" id="moon-dot-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="light-ray" id="light-ray-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="light-ray" id="light-ray-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="light-ray" id="light-ray-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="cloud-dark" id="cloud-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="cloud-dark" id="cloud-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="cloud-dark" id="cloud-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="cloud-light" id="cloud-4" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="cloud-light" id="cloud-5" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
          <svg className="cloud-light" id="cloud-6" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50"></circle></svg>
        </div>
        <div className="stars">
          {[1, 2, 3, 4].map((i) => (
            <svg key={i} className="star" id={`star-${i}`} viewBox="0 0 20 20">
              <path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>
            </svg>
          ))}
        </div>
      </div>
    </label>
  );
}