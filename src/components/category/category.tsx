'use client';
import { ActionType } from '@/lib/types';
import { Box, Plus } from 'lucide-react';
import TitleCard from '../ui/title-card';
import CategoryTableShared from './category-table-shared';

export default function Category() {
  const handleAddToCardModal = () => {
    console.log('Category Add Modal Opened');
  }

  const actions: ActionType[] = [
    {
      label: 'Add Category',
      icon: Plus,
      variant: 'default' as const,
      onClick: function(){
        console.log("hahaha");
      },
    },
  ];
  return (
    <div className="px-4">
      <TitleCard icon={Box}  title="Categories" actions={actions} />
      <CategoryTableShared />
    </div>
  );
}
