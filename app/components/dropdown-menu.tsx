"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface DropdownProps {
  label: string;
  items: { label: string; href: string }[];
  textColor?: string;
  backgroundColor?: string;
}

export default function DropdownMenu({ 
  label, 
  items,
  textColor,
  backgroundColor
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Use provided text color or default to foreground
  const buttonStyle = {
    color: textColor || "inherit",
  };

  // Style for dropdown menu based on provided colors
  const menuStyle = {
    backgroundColor: backgroundColor || "var(--background)",
    borderColor: textColor ? `${textColor}20` : "var(--accent)10",
  };

  // Style for dropdown items
  const itemStyle = {
    color: textColor || "var(--foreground)",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link text-sm font-normal hover:opacity-80 transition-colors flex items-center gap-1"
        style={buttonStyle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-48 border shadow-xl rounded-sm z-[100]"
          style={menuStyle}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-foreground/10 transition-colors"
              style={itemStyle}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}