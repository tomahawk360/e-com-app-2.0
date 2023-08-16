import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productApiSlice.js';
import { addToCart } from '../slices/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { data: product, refetch, isLoading, isError} = useGetProductDetailsQuery(productId);
    const [ createReview, { isLoading: loadingCreateReview }] = useCreateReviewMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty}));
        navigate('/cart');
    }

	const submitHandler = async ( e) => {
		e.preventDefault();
		
		try {
			await createReview({
				productId,
				rating, 
				comment			
			}).unwrap();
			refetch();
			toast.success('Reseña aceptada');
			setRating(0);
			setComment('');

		} catch (err) {
			toast.error(err?.data?.message || err.message);
		}
	}

    return (
        <>
            <Link className='btn btn-light my-3' to='/' >
                Volver al menu
            </Link>

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
                        <Meta title={product.name} />
                        <Row>
                            <Col md={5}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>

                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <p>Descripción: {product.description}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>

                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Precio:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Estado:</Col>
                                                <Col>
                                                    <strong>
                                                        {
                                                            product.countInStock > 0
                                                            ? 'En Stock'
                                                            : 'Fuera de Stock'
                                                        }
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Cantidad</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                value={qty}
                                                                onChange={(e) => setQty(Number(e.target.value))}
                                                            >
                                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )

                                        }

                                        <ListGroup.Item>
                                            <Button
                                                className='btn-block'
                                                type='button'
                                                disabled={product.countInStock === 0}
                                                onClick={addToCartHandler}
                                            >
                                                Añadir al carro
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                        <Row className='review'>
							<Col md={6}>
								<h2>Reseñas</h2>
								{product.reviews.length === 0 && <Message>Sin Reseñas</Message>}
								<ListGroup variant='flush'>
									{product.reviews.map((review) => (
											<ListGroup.Item key={review._id}>
												<strong>{review.name}</strong>
												<Rating value={review.rating} />
												<p>{review.createdAt.subString(0, 10)}</p>
												<p>{review.comment}</p>
											</ListGroup.Item>
										))
									}
									<ListGroup.Item>
										<h2>Escribe una reseña</h2>

										{loadingCreateReview && <Loader />}
										{ 
											userInfo
												? (
													<Form onSubmit={submitHandler}>
														<Form.Group controlId='rating' className='my-2'>
															<Form.Label>Rating</Form.Label>
															<Form.Control
																as='select'
																value={rating}
																onChange={(e) => setRating(Number(e.target.value))}
															>
																<option value=''>Seleccionar...</option>
																<option value='1'>1 - Pesimo</option>
																<option value='2'>2 - Malo</option>
																<option value='3'>3 - Servicial</option>
																<option value='4'>4 - Bueno</option>
																<option value='5'>5 - Excelente</option>
															</Form.Control>
														</Form.Group>

														<Form.Group controlId='comment' className='my-2'>
															<Form.Label>Comentario</Form.Label>
															<Form.Control
																as='textarea'
																value={comment}
																onChange={(e) => setComment(e.target.value)}
															></Form.Control>
														</Form.Group>

														<Button
															disabled={loadingCreateReview}
															type='submit'
															variant='primary'
														>
															Enviar Reseña
														</Button>
													</Form>
												)
											: (
												<Message variant='danger'>
													<Link to='/login'>Ingrese</Link> para poder realizar una reseña!
												</Message>
											)
										}
									</ListGroup.Item>
								</ListGroup>
							</Col>
                        </Row>
                    </>
                )
            }

            
        </>
    )
}

export default ProductScreen