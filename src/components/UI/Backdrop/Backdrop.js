import React from 'react'
import styles from './Backdrop.css'

const Backdrop = props => (
    props.show ? 
        <div 
            className={styles.Backdrop}
            onClick={props.modalClosed}
            >
        </div> : null
)

export default Backdrop