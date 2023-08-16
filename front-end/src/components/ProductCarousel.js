import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useGetTopProductsQuery } from '../slices/productApiSlice';
import Message from './Message';
import Loader from './Loader';

const ProductCarousel = () => {
    const { data: products, isLoading, isError } = useGetTopProductsQuery();

    return (
        isLoading
            ? <Loader />
        : isError
            ? <Message variant='danger'>{isError}</Message>
        :
        (
           <Carousel pause='hover' className='md-primary mb-4'>
                {
                    products.map((product) => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image}  alt={product.name} fluid />
                                <Carousel.Caption className='carousel-caption'>
                                    <h2>
                                        {product.name} (${product.price})
                                    </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))
                }
           </Carousel>
        )
    )
}

export default ProductCarousel;