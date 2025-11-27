import { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { Portal } from "../Portal";
import { Layout } from "./Layout";

import { useMount } from "./useMount";
import { ANIMATION_TIME } from "./Layout/const";

export const Modal = forwardRef(
  ({ opened, onClose, width, contentClassName, children, clossable }, ref) => {
    const { mounted, setMounted } = useMount({ opened, onClose });

    useEffect(() => {
      if (mounted) {
        document.querySelector("body").style = "overflow: hidden";
      } else {
        document.querySelector("body").style = "overflow: auto";
      }
    }, [mounted]);

    const closeModal = useCallback(() => {
      setMounted(false);

      setTimeout(() => {
        onClose?.();
      }, ANIMATION_TIME);
    }, [setMounted, onClose, ANIMATION_TIME]);

    useImperativeHandle(
      ref,
      () => {
        return {
          close: () => {
            closeModal();
          },
        };
      },
      [setMounted]
    );

    const handleModalClose = () => {
      closeModal();
    };

    if (!opened) {
      return null;
    }

    return (
      <Portal>
        <Layout
          clossable={clossable}
          onClose={handleModalClose}
          opened={mounted}
          width={width}
          contentClassName={contentClassName}
        >
          {children}
        </Layout>
      </Portal>
    );
  }
);
