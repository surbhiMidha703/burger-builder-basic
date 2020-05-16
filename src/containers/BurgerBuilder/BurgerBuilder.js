import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
          totalPrice: 4
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
    }

    

    
    render(){
        // console.log(this.state.ingredients)
        // console.log("as array:  ")
        // console.log(Object.keys(this.state.ingredients))
        return(
            <Aux>
                 <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}  
                     />
            </Aux>
        )
    }
}

export default BurgerBuilder