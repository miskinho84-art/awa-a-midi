interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="font-display text-3xl font-bold text-cocoa-900 md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-cocoa-600">{subtitle}</p>}
    </div>
  );
}
