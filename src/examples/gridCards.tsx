/**
 * 그리드 카드 목록
 *
 * Grid·GridItem으로 카드를 3열로 배치한다. `gridTemplateColumns`로 열 수를 지정한다.
 */
import { Card, Grid, GridItem, Heading, Text } from "../index";

const items = [
  {
    id: 1,
    title: "빠른 시작",
    description: "5분 만에 설치하고 사용해 보세요.",
  },
  {
    id: 2,
    title: "접근성",
    description: "키보드와 스크린 리더를 기본 지원합니다.",
  },
  {
    id: 3,
    title: "다크 모드",
    description: "시맨틱 토큰으로 자동 대응합니다.",
  },
];

export function GridCards() {
  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16">
      {items.map((item) => (
        <GridItem key={item.id}>
          <Card outline>
            <Heading level={4}>{item.title}</Heading>
            <Text>{item.description}</Text>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}
