import { Card } from "react-bootstrap";
import Rating from './Rating';
import { Link } from "react-router-dom";



const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`}>
                    <Card.Title as="div" className="" >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3">Rs-{product.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Product