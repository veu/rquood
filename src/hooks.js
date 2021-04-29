import { useEffect, useRef } from "react";
import { KEY_SOFT_LEFT, KEY_SOFT_RIGHT } from "./config";

export function useBackKey(onBack) {
    useEffect(() => {
        const handler = (event) => {
            if (event.key === 'Backspace') {
                onBack(event);
            }
        };

        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);
}

export function useKaiOsSoftwareKeys() {
    const refLeft = useRef();
    const refRight = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                refLeft.current.click();
            } else if (event.key === KEY_SOFT_RIGHT) {
                refRight.current.click();
            }
        };
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    });

    return { refLeft, refRight };
}

export function useDPad(onMove) {
    useEffect(() => {
        const handler = (event) => {
            if (event.key === 'ArrowLeft') {
                onMove(-1, 0);
            } else if (event.key === 'ArrowRight') {
                onMove(1, 0);
            } else if (event.key === 'ArrowUp') {
                onMove(0, -1);
            } else if (event.key === 'ArrowDown') {
                onMove(0, 1);
            }
        };
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    });
}

export function useClick(onClick) {
    useEffect(() => {
        const handler = (event) => {
            if (event.key === 'Enter') {
                onClick();
            }
        };
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    });
}
