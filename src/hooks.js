import { useEffect, useRef } from "react";
import { KEY_SOFT_LEFT, KEY_SOFT_RIGHT } from "./config";

export function useKaiOsSoftwareKeys() {
    const refLeft = useRef();
    const refRight = useRef();

    useEffect(() => {
        window.onkeydown = (event) => {
            if (event.key === KEY_SOFT_LEFT) {
                refLeft.current.click();
            }
            if (event.key === KEY_SOFT_RIGHT) {
                refRight.current.click();
            }
        };

        return () => {
            window.onkeydown = null;
        };
    });

    return { refLeft, refRight };
}
