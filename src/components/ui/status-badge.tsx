import { cn } from "@/lib/utils";

type ProjectStatus = "Completed" | "In Progress" | "Maintaining" | "Focusing" | string;

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
  withHoverEffect?: boolean;
}

const statusStyles: Record<string, { base: string; hover: string }> = {
  Completed: {
    base: "bg-green-500/20 text-green-500",
    hover: "group-hover:bg-green-500/30",
  },
  "In Progress": {
    base: "bg-blue-500/20 text-blue-500",
    hover: "group-hover:bg-blue-500/30",
  },
  Maintaining: {
    base: "bg-purple-500/20 text-purple-500",
    hover: "group-hover:bg-purple-500/30",
  },
  Focusing: {
    base: "bg-amber-500/20 text-amber-500",
    hover: "group-hover:bg-amber-500/30",
  },
};

const defaultStyle = {
  base: "bg-gray-500/20 text-gray-500",
  hover: "group-hover:bg-gray-500/30",
};

export function StatusBadge({
  status,
  className,
  withHoverEffect = true,
}: StatusBadgeProps) {
  const style = statusStyles[status] || defaultStyle;

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs rounded-sm border border-foreground dark:border-white/25",
        style.base,
        withHoverEffect && style.hover,
        className
      )}
    >
      {status}
    </span>
  );
}
