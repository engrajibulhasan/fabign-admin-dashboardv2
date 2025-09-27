// components/page-card.tsx (simpler version)
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface Action {
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

interface TitleCardProps {
  title: string;
  actions?: Action[];
}

export default function TitleCard({
  title = 'Page Title',
  actions = [],
}: TitleCardProps) {
  return (
    <Card className="w-full mb-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">{title}</CardTitle>

        {actions.length > 0 && (
          <div className="flex items-center gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.onClick}
                disabled={action.disabled}
              >
                {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  );
}
