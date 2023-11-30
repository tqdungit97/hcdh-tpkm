import { useCallback, useState } from "react";

export function useToggle() {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return {
    isOpen,
    toggle,
  };
}
