import { css } from "../../styled-system/css";
import githubIcon from "../assets/images/marketing/team/github.webp";
import hansaemAvatar from "../assets/images/marketing/team/hansaem.webp";
import linkedinIcon from "../assets/images/marketing/team/linkedin.webp";
import riaAvatar from "../assets/images/marketing/team/ria.webp";
import { Card } from "../components/Card/Card";
import { Flex } from "../components/Flex/Flex";
import { Heading } from "../components/Heading/Heading";
import { HStack } from "../components/HStack/HStack";
import { Link } from "../components/Link/Link";
import { Tag } from "../components/Tag/Tag";
import { Text } from "../components/Text/Text";
import { VStack } from "../components/VStack/VStack";

export interface TeamMember {
  /** 팀원 이름 */
  name: string;
  /** 역할 */
  role: string;
  /** 국기 이모지 (예: 🇰🇷, 🇨🇦, 🇺🇸) */
  flag?: string;
  /** 장소 (예: 서울, 토론토) */
  location: string;
  /** 프로필 이미지 (없으면 기본 아바타 표시) */
  avatar?: string;
  /** GitHub URL */
  githubUrl?: string;
  /** LinkedIn URL */
  linkedinUrl?: string;
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const { name, role, flag, location, avatar, githubUrl, linkedinUrl } = member;

