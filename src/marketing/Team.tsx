import { css } from "../../styled-system/css";
import hansaemAvatar from "../assets/images/marketing/team/hansaem.webp";
import riaAvatar from "../assets/images/marketing/team/ria.webp";
import { Card } from "../components/Card/Card";
import { Flex } from "../components/Flex/Flex";
import { Heading } from "../components/Heading/Heading";
import { HStack } from "../components/HStack/HStack";
import { Icon } from "../components/Icon/Icon";
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
      {/* 상단 컨텐츠 영역 */}
      <HStack gap="16" align="left">
        {/* 프로필 아바타 */}
        <div
          className={css({
            width: "45px",
            height: "45px",
            borderRadius: "full",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            backgroundColor: "#e3e7ff",
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
                color: "#5cb85c",
              })}
            >
              <Icon name="codeXml" size="md" />
            </div>
          )}
        </div>

        {/* 멤버 정보 */}
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

      {/* 소셜 링크 영역 */}
      <HStack align="right" gap="20" className={css({ width: "100%" })}>
        {githubUrl && (
          <Link
            href={githubUrl}
            external
            underline={false}
            tone="neutral"
            aria-label={`${name}의 GitHub 프로필`}
          >
            <Icon name="GitHub" size="sm" />
          </Link>
        )}
        {linkedinUrl && (
          <Link
            href={linkedinUrl}
            external
            underline={false}
            tone="neutral"
            aria-label={`${name}의 LinkedIn 프로필`}
          >
            <Icon name="LinkedIn" size="sm" />
          </Link>
        )}
      </HStack>
    </Card>
  );
}

export interface TeamProps {
  /** 팀원 목록 */
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
        {/* 헤더 영역 */}
        <VStack gap="12" align="center">
          <Tag tone="brand">팀 소개</Tag>
          <Heading level={4} align="center" wordBreak="cjk">
            함께 성장하고 있는 달레 UI 팀을 소개합니다.
          </Heading>
        </VStack>

        {/* 카드 컨테이너 */}
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
              base: "1fr", // Mobile: 1열
              sm: "repeat(2, 1fr)", // Tablet (640px+): 2열
              lg: "repeat(3, 1fr)", // Desktop (1024px+): 3열
              xl: "repeat(4, 1fr)", // Large Desktop (1280px+): 4열
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
