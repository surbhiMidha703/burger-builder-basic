import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
class BurgerBuilder extends Component{
    INGREDIENT_PRICES = {
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon: 0.7
    }

    state = {
          ingredients:{
              salad: 0,
              bacon: 0,
              cheese: 0,
              meat: 0
          },
          totalPrice: 4,
          purchaseable: false,
          orderNowClicked: false,
          loading: false,
    }

    updatePurchaseState = (ingredents) => {
        const sum = Object.keys(ingredents).map(igKey => {
            return ingredents[igKey]
        })
        const newSum = sum.reduce((sum, el) => {
            return sum + el
        }, 0)

        this.setState({purchaseable: newSum > 0})
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
                ...this.state.ingredients
            }

        updatedIngredients[type] = updatedCount
        
        const priceAddition = this.INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice + priceAddition

        this.setState({
             totalPrice: newPrice,
             ingredients: updatedIngredients
            })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
     
        if(oldCount <= 0){
            return
        }
        const updatedCount =  oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        
        updatedIngredients[type] = updatedCount

        const priceReduction = this.INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice - priceReduction

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
         
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({orderNowClicked: true})
    }

    purchaseCancelled = () => {
        this.setState({orderNowClicked: false})
    }
    
    purchaseContinueHandler = () => {
        //alert('Please continue!')
        this.setState({loading: true})
        const order = {
            ingredents: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Surbhi Midha',
                address: {
                    street: 'cobblebank',
                    postCode: '3338',
                    country: 'Australia'
                    },
                email: 'surbhi.midha01@gmail.com',
                },
            deliveryMethod: 'fastest',
            }
        
        axios.post('/orders.json', order)
            .then(response => {
                console.log('response=> ',response)
                this.setState({loading: false, orderNowClicked: false})
            })
            .catch(error => {
                console.log("error=>  ",error)
                this.setState({loading: false, orderNowClicked: false})
            })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = 
        (<OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelled}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />)
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        console.log("loading in render method=> ", this.state.loading)
        console.log('orderNowClicked in render method=> ',this.state.orderNowClicked)
        return(
            <Aux>
                <Modal show={this.state.orderNowClicked} modalClosed={this.purchaseCancelled}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledLessButton={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    orderNowClicked={this.purchaseHandler}
                     />
            </Aux>
        )
    }
}

export default BurgerBuilder