import React from "react";

interface PageHeaderProps {
  badge?: string;
  badgeClassName?: string;
  title: string;
  subtitle?: string;
  subtitleHighlight?: string;
  inlineAction?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({
  badge,
  badgeClassName = "text-secondary bg-secondary/10",
  title,
  subtitle,
  subtitleHighlight,
  inlineAction,
  actions,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="flex-1 min-w-0">
        {badge && (
          <span
            className={`text-[10px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 rounded inline-block mb-2 ${badgeClassName}`}
          >
            {badge}
          </span>
        )}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-background">
            {title}
          </h1>
          {inlineAction}
        </div>
        {subtitle && (
          <p className="text-slate-400 mt-2 max-w-xl">
            {subtitle}
            {subtitleHighlight && (
              <>
                {" "}
                <span className="text-primary font-bold">{subtitleHighlight}</span>
              </>
            )}
          </p>
        )}
      </div>
      {actions && <div className="flex gap-4">{actions}</div>}
    </header>
  );
}
