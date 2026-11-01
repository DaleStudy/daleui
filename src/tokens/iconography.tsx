import {
  Award,
  Book,
  BookOpen,
  Brain,
  Building2,
  Calendar,
  ChartBar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  CodeXml,
  Copy,
  Download,
  ExternalLink,
  Eye,
  EyeClosed,
  EyeOff,
  Globe,
  HandHeart,
  HeartHandshake,
  Info,
  Laptop,
  Link,
  LoaderCircle,
  Menu,
  MessageCircle,
  MessageCircleMore,
  Moon,
  Palette,
  PenLine,
  Plus,
  Puzzle,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  ThumbsUp,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

import type { ComponentProps, FunctionComponent, SVGProps } from "react";
import Discord from "../assets/Discord.svg?react";
import Figma from "../assets/Figma.svg?react";
import GitHub from "../assets/GitHub.svg?react";
import GitHubDark from "../assets/GitHubDark.svg?react";
import Kr from "../assets/Kr.svg?react";
import LinkedIn from "../assets/LinkedIn.svg?react";
import LinkedInDark from "../assets/LinkedInDark.svg?react";
import Medium from "../assets/Medium.svg?react";
import Storybook from "../assets/Storybook.svg?react";
import Threads from "../assets/Threads.svg?react";
import XTwitter from "../assets/XTwitter.svg?react";
import YouTube from "../assets/YouTube.svg?react";

function createBrandIcon(Icon: FunctionComponent<SVGProps<SVGSVGElement>>) {
  return (args: ComponentProps<typeof Icon>) => (
    <Icon {...args} fill="currentColor" />
  );
}

export const icons = {
  award: Award,
  book: Book,
  bookOpen: BookOpen,
  brain: Brain,
  building2: Building2,
  calendar: Calendar,
  chartBar: ChartBar,
  check: Check,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circleAlert: CircleAlert,
  clock: Clock,
  codeXml: CodeXml,
  copy: Copy,
  download: Download,
  externalLink: ExternalLink,
  eye: Eye,
  eyeClosed: EyeClosed,
  eyeOff: EyeOff,
  globe: Globe,
  handHeart: HandHeart,
  heartHandshake: HeartHandshake,
  info: Info,
  kr: Kr,
  laptop: Laptop,
  link: Link,
  loaderCircle: LoaderCircle,
  menu: Menu,
  messageCircle: MessageCircle,
  messageCircleMore: MessageCircleMore,
  moon: Moon,
  palette: Palette,
  penLine: PenLine,
  plus: Plus,
  puzzle: Puzzle,
  search: Search,
  share2: Share2,
  shieldCheck: ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  sun: Sun,
  thumbsUp: ThumbsUp,
  trendingUp: TrendingUp,
  user: User,
  users: Users,
  wallet: Wallet,
  x: X,
  Discord: createBrandIcon(Discord),
  GitHub: createBrandIcon(GitHub),
  LinkedIn: createBrandIcon(LinkedIn),
  Medium: createBrandIcon(Medium),
  YouTube: createBrandIcon(YouTube),
  Storybook: createBrandIcon(Storybook),
  Figma: createBrandIcon(Figma),
  Threads: createBrandIcon(Threads),
  XTwitter: createBrandIcon(XTwitter),
  GithubLight: GitHub,
  GithubDark: GitHubDark,
  LinkedInLight: LinkedIn,
  LinkedInDark: LinkedInDark,
};

export type IconName = keyof typeof icons;
