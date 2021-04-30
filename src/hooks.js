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
    }, [onBack]);
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

const dPadDirections = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
};

const numPadDirections = {
    1: [-1, -1],
    2: [0, -1],
    3: [1, -1],
    4: [-1, 0],
    6: [1, 0],
    7: [-1, 1],
    8: [0, 1],
    9: [1, 1],
};

export function useDPad(onMove, { withNumPad = false } = {}) {
    useEffect(() => {
        const handler = (event) => {
            if (dPadDirections[event.key]) {
                onMove(...dPadDirections[event.key]);
                return;
            }

            if (withNumPad && numPadDirections[event.key]) {
                onMove(...numPadDirections[event.key]);
            }
        };

        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    });
}

export function useClick(onClick, { withNumPad = false } = {}) {
    useEffect(() => {
        const handler = (event) => {
            if (event.key === 'Enter' || (withNumPad && event.key === '5')) {
                onClick();
            }
        };
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    });
}
