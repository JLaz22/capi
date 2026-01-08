import type { ReactNode } from "react";

export default function Shell({
  titleRight,
  children,
}: {
  titleRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Campus Meal Saver
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Smart meal planning for college students
          </p>
        </div>
        {titleRight ? <div className="text-right">{titleRight}</div> : null}
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
