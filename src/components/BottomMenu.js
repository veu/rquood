import React from 'react';
import { Link } from 'react-router-dom';
import { useClick, useKaiOsSoftwareKeys } from '../hooks';
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

function BottomMenu({ center, left, right }) {
    const { refLeft, refRight } = useKaiOsSoftwareKeys();
    useClick(center.onClick || (() => {}));

    return (
    <div block="main-menu">
        <div block="main-menu" elem="action">
            <SideLink link={left} innerRef={refLeft} />
        </div>
        <div block="main-menu" elem="action">
            {center.text}
        </div>
        <div block="main-menu" elem="action">
            <SideLink link={right} innerRef={refRight} />
        </div>
    </div>);
}

export default BottomMenu;