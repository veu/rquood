import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { goBack } from 'connected-react-router';
import { TITLE_URL } from "../config";
import { useBackKey, useClick, useKaiOsSoftwareKeys } from '../hooks';
import BackLink from './BackLink';

function SideLink({ link, innerRef }) {
    if (!link) {
        return null;
    }

    const { text, url, back, onClick = () => {} } = link;

    if (back) {
        return (
            <BackLink
                to={url}
                innerRef={innerRef}
                onClick={onClick}
            >{text}</BackLink>
        );
    }

    return (
        <Link
            to={url}
            innerRef={innerRef}
            onClick={onClick}
        >{text}</Link>
    );
}

function BottomMenu({ center, goBack, left, right }) {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();
    useClick(center.onClick || (() => {}));
    const history = useHistory();
    useBackKey((event) => {
        if (history.location.pathname !== TITLE_URL) {
            goBack()
            event.preventDefault();
        }
    });

    return (
    <div className="bottom-menu">
        <div className="bottom-menu__action">
            <SideLink link={left} innerRef={refLeft} />
        </div>
        <div className="bottom-menu__action">
            {center.text}
        </div>
        <div className="bottom-menu__action">
            <SideLink link={right} innerRef={refRight} />
        </div>
    </div>);
}

export default connect(null, { goBack })(BottomMenu);
