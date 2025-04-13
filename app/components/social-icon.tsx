"use client";

import Link from "next/link";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  textColor?: string;
}

export default function SocialIcon({
  href,
  icon,
  label,
  textColor,
}: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-colors"
      style={{ color: textColor || "inherit" }}
      aria-label={label}
    >
      {icon}
    </Link>
  );
}
