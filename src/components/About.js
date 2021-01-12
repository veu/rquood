import React from 'react';
import { TITLE_URL } from '../config';
import { useClick, useKaiOsSoftwareKeys } from '../hooks';
import BackLink from './BackLink';

function About() {
    const {refLeft} = useKaiOsSoftwareKeys();
    useClick(() => {
        window.open("https://monometric.net", '_blank');
    });

    return (<>
        <div block="title">
            About
        </div>

        <div block="menu">
            <div block="message">
                Quood Version 1.1.0<br />
                By Rebecca König
            </div>
            <button
                block="action"
                mods={{active: true}}
            >
                https://monometric.net
            </button>
        </div>


        <div block="main-menu">
            <div block="main-menu" elem="action">
                <BackLink to={TITLE_URL} innerRef={refLeft} />
            </div>
            <div block="main-menu" elem="action">
                SELECT
            </div>
            <div block="main-menu" elem="action">
            </div>
        </div>
    </>);
}

export default About;