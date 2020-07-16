import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { updateObejct ,checkValidity} from '../../shared/utility';

class ContactData extends Component{
    state = {
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                deliveryMethod: {
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true
                }
        },
        formIsValid: false
    }

    orderHandler=(event)=>{ //接受点击事件
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        };

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData,
            userId:this.props.userId        //传入userid
        }

        this.props.onOrderBurger(order,this.props.token);  //调用action

        event.preventDefault();  //阻止页面刷新
    }

    inputChangedHandler = (event, inputIdentifier)=>{       //改变state

        const updatedFormElement=updateObejct(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:true
        });
        const updatedOrderForm = updateObejct(this.state.orderForm,{
            [inputIdentifier]:updatedFormElement
        });

        let formIsValid= true;  //遍历每个valid，看是否全都为true
        for(let inputIdentifiers in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
        };

        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
        event.preventDefault();
    }

    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){     //遍历每个name
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(                
                <form onSubmit={this.orderHandler}>
                    
                    {formElementArray.map(formElement=>(
                       <Input  
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation&& formElement.config.touched}
                        /> 
                    ))}
                    <Button 
                        btnType="Success"
                        disabled={!this.state.formIsValid}
                        >ORDER</Button>
                </form>);
        if(this.props.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
};


const mapStateToProps = state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};

const mapDispatchToProps = dispatch=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));