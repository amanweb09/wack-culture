import React from 'react';
import Styles from './shared.module.css'
import { changeTheme } from '../../utils/changeTheme'

const ThemeToggle = () => {
    function setTheme(e) {

        if (e.target.checked) {
            changeTheme('dark')
            return;
        }
        else {
            changeTheme('light')
            return;
        }
    }

    const theme = window.localStorage.getItem('theme');
    return (
        <div className={`${Styles.toggle_switch_container} w-max h-max flex-center`}>
            <img
                className='w-6 mr-2'
                src="/images/sun.png"
                alt="light" />

            <label className={Styles.theme__switch}>
                <input
                    defaultChecked={theme === 'dark' ? true : false}
                    onChange={setTheme}
                    type="checkbox"
                    className={Styles.theme__checkbox} />
                <span className={`${Styles.theme__slider} ${Styles.theme__round}`}></span>
            </label>

            <img
                className='w-6 ml-2'
                src="/images/moon.png"
                alt="light" />
        </div>
    );
};

export default ThemeToggle;
