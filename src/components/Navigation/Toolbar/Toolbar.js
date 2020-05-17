import React from 'react'
import styles from './Toolbar.css'
import Logo from '../../Logo/Logo'

const Toolbar = props => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            ...
        </nav>
    </header>
) 

export default Toolbar