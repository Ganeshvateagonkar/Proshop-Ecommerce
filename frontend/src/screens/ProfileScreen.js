import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button, Table, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';




const ProfileScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;



    useEffect(() => {
        if (!userInfo) {

            history.push('/login');
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders());
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }

    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register


        if (password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }



    }
    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated Successfully </Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup controlId='confirmPassword'>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></FormControl>
                    </FormGroup>

                    <Button className="my-3 btn-block" type='submit' variant='primary'>
                        Update Profile
                    </Button>
                </Form>

            </Col>
            <Col md={9}>
                <h2 className="text-center">my orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) =>
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )

}

export default ProfileScreen;