  return (
    <Card
      className={css({
        padding: "16",
        borderRadius: "sm",
        overflow: "hidden",
      })}
    >
      <HStack gap="16" align="left">
        <div
          className={css({
            width: "45px",
            height: "45px",
            borderRadius: "full",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            backgroundColor: "bg.brand.active",
          })}
        >
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}의 프로필 사진`}
              className={css({
                width: "100%",
                height: "100%",
                objectFit: "cover",
              })}
            />
          ) : (
            <div
              className={css({
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="21"
                viewBox="0 0 25 21"
                fill="none"
              >
                <path
                  d="M19.1 15.0005L23.5 10.5005L19.1 6.00049M5.9 6.00049L1.5 10.5005L5.9 15.0005M15.25 1.50049L9.75 19.5005"
                  stroke="url(#paint0_linear_6869_4263)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6869_4263"
                    x1="29.3667"
                    y1="10.8755"
                    x2="0.0333347"
                    y2="10.8755"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="var(--colors-border-brand-focus)" />
                    <stop offset="1" stopColor="var(--colors-border-success)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
        <Card.Body
          className={css({
            flex: 1,
            minWidth: 0,
            gap: "4",
          })}
        >
          <Heading
            level={5}
            className={css({
              color: "fg.neutral.active",
              wordBreak: "keep-all",
            })}
          >
            {name}
          </Heading>
          <Flex
            gap="4"
            align="center"
            className={css({
              width: "100%",
            })}
          >
            <Text
              size="sm"
              className={css({
                lineHeight: "1.2",
                color: "fg.neutral",
              })}
            >
              {flag && <span>{flag} </span>}
              {location}
            </Text>
            <Text
              size="sm"
              muted
              className={css({
                lineHeight: "1.2",
              })}
            >
              |
            </Text>
            <Text
              size="sm"
              className={css({
                lineHeight: "1.2",
                color: "fg.neutral",
              })}
            >
              {role}
            </Text>
          </Flex>
        </Card.Body>
      </HStack>
      <HStack align="right" gap="20" className={css({ width: "100%" })}>
        {githubUrl && (
          <Link
            href={githubUrl}
            external
            underline={false}
            aria-label={`${name}의 GitHub 프로필`}
          >
            <img
              src={githubIcon}
              alt="GitHub"
              className={css({
                width: "14px",
                height: "14px",
              })}
            />
          </Link>
        )}
        {linkedinUrl && (
          <Link
            href={linkedinUrl}
            external
            underline={false}
            aria-label={`${name}의 LinkedIn 프로필`}
          >
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              className={css({
                width: "14px",
                height: "14px",
              })}
            />
          </Link>
        )}
      </HStack>
    </Card>
  );
}

export interface TeamProps {
  members?: TeamMember[];
}

const Members: TeamMember[] = [
  {
    name: "달레",
    role: "Engineer",
    flag: "🇨🇦",
    location: "Toronto",
    githubUrl: "https://github.com/DaleSeo",
    linkedinUrl: "https://www.linkedin.com/in/daleseo/",
  },
  {
    name: "Helena",
    role: "Engineer",
    flag: "🇨🇦",
    location: "Toronto",
    githubUrl: "https://github.com/yolophg",
    linkedinUrl: "https://www.linkedin.com/in/yolophg/",
  },
  {
    name: "Evan (에반)",
    role: "Engineer",
    flag: "🇨🇦",
    location: "Toronto",
    githubUrl: "https://github.com/sounmind",
    linkedinUrl: "https://www.linkedin.com/in/suhyeong-evan-lee/",
  },
  {
    name: "hyoseong",
    role: "Engineer",
    flag: "🇰🇷",
    location: "Seoul",
    githubUrl: "https://github.com/hyoseong1994",
    linkedinUrl: "https://www.linkedin.com/in/hyoseong1994/",
  },
  {
    name: "Ria (리아)",
    role: "Engineer",
    flag: "🇰🇷",
    location: "Seoul",
    avatar: riaAvatar,
    githubUrl: "https://github.com/RiaOh",
    linkedinUrl: "https://www.linkedin.com/in/riaoh/",
  },
  {
    name: "살미",
    role: "Engineer",
    flag: "🇰🇷",
    location: "Seoul",
    githubUrl: "https://github.com/Lustellz",
    linkedinUrl: "https://www.linkedin.com/in/tasha0417/",
  },
  {
    name: "은지",
    role: "Engineer",
    flag: "🇰🇷",
    location: "Seoul",
    githubUrl: "https://github.com/y00eunji",
    linkedinUrl: "https://www.linkedin.com/in/y00eunji/",
  },
  {
    name: "한샘",
    role: "Engineer",
    flag: "🇰🇷",
    location: "Seoul",
    avatar: hansaemAvatar,
    githubUrl: "https://github.com/Hecklebot",
    linkedinUrl: "https://www.linkedin.com/in/hansaem-so/",
  },
  {
    name: "Aka (아카)",
    role: "Engineer",
    flag: "🇰🇷",
    location: "Seoul",
    githubUrl: "https://github.com/HowToBeAHappyBoy",
    linkedinUrl: "https://www.linkedin.com/in/seozi/",
  },
  {
    name: "승현",
    role: "Designer",
    flag: "🇰🇷",
    location: "Seoul",
    githubUrl: "https://github.com/sseung30",
    linkedinUrl: undefined,
  },
  {
    name: "자혜",
    role: "Designer",
    flag: "🇰🇷",
    location: "Seoul",
    githubUrl: "https://github.com/jj5u",
    linkedinUrl: undefined,
  },
];

export function Team({ members = Members }: TeamProps) {
  return (
    <section
      id="team"
      className={css({
        width: "100%",
        py: {
          base: "40",
          sm: "60px",
          md: "80px",
        },
        px: {
          base: "16",
          sm: "24",
        },
        backgroundColor: "bg.brand",
      })}
    >
      <VStack
        gap="40"
        className={css({
          width: "100%",
          maxWidth: "1280px",
          mx: "auto",
          px: { base: "0", sm: "24" },
        })}
      >
        <VStack gap="12" align="center">
          <Tag tone="brand">팀 소개</Tag>
          <Heading level={4} align="center" wordBreak="cjk">
            함께 성장하고 있는 달레 UI 팀을 소개합니다.
          </Heading>
        </VStack>
        <div
          className={css({
            display: "grid",
            gap: {
              base: "24",
              sm: "40px",
              lg: "24",
            },
            width: "100%",
            gridTemplateColumns: {
              base: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
          })}
        >
          {members.map((member, index) => (
            <TeamCard key={`${member.name}-${index}`} member={member} />
          ))}
        </div>
      </VStack>
    </section>
  );
}
