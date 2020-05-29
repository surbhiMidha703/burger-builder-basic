import React from 'react'
import styles from './Backdrop.css'

const Backdrop = props => {

    console.log('props in Backdrop=>  ', props)
    return(
    props.show ? 
        <div 
            className={styles.Backdrop}
            onClick={props.clicked}
            >
        </div> : null
)
    }
export default Backdrop