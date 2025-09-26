'use client';

import {
  ArrowRightLeft,
  Binary,
  Boxes,
  ChartBarIncreasing,
  Globe,
  Handshake,
  ShoppingBasketIcon,
  Store,
  Users,
} from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

// This is sample data.
const data = {
  user: {
    name: 'Rajibul Hasan',
    email: 'rajibul@fabign.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shop Dashboard',
      logo: Store,
      plan: 'Enterprise',
    },
    {
      name: 'E-commerce Dashboard',
      logo: Globe,
      plan: 'Startup',
    },
    {
      name: 'Reseller Dashboard',
      logo: Handshake,
      plan: 'Free',
    },
  ],
  hotMenu: [
    {
      name: 'Quick Sales',
      url: '/sales',
      icon: ShoppingBasketIcon,
    },
    {
      name: 'Inventory Transfer',
      url: 'inventory-transfer',
      icon: ArrowRightLeft,
    },
  ],
  navMain: [
    {
      title: 'Shop',
      url: '#',
      icon: Store,
      items: [
        {
          title: 'Shops',
          url: '#',
        },
        {
          title: 'Shop Users',
          url: '#',
        },
      ],
    },
    {
      title: 'Reports',
      url: '#',
      icon: ChartBarIncreasing,
      isActive: false,
      items: [
        {
          title: 'Sales',
          url: '#',
        },
        {
          title: 'Inventory',
          url: '#',
        },
        {
          title: 'Pathao',
          url: '#',
        },
      ],
    },
  ],
  settings: [
    {
      title: 'Products',
      url: '#',
      icon: Boxes,
      isActive: false,
      items: [
        {
          title: 'Add New',
          url: '/product/new',
        },
        {
          title: 'Manage Products',
          url: '/product/products',
        },
        {
          title: 'Category',
          url: '/product/category',
        },
        {
          title: 'Sub-Category',
          url: '/product/sub-category',
        },
      ],
    },
    {
      title: 'Shop',
      url: '#',
      icon: Store,
      isActive: false,
      items: [
        {
          title: 'Add New',
          url: 'shop/new',
        },
        {
          title: 'Manage Shop',
          url: 'shop/shops',
        },
        {
          title: 'Shop Users',
          url: 'shop/users',
        },
      ],
    },
    {
      title: 'Promo',
      url: '#',
      icon: Binary,
      items: [
        {
          title: 'Add New',
          url: 'promo/new',
        },
        {
          title: 'Manage Promo',
          url: 'promo/promos',
        },
      ],
    },
    {
      title: 'Users',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'E-commerce Users',
          url: 'users/e-commerce',
        },
        {
          title: 'Promo Users',
          url: 'users/promo',
        },
        {
          title: 'Reseller Users',
          url: 'users/resellers',
        },
        {
          title: 'Blacklist',
          url: 'users/blacklist',
        },
        {
          title: 'Force password change',
          url: 'users/force-password-change',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.hotMenu} title="Quick Menu" />
        <NavMain items={data.navMain} title="Categorised Reports" />
        <NavMain items={data.settings} title="Settings" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
