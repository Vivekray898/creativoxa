type IconProps = {
  name: keyof typeof paths;
  className?: string;
};

// Minimal, consistent 24x24 stroke icon set (Heroicons-style paths)
const paths = {
  search: <path d="m21 21-5.2-5.2M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />,
  megaphone: (
    <path d="M3 10v4a1 1 0 0 0 1 1h2l4 4V5L6 9H4a1 1 0 0 0-1 1Zm14.5-2.5a7 7 0 0 1 0 9M14.5 10a3.5 3.5 0 0 1 0 4" />
  ),
  shield: <path d="M12 3 5 5.8v5.4c0 4.3 2.9 7.4 7 8.8 4.1-1.4 7-4.5 7-8.8V5.8L12 3Z" />,
  inbox: <path d="M3 13h4l2 3h6l2-3h4M5 5h14l2 8v6H3v-6l2-8Z" />,
  chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" />,
  globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.4 3.9 5.6 3.9 9S14.5 18.6 12 21c-2.5-2.4-3.9-5.6-3.9-9S9.5 5.4 12 3Z" />,
  target: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-4.5h.01" />,
  code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14" />,
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5" />,
  headset: <path d="M4 13a8 8 0 1 1 16 0m-16 0v3a2 2 0 0 0 2 2h1v-5H5a1 1 0 0 0-1 1Zm16 0v3a2 2 0 0 1-2 2h-2v-5h3a1 1 0 0 1 1 1Zm-4 5v.5a1.5 1.5 0 0 1-1.5 1.5H12" />,
  pin: <path d="M12 21s-7-5.3-7-11a7 7 0 1 1 14 0c0 5.7-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  arrowRight: <path d="M4 12h15m-6-7 7 7-7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  sun: (
    <path d="M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM12 2.5v2.2M12 19.3v2.2M4.3 4.3l1.55 1.55M18.15 18.15l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.3 19.7l1.55-1.55M18.15 5.85l1.55-1.55" />
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />,
  mail: <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 1 8 6 8-6" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  whatsapp: (
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm4.2 12.3c-.2.6-1.2 1.1-1.7 1.1-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.5-2.6-1.1-4.3-3.7-4.4-3.9-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6c-.1.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.3.6-.2l2.1 1c.3.1.5.2.5.4 0 .1 0 .4-.2 1Z" />
  ),
  map: <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Zm0 0v14m6-12v14" />,
  briefcase: <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-9 0h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm8 6v2" />,
  users: <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1m17 0v-1a4 4 0 0 0-3-3.87M14.5 4.1a4 4 0 0 1 0 7.8M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />,
  cursor: <path d="m5 4 7 16 2-7 7-2L5 4Z" />,
  funnel: <path d="M4 5h16l-6.5 8v6l-3-2v-4L4 5Z" />,
  paint: <path d="M12 3a9 9 0 0 0 0 18c1.2 0 1.8-.9 1.4-2-.4-1.2.3-2 1.6-2H17a4 4 0 0 0 4-4c0-5-4-10-9-10Zm-4.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />,
  bulb: <path d="M9.5 18v-1.8c0-.7-.3-1.3-.8-1.9A6.5 6.5 0 1 1 18 9.6c0 1.9-.8 3.5-2 4.7-.6.6-.9 1.2-.9 1.9V18m-5.6 0h7.2m-6 3h4.8" />,
  puzzle: <path d="M10 4a2 2 0 1 1 4 0v1h4v4h1a2 2 0 1 1 0 4h-1v4h-4v1a2 2 0 1 1-4 0v-1H6v-4H5a2 2 0 1 1 0-4h1V5h4V4Z" />,
  monitor: <path d="M8 21h8m-4-4v4M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" />,
  bolt: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />,
  refresh: <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3c0 5.4-7.5 10-7.5 10Z" />,
  building: <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16m4 0H2m4-12h2m4 0h2m-8 4h2m4 0h2m-8 4h2m4 0h2" />,
  graduation: <path d="m2 9 10-5 10 5-10 5L2 9Zm4 2.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5" />,
  stethoscope: <path d="M5 4v6a5 5 0 0 0 10 0V4M8 4H5m7 0h-3m6 7a4 4 0 1 0 0 .01M12 18h1.5a3.5 3.5 0 0 0 3.5-3.5V13m-9 5v3" />,
} as const;

export default function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
