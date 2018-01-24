import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0,
            },
            totalPrice: 0,
            purchaseable: false,
        };
        
        this.addIngredientsHandler = this.addIngredientsHandler.bind(this);
        this.removeIngredientsHandler = this.removeIngredientsHandler.bind(this);
        this.updatePurchaseState = this.updatePurchaseState.bind(this);
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => sum + el, 0);

        this.setState({purchaseable: sum > 0});    
    }

    addIngredientsHandler (type) {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updateCount,
        };
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientsHandler (type) {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        } 

        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updateCount,
        };
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });

        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disableInfo = {
            ...this.state.ingredients,
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler} 
                    disabled={disableInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
