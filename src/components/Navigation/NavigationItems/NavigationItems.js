import React from 'react'
import styles from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavigationItems = () => (
    <ul className={styles.NavigationItems}>
       <NavigationItem link='/' exact>Burger Builder</NavigationItem>

       <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
)

export default NavigationItems