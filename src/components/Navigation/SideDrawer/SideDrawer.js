import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import styles from './SideDrawer.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'
const SideDrawer = props => {
    console.log('props in sidedrawer=>  ',props)
    let attachClasses = [styles.SideDrawer, styles.Close]
    
    if (props.opened) {
        attachClasses = [styles.SideDrawer, styles.Open]
    }

    return (     
    <Aux>
         <Backdrop show={props.opened} clicked={props.closed}/>
            <div className={attachClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
    </Aux>
    )
}

export default SideDrawer