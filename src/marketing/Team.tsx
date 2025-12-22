import { css } from "../../styled-system/css";
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
  /** 장소 (예: 🇰🇷서울) */
  location: string;
  /** 프로필 이미지 URL (없으면 기본 아바타 표시) */
  avatarUrl?: string;
  /** GitHub URL */
  githubUrl?: string;
  /** LinkedIn URL */
  linkedinUrl?: string;
}

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const { name, role, location, avatarUrl, githubUrl, linkedinUrl } = member;

  return (
    <Card
      className={css({
        padding: "16",
        borderRadius: "sm",
        overflow: "hidden",
        flex: "1 0 0",
        minWidth: "260px",
        maxWidth: "360px",
      })}
    >
      {/* 상단 컨텐츠 영역 */}
      <HStack gap="12" align="left">
        {/* 프로필 아바타 */}
        <div
          className={css({
            width: "60px",
            height: "60px",
            borderRadius: "full",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            backgroundColor: "#e3e7ff",
          })}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
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
              <Icon name="codeXml" size="lg" />
            </div>
          )}
        </div>

        {/* 멤버 정보 */}
        <Card.Body
          className={css({
            flex: 1,
            minWidth: 0,
            gap: "2",
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
            direction="column"
            gap="0"
            align="start"
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
              {role}
            </Text>
            <Text
              size="sm"
              muted
              className={css({
                lineHeight: "1.2",
              })}
            >
              {location}
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

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: "김들리",
    role: "엔지니어",
    location: "🇨🇦토론토",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "홍길동",
    role: "역할",
    location: "🇰🇷장소",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "고길동",
    role: "디자이너",
    location: "🇰🇷서울",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "홍길동",
    role: "역할",
    location: "🇰🇷장소",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "홍길동",
    role: "역할",
    location: "🇰🇷장소",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "홍길동",
    role: "역할",
    location: "🇰🇷장소",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "홍길동",
    role: "역할",
    location: "🇰🇷장소",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Name",
    role: "역할",
    location: "🇰🇷장소",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
];

export function Team({ members = DEFAULT_MEMBERS }: TeamProps) {
  return (
    <section
      id="team"
      className={css({
        width: "100%",
        py: "80px",
        px: "24",
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
        <Flex
          className={css({
            flexWrap: "wrap",
            gap: "24",
            width: "100%",
            justifyContent: "flex-start",
          })}
        >
          {members.map((member, index) => (
            <TeamCard key={`${member.name}-${index}`} member={member} />
          ))}
        </Flex>
      </VStack>
    </section>
  );
}
