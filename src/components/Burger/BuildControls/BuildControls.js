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
      { controls.map((control, i) => {
            return <BuildControl label={control.label} key={control.label} />
      })}
    </div>
)

export default buildControls