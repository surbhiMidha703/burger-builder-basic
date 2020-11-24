import React from 'react'
import styles from './Order.css'
const Order = ({price, ingredients}) => {
    console.log('ingre=>  ',Object.keys(ingredients))
    const ingredientsArr = []

    for(let ingreName in ingredients) {
        ingredientsArr.push(
            {
                name: ingreName,
                amount: ingredients[ingreName]
            })
        }

    console.log('ingredientArr=> ',ingredientsArr)

    const ingredientOutput = ingredientsArr.map(ig => (
        <span 
            style={{
                textTransform: 'capitalize',
                display: "inline-block",
                border: '1px solid #ccc',
                margin: '0 8px',
                padding: '5px'}}
            key={ig.name}>{ig.name} ({ig.amount})</span>
    ))

    return (<div className={styles.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>USD {price}</strong></p>
    </div>)
    }

export default Order