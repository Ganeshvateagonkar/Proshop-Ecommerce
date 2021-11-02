import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/Loader';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';


const RegisterScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/';


    useEffect(() => {
        if (userInfo) {

            history.push(redirect);
        }

    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register


        if (password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else {
            dispatch(register(name, email, password))
        }



    }
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId='password'>
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <FormGroup controlId='confirmPassword'>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></FormControl>
                </FormGroup>

                <Button type='submit' variant='primary' className="my-2">
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )

}

export default RegisterScreen;