import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Col, FormGroup, FormCheck } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';


import Checkoutsteps from '../components/CheckoutSteps.js';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {

    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/shipping')
    }
    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('paypal');


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <Checkoutsteps step1 step2 step3 />
            <h1>Payment Mathod</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>
                    <Col>
                        <FormCheck
                            type="radio"
                            label="Paypal or credit Card"
                            id="paypal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></FormCheck>
                        <FormCheck
                            type="radio"
                            label="Phone pay"
                            id="phonePay"
                            name="paymentMethod"
                            value="PhonePay"

                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></FormCheck>
                    </Col>
                </FormGroup>
                <Button type="submit" variant="primary" className="my-3"  >Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;