import { Icons } from '@/components/icons';

export interface NavItem {
  name: string;
  href: string;
  icon: keyof typeof Icons;
}