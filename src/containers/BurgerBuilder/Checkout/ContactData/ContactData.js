import React, {Component} from 'react'
import Button from '../../../../components/UI/Button/Button'
import styles from './ContactData.css'
import axios from '../../../../axios-orders'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import Input from '../../../../components/UI/Input/Input'
class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault()
        console.log("orderHandler this.props=> ",this.props)

        //code to send the order to the database
         this.setState({loading: true})
        const order = {
            ingredents: this.props.ingredients,
            price: this.props.totalPrice,
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
        
            console.log('orderhandler order=> ',order)
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render(){
        let form = (<form>
            <Input inputtype='input' type='text' name='name' placeholder='Your name'/>

            <Input inputtype='input' type='text' name='email' placeholder='Your email'/>
            <Input inputtype='input' type='text' name='street' placeholder='Street'/>
            <Input inputtype='input' type='text' name='postal' placeholder='Postal address'/>
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>)

        if (this.state.loading) {
            form =<Spinner/>
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData