import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, FormControl, FormGroup, FormLabel, FormCheck } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/Loader';
import { getUserDetails, updateUser } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);



    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;



    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        }
        else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setEmail(user.email);
                setName(user.name);
                setIsAdmin(user.isAdmin);
            }
        }



    }, [user, dispatch, userId, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))

    }
    return (
        <>
            <Link to='/admin/userList' className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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

                        <FormGroup controlId='isadmin'>
                            <FormLabel>IsAdmin</FormLabel>
                            <FormCheck
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></FormCheck>
                        </FormGroup>



                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>

                )}



            </FormContainer>
        </>

    )

}

export default UserEditScreen;
