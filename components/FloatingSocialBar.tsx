"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faPinterest,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61559772397855",
    icon: faFacebookF,
  },
  {
    name: "Twitter",
    href: "https://x.com/creativoxa",
    icon: faTwitter,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/Creativoxa",
    icon: faPinterest,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/creati_voxa/",
    icon: faInstagram,
  },
  {
    name: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=917679587581&text=Hello+Sir,+I+am+interested+in+your+services",
    icon: faWhatsapp,
  },
];

export default function FloatingSocialBar() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
      {socials.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target="_blank"
          className={`bg-primary text-white w-12 h-12 flex items-center justify-center hover:w-14 transition-all duration-300`}
        >
          <FontAwesomeIcon icon={item.icon} className="text-lg" />
        </Link>
      ))}
    </div>
  );
}