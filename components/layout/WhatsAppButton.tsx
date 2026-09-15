import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

export default function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Creativoxa on WhatsApp"
      style={{
        position: "fixed",
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
      className="z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-muted shadow-lg transition-colors hover:border-[#25D366] hover:text-[#25D366]"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}