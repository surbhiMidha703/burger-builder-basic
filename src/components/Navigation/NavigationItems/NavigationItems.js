import React from 'react'
import styles from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = () => (
    <ul className={styles.NavigationItems}>
       <NavigationItem link='/' active>Burger Builder</NavigationItem>
       <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
)

export default NavigationItems