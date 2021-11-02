
import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, FormControl, FormGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

import { saveshippingAddress } from '../actions/cartActions';
import Checkoutsteps from '../components/CheckoutSteps.js';

const ShippingScreen = ({ history }) => {

    const cart = useSelector((state) => state.cart);

    const { shippingAddress } = cart;
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveshippingAddress({ address, city, country, postalCode }))
        history.push('/payment');
    }

    return (
        <FormContainer>
            <Checkoutsteps step1 step2 />
            <h1>shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <FormControl
                        type='text'
                        placeholder='enter full address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId='city'>
                    <Form.Label>City</Form.Label>
                    <FormControl
                        type='text'
                        placeholder='enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId='postalCode'>
                    <Form.Label>PostalCode</Form.Label>
                    <FormControl
                        type='text'
                        placeholder='enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <FormControl
                        type='text'
                        placeholder='enter country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button type="submit" variant="primary" className="my-3"  >Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;