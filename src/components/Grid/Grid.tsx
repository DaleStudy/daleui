import { grid, gridItem } from "../../../styled-system/patterns";
import { type ReactNode, createContext, useContext } from "react";
import { css, cva } from "../../../styled-system/css";

export interface GridProps {
  /**
   * 그리드 컨테이너의 자식 요소들
   */
  children: ReactNode;
}
export const Grid = ({ children }: GridProps) => {
  return (
    <div className={grid({ gap: "8", gridTemplateColumns: "repeat(3, 1fr)" })}>
      {children}
    </div>
  );
};

export const GridItem = ({ children }: { children: ReactNode }) => {
  return <div className={gridItem()}>{children}</div>;
};
