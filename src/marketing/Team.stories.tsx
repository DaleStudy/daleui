import type { Meta, StoryObj } from "@storybook/react-vite";
import { Team, type TeamMember } from "./Team";

const meta = {
  title: "Marketing/Team",
  component: Team,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Team>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const customMembers: TeamMember[] = [
  {
    name: "김달레",
    role: "프로젝트 리드",
    flag: "🇰🇷",
    location: "서울",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "이개발",
    role: "프론트엔드 엔지니어",
    flag: "🇰🇷",
    location: "부산",
    githubUrl: "https://github.com",
  },
  {
    name: "박디자인",
    role: "UI/UX 디자이너",
    flag: "🇯🇵",
    location: "도쿄",
    linkedinUrl: "https://linkedin.com",
  },
];

export const CustomMembers: Story = {
  args: {
    members: customMembers,
  },
};

const singleMember: TeamMember[] = [
  {
    name: "홍길동",
    role: "풀스택 개발자",
    flag: "🇺🇸",
    location: "뉴욕",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
];

export const SingleMember: Story = {
  args: {
    members: singleMember,
  },
};
