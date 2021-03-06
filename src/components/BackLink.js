import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { goBack } from 'connected-react-router';
import { IS_KAY_OS } from '../config';

function BackLink({
    children,
    goBack,
    onClick = () => {},
    ...props
}) {
    const goBackKaiOs = (event) => {
        onClick();

        if (IS_KAY_OS) {
            goBack();
            event.preventDefault();
        }
    };

    return <Link {...props} onClick={goBackKaiOs}>
        {children || 'Back'}
    </Link>
}

export default connect(null, { goBack })(BackLink);
