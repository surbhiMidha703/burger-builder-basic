import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.css'

const controls = [
       { label: 'Salad', type: 'salad'},
       { label: 'Bacon', type: 'bacon'},
       { label: 'Cheese', type: 'cheese'},
       { label: 'Meat', type: 'meat'},
]

const buildControls = props =>(
  <div className={styles.BuildControls}>
      <div>Current Price: <strong>{props.price.toFixed(2)}</strong></div>
      { controls.map((control, i) => {
            return <BuildControl 
                label={control.label}
                key={control.label}
                added={() => props.ingredientAdded(control.type)} 
                removed={() => props.ingredientRemoved(control.type)}
                disabledLessButton={props.disabledLessButton[control.type]}
                />
      })}
      <button className={styles.OrderButton} disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
)

export default buildControls