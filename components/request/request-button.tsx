"use client";

import type { ComponentProps } from "react";
import { useRequest } from "./request-context";

type Props = Omit<ComponentProps<"button">, "onClick" | "type"> & {
  service?: string;
  city?: string;
};

export function RequestButton({ service, city, children, ...props }: Props) {
  const openRequest = useRequest();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => openRequest({ service, city, trigger: event.currentTarget })}
      {...props}
    >
      {children}
    </button>
  );
}
