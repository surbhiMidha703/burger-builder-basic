import React, {Component } from 'react'
import CheckoutSummary from '../../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { Route } from 'react-router-dom'
class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0,
    }

    componentWillMount() {
       
        const query  = new URLSearchParams(this.props.location.search)
        const ingredients = {}

        let price = 0
        
        console.log('checkout props=>  ',this.props)
        console.log('checkout query.entries()=> ',query.entries())
        for (let param of query.entries()) {
            // each entry will have this format - [salad, 1] (key,value)
            console.log('checkout param=> ',param)
            if(param[0] === 'price'){
                price = param[1]        
            } else{
            ingredients[param[0]] =+ param[1]
            }
        }
        this.setState({ingredients: ingredients})
        this.setState({price: price})
        console.log('states after setting in checkout price=> ',this.state.price)
        console.log('states after setting in checkout ingredients=> ',this.state.ingredients)
    }
    checkoutCancelled = () => {
        this.props.history.goBack()
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}/>
                
            <Route path={this.props.match.path + '/contact-data'}
            render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.price}
               { ...props}/>)}/>
            </div>
        )
    }
}

export default Checkout