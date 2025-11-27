import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { ANIMATION_TIME } from "./const";

import animationStyles from "./Animation.module.css";
import styles from "./styles.module.css";
import Image from "next/image";

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

export const Layout = ({
  clossable,
  onClose,
  children,
  opened,
  width = 300,
  contentClassName = "",
}) => {
  const overlayRef = useRef();
  const contentRef = useRef();

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);
  // console.log("contentClassName", contentClassName);

  return (
    <div id="modal" className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        {clossable ? (
          <div ref={overlayRef} className={styles.overlay} />
        ) : (
          <div ref={overlayRef} className={styles.overlay} onClick={onClose} />
        )}
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <div
          ref={contentRef}
          className={`relative ${contentClassName} ${styles.content}`}
          style={{ maxWidth: width }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}

          <button
            onClick={onClose}
            className="w-6 h-6 absolute top-5 right-6 cursor-pointer"
            aria-label="Close modal"
          >
            <Image
              id="partnerShipClose"
              src={"/assets/close-circle.png"}
              alt="close"
              aria-hidden="true"
              width={30}
              height={30}
            />
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};
