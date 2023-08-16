import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form , Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { 
    useUpdateProductMutation, 
    useGetProductDetailsQuery,
    useUploadProductImageMutation
} from '../../slices/productApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, refetch, isLoading, isError } = useGetProductDetailsQuery(productId);
    const [ updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [ uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };

        try {
            const result = await updateProduct(updatedProduct);
            toast.success('Producto editado');
            navigate('/admin/productlist');
            
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);

        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Volver
            </Link>
            <FormContainer>
                <h1>Editar Producto</h1>
                {loadingUpdate && <Loader />}
                {
                    isLoading
                        ? <Loader />
                    : isError
                        ? <Message variant='danger'>{isError}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='my-2'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingresar nombre'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price' className='my-2'>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Ingresar precio'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image' className='my-2'>
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingrese url de la imagen'
                                    value={image}
                                    onChange={(e) => setImage}
                                ></Form.Control>
                                <Form.Control
                                    type='file'
                                    label='Escoger archivo'
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='brand' className='my-2'>
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingresar marca'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock' className='my-2'>
                                <Form.Label>Cantidad en Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    placeholder='Ingresar cantidad'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category' className='my-2'>
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingresar categoria'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description' className='my-2'>
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingresar descripcion'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'
                                className='my-2'
                            >Editar</Button>
                        </Form>
                    )
                }
            </FormContainer>
        </>
    )
}

export default ProductEditScreen;