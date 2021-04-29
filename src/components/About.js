import React from 'react';
import { TITLE_URL } from '../config';
import BottomMenu from './BottomMenu';

function About() {
    return (<>
        <header>
            <h1>
                About
            </h1>
        </header>
        <main>
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
        </main>
        <footer>
            <BottomMenu
                left={{text: 'Back', url: TITLE_URL, back: true }}
                center={{
                    text: 'SELECT',
                    onClick: () => {
                        window.open("https://monometric.net", '_blank');
                    }
                }}
            />
        </footer>
    </>);
}

export default About;