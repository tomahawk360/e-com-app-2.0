import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();

    const { data, isLoading, isError } = useGetProductsQuery({ pageNumber, keyword });

    return (
        <>
            {!keyword 
                ? (<ProductCarousel />)
            :
            (
                <Link to='/' className='btn btn-light mt-2 mb-4'>
                    Volver
                </Link>
            )}
            { 
                isLoading 
                    ? 
                    (
                        <>
                            <Loader />
                        </>
                    )
                : isError
                    ? 
                    (                  
                        <Message variant='danger'>
                            { isError?.data?.message || isError.error }
                        </Message>
                    )
                : 
                (
                    <>
                        <h1>Últimos Productos</h1>
                        <Row>

                            {data.products.map((product) => {
                                return(
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })}
                        </Row>
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                            keyword={keyword ? keyword : ''}
                        />
                    </>
                )}
        </>
    )
}

export default HomeScreen;