"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { RequestDialogHandle, RequestOpenOptions } from "./request-dialog";

// Loaded on first use, so the form never weighs on the initial page load.
const RequestDialog = dynamic(() => import("./request-dialog").then((m) => m.RequestDialog), { ssr: false });

const RequestContext = createContext<((options?: RequestOpenOptions) => void) | null>(null);

export function RequestProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<RequestDialogHandle>(null);
  const [mounted, setMounted] = useState(false);
  const pending = useRef<RequestOpenOptions | undefined>(undefined);

  const open = useCallback((options?: RequestOpenOptions) => {
    if (dialog.current) {
      dialog.current.open(options);
    } else {
      pending.current = options;
      setMounted(true);
    }
  }, []);

  const onReady = useCallback((handle: RequestDialogHandle) => {
    dialog.current = handle;
    handle.open(pending.current);
    pending.current = undefined;
  }, []);

  const value = useMemo(() => open, [open]);

  return (
    <RequestContext.Provider value={value}>
      {children}
      {mounted ? <RequestDialog onReady={onReady} /> : null}
    </RequestContext.Provider>
  );
}

export function useRequest() {
  const open = useContext(RequestContext);
  if (!open) throw new Error("useRequest must be used inside <RequestProvider>");
  return open;
}
