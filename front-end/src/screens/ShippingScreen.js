import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps';

const ShippingScreen = () => {
    const { shippingAddress } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    }

    return (
        <>
            <CheckOutSteps step1 step2/>

            <FormContainer>
                <h1>Shipping</h1>

                <Form onSubmit={submitHandler}>
                    <Form.Group
                        controlId='address'
                        className='my-2'
                    >
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese direccion'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId='city'
                        className='my-2'
                    >
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese ciudad'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId='postalCode'
                        className='my-2'
                    >
                        <Form.Label>Codigo Postal</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese codigo postal'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group
                        controlId='country'
                        className='my-2'
                    >
                        <Form.Label>Pais</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Ingrese pais'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        className='my-2'
                        variant='primary'
                    >
                        Continuar
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingScreen;