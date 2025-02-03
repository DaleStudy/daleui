import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  Info,
  MessageCircle,
  Menu,
  Moon,
  Search,
  Sun,
  Star,
  User,
  X,
} from "lucide-react";
import type { FunctionComponent, ComponentProps, SVGProps } from "react";
import Discord from "../assets/Discord.svg?react";
import GitHub from "../assets/GitHub.svg?react";
import LinkedIn from "../assets/LinkedIn.svg?react";
import Medium from "../assets/Medium.svg?react";
import YouTube from "../assets/YouTube.svg?react";

function createBrandIcon(Icon: FunctionComponent<SVGProps<SVGSVGElement>>) {
  return (args: ComponentProps<typeof Icon>) => (
    <Icon {...args} fill="currentColor" />
  );
}

export const icons = {
  check: Check,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circleAlert: CircleAlert,
  clock: Clock,
  info: Info,
  chat: MessageCircle,
  menu: Menu,
  moon: Moon,
  search: Search,
  sun: Sun,
  star: Star,
  user: User,
  x: X,
  Discord: createBrandIcon(Discord),
  GitHub: createBrandIcon(GitHub),
  LinkedIn: createBrandIcon(LinkedIn),
  Medium: createBrandIcon(Medium),
  YouTube: createBrandIcon(YouTube),
};

export type IconName = keyof typeof icons;
