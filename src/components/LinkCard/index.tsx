import { CaretRight } from "phosphor-react";
import { ReactNode } from "react";

interface VideoLinkProps {
  icon: ReactNode;
  href: string;
  title: string;
  description: string;
}

export function LinkCard({ icon, href, description, title }: VideoLinkProps) {
  return (
    <a href={href} className="bg-gray-700 rounded overflow-hidden flex items-center gap-4
    hover:bg-gray-600 transition-colors lg:items-stretch justify-between lg:justify-start lg:gap-6">
      <div className="bg-green-700 min-h-full p-6 flex items-center self-stretch lg:self-auto">
        {icon}
      </div>

      <div className="py-6 leading-relaxed">
        <strong className="text-lg lg:text-2xl">{title}</strong>
        <p className="text-xs lg:text-sm text-gray-200 mt-2">
          {description}
        </p>
      </div>

      <div className="h-full p-6 flex items-center">
        <CaretRight size={24} />
      </div>
    </a>
  );
}