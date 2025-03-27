import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { RadioGroup } from './RadioGroup';

test.each([[[]], [[{ label: 'huey', value: 'Huey' }]]])(
  '라디오그룹 options에 요소를 하나 이하를 전달하면 에러를 던진다.',
  (options) => {
    expect(() => {
      render(<RadioGroup options={options} />);
    }).toThrow('2개 이상의 옵션을 넣어주세요');
  }
);
