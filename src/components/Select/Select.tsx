/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  type Ref,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { Select as ArkSelect } from "@ark-ui/react/select";
import { Portal } from "@ark-ui/react/portal";
import { Tooltip } from "@ark-ui/react/tooltip";
import { useSelectContext as useArkSelectContext } from "@ark-ui/react";
import { ListCollection, type CollectionItem } from "@zag-js/collection";
import { css, cva } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";

interface SelectItemData extends CollectionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectContextValue {
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  registerItem: (value: string, children: ReactNode) => void;
  unregisterItem: (value: string) => void;
  onValueChange?: (value: string | undefined) => void;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select.Root");
  }
  return context;
}

interface SelectRootProps {
  /** 선택된 값을 제어합니다 */
  value?: string;
  /** 초기값을 설정합니다 */
  defaultValue?: string;
  /** 값이 변경될 때 호출되는 함수입니다 */
  onValueChange?: (value: string | undefined) => void;
  /** 선택을 비활성화합니다 */
  disabled?: boolean;
  /** 필수 입력 여부를 나타냅니다 */
  required?: boolean;
  /** 오류 상태를 나타냅니다 */
  invalid?: boolean;
  /** 이름을 설정합니다 */
  name?: string;
  /** 값을 지울 수 있는 버튼을 표시합니다 */
  clearable?: boolean;
  /** 하위 컴포넌트를 설정합니다 */
  children: ReactNode;
}

interface SelectTriggerProps {
  placeholder?: string;
  "aria-label"?: string;
  children?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

interface SelectContentProps {
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

interface OverflowTextProps {
  children: ReactNode;
}

const Root = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  required,
  invalid,
  name,
  clearable,
  children,
}: SelectRootProps) => {
  const [items, setItems] = useState<Map<string, ReactNode>>(new Map());

  const registerItem = useCallback((value: string, children: ReactNode) => {
    setItems((prev) => {
      const next = new Map(prev);
      next.set(value, children);
      return next;
    });
  }, []);

  const unregisterItem = useCallback((value: string) => {
    setItems((prev) => {
      const next = new Map(prev);
      next.delete(value);
      return next;
    });
  }, []);

  const collectionItems: SelectItemData[] = useMemo(() => {
    return Array.from(items.entries()).map(([value, children]) => ({
      value,
      label: typeof children === "string" ? children : value,
      disabled: false,
    }));
  }, [items]);

  const collection = useMemo(
    () =>
      new ListCollection<SelectItemData>({
        items: collectionItems,
        itemToValue: (item) => item.value,
        itemToString: (item) => item.label,
        isItemDisabled: (item) => item.disabled ?? false,
      }),
    [collectionItems],
  );

  const contextValue: SelectContextValue = useMemo(
    () => ({
      disabled,
      required,
      invalid,
      clearable,
      registerItem,
      unregisterItem,
      onValueChange,
    }),
    [
      disabled,
      required,
      invalid,
      clearable,
      registerItem,
      unregisterItem,
      onValueChange,
    ],
  );

  const handleValueChange = useCallback(
    (details: { value: string[] | undefined }) => {
      const newValue = details.value?.[0];
      onValueChange?.(newValue || undefined);
    },
    [onValueChange],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <ArkSelect.Root
        value={controlledValue ? [controlledValue] : undefined}
        defaultValue={defaultValue ? [defaultValue] : undefined}
        onValueChange={handleValueChange}
        disabled={disabled}
        invalid={invalid}
        collection={collection}
        positioning={{ sameWidth: true }}
        className={css({
          width: "100%",
        })}
      >
        {name && <ArkSelect.HiddenSelect name={name} required={required} />}
        {children}
      </ArkSelect.Root>
    </SelectContext.Provider>
  );
};

const Trigger = ({
  placeholder,
  "aria-label": ariaLabel,
  ...props
}: SelectTriggerProps) => {
  const { disabled, required, invalid, clearable, onValueChange } =
    useSelectContext();
  const api = useArkSelectContext();

  const selectedValue = api.value?.[0];
  const hasValue = !!selectedValue;

  const handleClear = useCallback(() => {
    if (!disabled) {
      api.setValue([]);
      onValueChange?.(undefined);
    }
  }, [disabled, api, onValueChange]);

  const showClearButton = clearable && hasValue && !disabled;
  const triggerAriaLabel =
    ariaLabel || (typeof placeholder === "string" ? placeholder : undefined);

  return (
    <ArkSelect.Control
      className={css({
        position: "relative",
        width: "100%",
      })}
    >
      <ArkSelect.Trigger
        disabled={disabled}
        aria-required={required}
        aria-label={triggerAriaLabel}
        className={triggerStyles({ invalid })}
        {...props}
      >
        <OverflowText>
          <ArkSelect.ValueText
            className={css({
              textStyle: "label.md",
              color: hasValue ? "fg.neutral" : "fg.neutral.placeholder",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            })}
            placeholder={placeholder}
          />
        </OverflowText>
        <ArkSelect.Indicator
          className={css({
            transform: api.open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
            color: "fg.neutral",
          })}
        >
          <Icon name="chevronDown" size="lg" tone="neutral" />
        </ArkSelect.Indicator>
      </ArkSelect.Trigger>
      {showClearButton && (
        <ArkSelect.ClearTrigger
          aria-label="clear"
          onClick={handleClear}
          className={clearButtonStyles()}
        >
          <Icon name="circleX" size="sm" tone="neutral" solid />
        </ArkSelect.ClearTrigger>
      )}
    </ArkSelect.Control>
  );
};

