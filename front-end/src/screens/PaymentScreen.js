import { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingAddress } = useSelector((state) => state.cart);

    useEffect(() => {
        if(!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }
    
    return (
        <>
        
            <CheckOutSteps step1 step2 step3 />

            <FormContainer>
                <h1>Pago</h1>

                <Form onSubmit={submitHandler} >
                    <Form.Group>
                        <Form.Label as='legend'>Seleccione metodo de pago</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                className='my-2'
                                label='PayPal o Credito'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                        </Col>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Continuar
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default PaymentScreen