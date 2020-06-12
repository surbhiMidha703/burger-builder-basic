import React, { Component } from 'react'
import Aux from '../Aux/Aux'
import Modal from '../../components/UI/Modal/Modal'
//import axios from '../../axios-orders'


const withErrorHandler = (WrappedComponent, axios) => {
   return class extends Component{
        state = {
            error: null,
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null})
                return request
            })
            this.respInterceptor = axios.interceptors.response.use(res =>  res, error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount(){
            console.log('will unmount', this.respInterceptor, this.reqInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.respInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )     
        }
    }
}

export default withErrorHandler