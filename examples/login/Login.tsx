import { Button } from "../../src/components/Button/Button";

interface Props {
  onSubmit: () => void;
}

export function Login({ onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <Button variant="solid" type="submit">
        로그인
      </Button>
    </form>
  );
}
