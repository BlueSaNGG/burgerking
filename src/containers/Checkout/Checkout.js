import React , {Component} from 'react';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import {Route , Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component{
    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace(this.props.match.url+'/contact-data');
    }


    render(){
        let summary = <Redirect to='/'/>   //若进入checkout时还无ing，重定向到/
        if(this.props.ings){            //确定由ings再传入
            const purchasedRedirect = this.props.purchased?<Redirect to='/'/>:null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary  
                    ingredients={this.props.ings}          //遍历null会报错
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                    />
                </div>
                    );
        };
        return summary;
    }
};

const mapStateToProps =state=>{         //传入时ings还未获取
    return{
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);