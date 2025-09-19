import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  ExternalLink,
  Eye,
  EyeClosed,
  EyeOff,
  HandHeart,
  Info,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Star,
  Sun,
  ThumbsUp,
  User,
  X,
  Globe,
  Award,
  Users,
} from "lucide-react";
import type { FunctionComponent, ComponentProps, SVGProps } from "react";
import Discord from "../assets/Discord.svg?react";
import GitHub from "../assets/GitHub.svg?react";
import LinkedIn from "../assets/LinkedIn.svg?react";
import Medium from "../assets/Medium.svg?react";
import YouTube from "../assets/YouTube.svg?react";
import Storybook from "../assets/Storybook.svg?react";
import Figma from "../assets/Figma.svg?react";
import Kr from "../assets/Kr.svg?react";

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
  eye: Eye,
  eyeClosed: EyeClosed,
  eyeOff: EyeOff,
  handHeart: HandHeart,
  info: Info,
  menu: Menu,
  messageCircle: MessageCircle,
  moon: Moon,
  search: Search,
  star: Star,
  sun: Sun,
  thumbsUp: ThumbsUp,
  user: User,
  users: Users,
  x: X,
  globe: Globe,
  award: Award,
  Kr: createBrandIcon(Kr),
  Discord: createBrandIcon(Discord),
  GitHub: createBrandIcon(GitHub),
  LinkedIn: createBrandIcon(LinkedIn),
  Medium: createBrandIcon(Medium),
  YouTube: createBrandIcon(YouTube),
  Storybook: createBrandIcon(Storybook),
  Figma: createBrandIcon(Figma),
};

export type IconName = keyof typeof icons;
