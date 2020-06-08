import React, { Component } from 'react'
import styles from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
  //  console.log('props in Modal=>  ',props)
  // we did not use PureComponent, because that would check all the props apart from
  // the 'show' prop before rendering this component
  // we could also just use React.memo if we wanted the component to remain a 
  //funcional component.
  componentDidUpdate = () => {
    console.log('order summary will update in modal')
}

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextProps.show !== this.props.show:  ',nextProps.show !== this.props.show)
       return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
  render() {
      console.log("props in modal:  ", this.props)
    return(
    <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
            className={styles.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
        </div>
    </Aux>
    )
        }
}

export default Modal