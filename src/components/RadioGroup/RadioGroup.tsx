export interface RadioGroupProps {
  options: { label: string; value: string }[];
}

export const RadioGroup = ({ options }: RadioGroupProps) => {
  if (options.length <= 1) {
    throw new Error('2개 이상의 옵션을 넣어주세요');
  }

  return <></>;
};
