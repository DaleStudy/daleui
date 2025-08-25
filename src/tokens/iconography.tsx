import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  Info,
  ExternalLink,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Star,
  Sun,
  User,
  X,
  Eye,
  EyeClosed,
  EyeOff,
  HandHeart,
  ThumbsUp,
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
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circleAlert: CircleAlert,
  clock: Clock,
  externalLink: ExternalLink,
  info: Info,
  menu: Menu,
  messageCircle: MessageCircle,
  moon: Moon,
  search: Search,
  star: Star,
  sun: Sun,
  user: User,
  x: X,
  eye: Eye,
  eyeOff: EyeOff,
  eyeClosed: EyeClosed,
  handHeart: HandHeart,
  thumbsUp: ThumbsUp,
  Discord: createBrandIcon(Discord),
  GitHub: createBrandIcon(GitHub),
  LinkedIn: createBrandIcon(LinkedIn),
  Medium: createBrandIcon(Medium),
  YouTube: createBrandIcon(YouTube),
};

export type IconName = keyof typeof icons;
