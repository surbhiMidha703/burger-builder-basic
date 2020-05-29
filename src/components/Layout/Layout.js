import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import styles from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        console.log('hello')
        this.setState({showSideDrawer: false})
    }

    render(){
        console.log('props in layout=>  ',this.props)
        return(
            <Aux>
                <Toolbar />
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