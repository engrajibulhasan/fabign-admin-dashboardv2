import { LucideIcon } from "lucide-react";

export interface ActionObjType {
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onClick: () => void;
  disabled?: boolean;
}
