'use client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionType } from '@/lib/types';
import { LucideIcon } from 'lucide-react';

interface TitleCardProps {
  title: string;
  icon?: LucideIcon | undefined;
  actions?: ActionType[];
}

export default function TitleCard({
  title = 'Page Title',
  icon: Icon,
  actions = [],
}: TitleCardProps) {
  return (
    <Card className="w-full mb-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl flex items-center">
          {Icon && <Icon className="h-4 w-4 mr-2" />} {title}
        </CardTitle>

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
