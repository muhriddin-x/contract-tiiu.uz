import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const Portal = ({ children, onContainerAdded }) => {
  const [container, setContainer] = useState(() => null);

  useEffect(() => {
    const container = document.createElement("div");
    setContainer(container);

    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  useEffect(() => {
    if (container && onContainerAdded) {
      onContainerAdded();
    }
  }, [container]);

  return container ? ReactDOM.createPortal(children, container) : null;
};

// const ref = useRef<Element | null>(null)
// const [mounted, setMounted] = useState(false)

// useEffect(() => {
//   ref.current = document.querySelector<HTMLElement>("#portal")
//   setMounted(true)
// }, [])

// return (mounted && ref.current) ? createPortal(<div className={styles.overlay}>{props.children}</div>, ref.current) : null