const Content = ({ children }: SelectContentProps) => {
  const { open } = useArkSelectContext();

  return (
    <Portal>
      <ArkSelect.Positioner>
        <ArkSelect.Content className={contentStyles({ open })}>
          {children}
        </ArkSelect.Content>
      </ArkSelect.Positioner>
    </Portal>
  );
};

const Item = ({ value, disabled, children }: SelectItemProps) => {
  const { registerItem, unregisterItem } = useSelectContext();
  const api = useArkSelectContext();

  const label = useMemo(
    () => (typeof children === "string" ? children : value),
    [children, value],
  );

  useEffect(() => {
    registerItem(value, children);
    return () => {
      unregisterItem(value);
    };
  }, [value, children, registerItem, unregisterItem]);

  const isSelected = useMemo(
    () => api.value?.includes(value) ?? false,
    [api.value, value],
  );
  const isHighlighted = useMemo(
    () => api.highlightedValue === value,
    [api.highlightedValue, value],
  );

  if (!api.open) {
    return null;
  }

  return (
    <ArkSelect.Item
      item={{
        value,
        label,
        disabled,
      }}
      className={itemStyles({
        disabled: !!disabled,
        isFocused: isHighlighted,
        isSelected,
      })}
    >
      <OverflowText>
        <span>{children}</span>
      </OverflowText>
      {isSelected && <Icon name="check" size="lg" tone="brand" />}
    </ArkSelect.Item>
  );
};

const OverflowText = ({ children }: OverflowTextProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isEllipsis, setIsEllipsis] = useState(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const checkEllipsis = () => {
      setIsEllipsis(el.scrollWidth > el.clientWidth);
    };

    requestAnimationFrame(checkEllipsis);
  }, [children]);

  return (
    <Tooltip.Root
      positioning={{
        placement: "top",
      }}
    >
      <Tooltip.Trigger asChild>
        <span
          ref={spanRef}
          className={css({
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
            width: "100%",
            textAlign: "left",
          })}
        >
          {children}
        </span>
      </Tooltip.Trigger>
      {isEllipsis && (
        <Tooltip.Positioner>
          <Tooltip.Content
            className={css({
              padding: "4",
              borderRadius: "sm",
              boxShadow: "lg",
              bg: "bg.neutral",
              color: "fg.neutral",
              fontStyle: "label.md",
            })}
          >
            {children}
          </Tooltip.Content>
        </Tooltip.Positioner>
      )}
    </Tooltip.Root>
  );
};

const triggerStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "32",
    padding: "12",
    width: "100%",
    height: "12",
    fontSize: "md",
    borderWidth: "md",
    borderRadius: "sm",
    color: "fg.neutral",
    fontFamily: "inherit",
    cursor: "pointer",
    backgroundColor: "appBg",
    "&:disabled": {
      color: "fg.neutral.disabled",
      cursor: "not-allowed",
      backgroundColor: "bg.neutral.disabled",
      borderColor: "border.neutral.disabled",
    },
    "&:focus-within": {
      outlineStyle: "solid",
      outlineWidth: "lg",
      outlineOffset: "2px",
      borderRadius: "md",
      outlineColor: "border.brand.focus",
    },
  },
  variants: {
    invalid: {
      true: {
        border: "danger",
      },
      false: {
        border: "neutral",
        "&:hover": {
          borderColor: "border.neutral.hover",
        },
        "&:active": {
          borderColor: "border.brand.active",
        },
      },
    },
  },
  defaultVariants: {
    invalid: false,
  },
});

const clearButtonStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    cursor: "pointer",
    outline: "none",
    border: "none",
    backgroundColor: "fg.neutral",
    position: "absolute",
    right: "40",
    top: "50%",
    transform: "translateY(-50%)",
  },
});

const contentStyles = cva({
  base: {
    maxHeight: "240",
    overflowY: "auto",
    border: "neutral",
    borderWidth: "md",
    borderRadius: "sm",
    backgroundColor: "appBg",
    boxShadow: "lg",
    padding: "4",
  },
  variants: {
    open: {
      true: {},
      false: {
        visibility: "hidden",
        opacity: 0,
        zIndex: -1,
      },
    },
  },
});

const itemStyles = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingX: "12",
    paddingY: "8",
    textAlign: "left",
    border: "none",
    color: "fg.neutral",
    fontFamily: "inherit",
    fontSize: "md",
    cursor: "pointer",
    borderRadius: "sm",
    transition: "all 0.2s",
    "&:disabled": {
      color: "fg.neutral.disabled",
      cursor: "not-allowed",
    },
    "&:active": {
      borderColor: "border.neutral.active",
    },
  },
  variants: {
    disabled: {
      true: {
        color: "fg.neutral.disabled",
        backgroundColor: "bg.neutral.disabled",
        cursor: "not-allowed",
      },
      false: {},
    },
    isFocused: {
      true: {},
      false: {},
    },
    isSelected: {
      true: {
        backgroundColor: "bg.brand",
        "&:hover": {
          backgroundColor: "bg.brand.hover",
          color: "fg.brand",
        },
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      isFocused: true,
      isSelected: true,
      disabled: false,
      css: {
        backgroundColor: "bg.brand",
        "&:hover": {
          backgroundColor: "bg.brand.hover",
          color: "fg.brand",
        },
      },
    },
    {
      isFocused: true,
      isSelected: false,
      disabled: false,
      css: {
        backgroundColor: "bg.neutral.hover",
        color: "fg.neutral.hover",
      },
    },
  ],
});

export const Select = {
  Root,
  Trigger,
  Content,
  Item,
};
