import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import styles from './Logo.css'

const Logo = props => (
    <div className={styles.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default Logo