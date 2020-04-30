import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import React from 'react'
import styles from './Burger.css'

const Burger = props => { 
   
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            <BurgerIngredient type="meat"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}


export default Burger