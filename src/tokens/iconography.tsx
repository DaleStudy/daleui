import {
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  CodeXml,
  ExternalLink,
  Eye,
  EyeClosed,
  EyeOff,
  Globe,
  HandHeart,
  HeartHandshake,
  Info,
  LoaderCircle,
  Menu,
  MessageCircle,
  MessageCircleMore,
  Moon,
  Search,
  Star,
  Sun,
  ThumbsUp,
  User,
  Users,
  X,
} from "lucide-react";

import type { ComponentProps, FunctionComponent, SVGProps } from "react";
import Discord from "../assets/Discord.svg?react";
import Figma from "../assets/Figma.svg?react";
import GitHub from "../assets/GitHub.svg?react";
import Kr from "../assets/Kr.svg?react";
import LinkedIn from "../assets/LinkedIn.svg?react";
import Medium from "../assets/Medium.svg?react";
import Storybook from "../assets/Storybook.svg?react";
import YouTube from "../assets/YouTube.svg?react";

function createBrandIcon(Icon: FunctionComponent<SVGProps<SVGSVGElement>>) {
  return (args: ComponentProps<typeof Icon>) => (
    <Icon {...args} fill="currentColor" />
  );
}

export const icons = {
  award: Award,
  check: Check,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circleAlert: CircleAlert,
  clock: Clock,
  codeXml: CodeXml,
  externalLink: ExternalLink,
  eye: Eye,
  eyeClosed: EyeClosed,
  eyeOff: EyeOff,
  globe: Globe,
  handHeart: HandHeart,
  heartHandshake: HeartHandshake,
  info: Info,
  kr: Kr,
  loaderCircle: LoaderCircle,
  menu: Menu,
  messageCircle: MessageCircle,
  messageCircleMore: MessageCircleMore,
  moon: Moon,
  search: Search,
  star: Star,
  sun: Sun,
  thumbsUp: ThumbsUp,
  user: User,
  users: Users,
  x: X,
  Discord: createBrandIcon(Discord),
  GitHub: createBrandIcon(GitHub),
  LinkedIn: createBrandIcon(LinkedIn),
  Medium: createBrandIcon(Medium),
  YouTube: createBrandIcon(YouTube),
  Storybook: createBrandIcon(Storybook),
  Figma: createBrandIcon(Figma),
};

export type IconName = keyof typeof icons;
