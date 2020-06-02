import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState((prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerClosedHandler} />
                <SideDrawer opened={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content} >
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default layout