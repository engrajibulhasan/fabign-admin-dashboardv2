"use client"
import { ActionObjType } from '@/lib/types';
import { Plus } from 'lucide-react';
import TitleCard from '../ui/title-card';
import CategoryTableShared from './category-table-shared';

export default function Category() {
     const actions: ActionObjType[] = [

    {
      label: "Add Category",
      icon: Plus,
      variant: "default" as const,
      onClick: () => console.log("Add clicked")
    }
  ];
  return (
    <div className='px-4'>
            <TitleCard title='Categories' actions={actions}/>
            <CategoryTableShared/>
        </div>
  )
}
