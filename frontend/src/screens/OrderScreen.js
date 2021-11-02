import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Image, ListGroup, Card, ListGroupItem, Button } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/Loader';
import axios from 'axios'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { CREATE_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);


    const orderDetails = useSelector(state => state.orderDetails);


    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector(state => state.orderPay);
    const { success: successPay, loading: loadingPay, } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { success: successDeliver, loading: loadingDeliver, } = orderDeliver;

    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        order.taxPrice = Number(0.10 * order.itemsPrice);
    }


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: CREATE_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }


    }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }
    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }


    return loading ? < Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <>
            <h1>Order {order._id} </h1>

            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name:</strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address :</strong>
                                {order.shippingAddress.address},{order.shippingAddress.city},
                                {order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success">delivered  on {order.deliveredAt}</Message> :
                                <Message variant="danger">Not Delivered</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> :
                                <Message variant="danger">Not Paid</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link style={{ textDecoration: 'none' }} to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x Rs-{item.price}=Rs-{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rs-{order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs-{order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs-{order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs-{order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                {!order.isPaid && (
                                    <ListGroupItem>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (
                                            <PayPalButton amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                        )}
                                    </ListGroupItem>
                                )}
                                {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroupItem>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroupItem>

                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )


}

export default OrderScreen;