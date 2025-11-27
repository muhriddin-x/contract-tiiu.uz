import { useEffect, useState } from "react";

export const useMount = ({ opened, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    }
  }, [opened]);

  return {
    mounted,
    setMounted,
  };
};
