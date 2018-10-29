import {useRef} from 'react';

// Return a random integer in [min,max[ from a bucket with size * (max - min) elements
export function useRandomBucket(min, max, size=2) {
    const bucket = useRef([]);

    function getSingle() {
        if (bucket.current.length === 0) {
            bucket.current = [...Array((max - min) * size)].map((value, index) => {
                return index % (max - min) + min;
            });
        }

        const index = Math.random() * bucket.current.length | 0;

        return bucket.current.splice(index, 1)[0];
    }

    function getMultiple(count) {
        return [...Array(count)].map(() => getSingle());
    }

    return [getSingle, getMultiple];
}
