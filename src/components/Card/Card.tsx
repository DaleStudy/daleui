/**
 * Card 컴포넌트의 하위 컴포넌트들을 Tree-shaking이 가능하도록 export하는 구문입니다.
 */
export {
  Root as CardRoot,
  Body as CardBody,
  Icon as CardIcon,
  Title as CardTitle,
  Description as CardDescription,
  Link as CardLink,
  type CardRootProps,
  type CardBodyProps,
  type CardIconProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardLinkProps,
} from "./Card.part";


/**
 * Card dot-notation export
 * - Card 컴포넌트의 하위 컴포넌트들을 dot-notation 방식으로 사용할 수 있도록 export하는 구문입니다.
 * - Card 컴포넌트는 여러 요소를 하나의 카드 형태로 묶어 표현할 때 사용됩니다.
 * - Card.Root, Card.Body, Card.Icon, Card.Title, Card.Description, Card.Link 등의 하위 컴포넌트를 포함합니다.
 * - 각 하위 컴포넌트는 Card 컨텍스트에서 tone 값을 자동으로 받아 스타일링에 활용할 수 있습니다.
 */
export * as Card from "./namespace";