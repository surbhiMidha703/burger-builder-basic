import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
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
          purchaseable: false
    }

    updatePurchaseState = (ingredents) => {
        console.log('ingredients=>  ', ingredents)
        console.log('Object.keys(ingredents):   ', Object.keys(ingredents))
        const sum = Object.keys(ingredents).map(igKey => {
            console.log('igKey: ', igKey)
            console.log('ingredents[igKey]:  ', ingredents[igKey])
            return ingredents[igKey]
        })
        console.log(' AFTER Object.keys(ingredents):   ', Object.keys(ingredents))
        console.log('sum: => ', sum)
        console.log('REDUCER=>   ')
        const newSum = sum.reduce((sum, el) => {
            console.log('sum=> ', sum)
            console.log('el=>  ', el)
            console.log('sum +  el => ', (sum + el))
            return sum + el
        }, 0)

        console.log('newSum =>  ', newSum)

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
        console.log('this.state.ingredients in add function =>  ', this.state.ingredients)
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
    
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledLessButton={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                     />
            </Aux>
        )
    }
}

export default BurgerBuilder