import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, FormControl, FormGroup, FormLabel, FormCheck, FormFile } from 'react-bootstrap';
import Message from '../components/message';
import Loader from '../components/Loader';
import { listProductDetails, updateProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';


const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id;

    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);




    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;




    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist');
        }
        else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setPrice(product.price);
                setName(product.name);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
                setImage(product.image);

            }
        }






    }, [dispatch, productId, history, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch register
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))


    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <>
            <Link to='/admin/productlist' className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
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

                        <FormGroup controlId='price'>
                            <FormLabel>Price</FormLabel>
                            <FormControl
                                type='number'
                                placeholder='enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></FormControl>
                        </FormGroup>

                        <FormGroup controlId='image'>
                            <FormLabel>Image</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></FormControl>
                            <FormFile
                                id="image-file"

                                custom
                                onChange={uploadFileHandler}
                            >
                                {uploading && <Loader />}
                            </FormFile>
                        </FormGroup>
                        <FormGroup controlId='brand'>
                            <FormLabel>Brand</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='category'>
                            <FormLabel>Category</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='countInStock'>
                            <FormLabel>Count In Stock</FormLabel>
                            <FormControl
                                type='number'
                                placeholder='enter count in stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId='description'>
                            <FormLabel>Description</FormLabel>
                            <FormControl
                                type='text'
                                placeholder='enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></FormControl>
                        </FormGroup>



                        <Button type='submit' variant='primary' className='my-3'>
                            Update
                        </Button>
                    </Form>

                )}



            </FormContainer>
        </>

    )

}

export default ProductEditScreen;