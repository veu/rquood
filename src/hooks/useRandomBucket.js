import {useRef} from 'react';

// Return a random integer in [min,max[ from a bucket with size * (max - min) elements
export function useRandomBucket(min, max, size=2) {
    const bucket = useRef([]);

    function getSingle() {
        if (bucket.current.length === 0) {
            for (let iteration = 0; iteration < size; iteration++) {
                for (let value = min; value < max; value++) {
                    bucket.current.push(value);
                }
            }
        }

        const index = Math.random() * bucket.current.length | 0;

        return bucket.current.splice(index, 1)[0];
    }

    function getMultiple(count) {
        const values = [];

        for(let i = 0; i < count; i++) {
            values.push(getSingle());
        }

        return values;
    }

    return [getSingle, getMultiple];
}
