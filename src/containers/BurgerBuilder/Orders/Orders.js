import axios from '../../../axios-orders'
import React, {Component} from 'react'
import Order from '../../../components/Order/CheckoutSummary/Order'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount() {
        console.log('orders mount')
        axios.get('/orders.json')
            .then(res => {
                console.log('res.data=>  ',res.data)
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }

                console.log('fetchedOrdrs=> ',fetchedOrders)
                this.setState({orders: fetchedOrders})
                this.setState({loading: false})
            })
            .catch(err => {
                console.log('err=> ',err)
                this.setState({loading: false})
            })
    }

    render() {
        console.log('orders rendered')
        console.log('this.state.orders=> ', this.state.orders)
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredents}
                        price={+order.price}    
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)