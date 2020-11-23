import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class BurgerBuilder extends Component{
    INGREDIENT_PRICES = {
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon: 0.7
    }

    state = {
          ingredients: null,
          totalPrice: 4,
          purchaseable: false,
          orderNowClicked: false,
          loading: false,
          error: false
    }

    componentDidMount = () => {
        axios.get('https://react-my-burger-e315a.firebaseio.com/ingredients.json')
            .then(response => {
                console.log('response=>  ',response)
                this.setState({ingredients: response.data})
                console.log("ingredients after set=>  ", this.state.ingredients)
            })
         .catch(error => {
             this.setState({error:true})
         })   
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
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        let burger = this.state.error? <p>Ingredients cannot be loaded</p>:<Spinner /> 
        if(this.state.ingredients){
            console.log('hello')
            burger = (
                <Aux>
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
                orderSummary = (<OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelled}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />)
            }

        return(
            <Aux>
                <Modal show={this.state.orderNowClicked} modalClosed={this.purchaseCancelled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)