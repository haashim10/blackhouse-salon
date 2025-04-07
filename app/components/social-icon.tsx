import Link from 'next/link';

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function SocialIcon({ href, icon, label }: SocialIconProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-foreground hover:text-accent transition-colors"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}