import React from 'react';
import { useSelector } from 'react-redux';
import fromPairs from 'ramda/src/fromPairs';
import { getHues } from '../state/selectors';

export default function CustomProperties({children}) {
    const hues = useSelector(getHues);

    const properties = fromPairs(hues.map(
        (value, index) => [`--hue${index}`, value]
    ));

    return <div style={properties}>
        {children}
    </div>;
}
