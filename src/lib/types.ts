import { LucideIcon } from 'lucide-react';



export interface ActionType {
  label: string;
  icon?: LucideIcon;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  onClick: () => void;
  disabled?: boolean;
}
