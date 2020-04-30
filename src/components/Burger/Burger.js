import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"
import React from 'react'
import styles from './Burger.css'

const Burger = props => { 
    const transformedIngredients = Object.keys(props.ingredients)
        .map((igKey) =>{
                return [...Array(props.ingredients[igKey])].map((_, i) => {
                    return <BurgerIngredient type={igKey} key={igKey+i}/>
                })
            })
        
  
        return <div className={styles.Burger}>
                <BurgerIngredient type='bread-top' />
                  {transformedIngredients}
                <BurgerIngredient type='bread-bottom' />
            </div>
    
}


export default Burger