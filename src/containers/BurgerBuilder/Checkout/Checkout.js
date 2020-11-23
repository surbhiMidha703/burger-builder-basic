import React, {Component } from 'react'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 1,
            meat: 1,
            bacon: 1,
        }
    }

    componentDidMount() {
       
        const query  = new URLSearchParams(this.props.location.search)
        const ingredients = {}

        for (let param of query.entries()) {
            // each entry will have this format - [salad, 1] (key,value)
            ingredients[param[0]] =+ param[1]
        }
        this.setState({ingredients: ingredients})

    }
    checkoutCancelled = () => {
        this.props.history.goBack()
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        console.log('this.props in checkout=> ',this.props)
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}/>
            <Route path={this.props.match.path + '/contact-data'}
            component={ContactData}/>
            </div>
        )
    }
}

export default Checkout