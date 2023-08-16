import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message'
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { 
    useGetProductsQuery, 
    useCreateProductMutation,
    useDeleteProductMutation
} from '../../slices/productApiSlice';

const ProductListScreen = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, isError, refetch } = useGetProductsQuery({ pageNumber });
    const [ createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [ deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const createProductHandler = async () => {
        if(window.confirm('Seguro de crear nuevo producto')) {
            try {
                const res = await createProduct();
                refetch();
                toast.success('Producto creado');
            } catch(err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const deleteHandler = async (id) => {
        if(window.confirm(`Seguro de borrar el producto ${id}`)) {
            try {
                const res = await deleteProduct(id);
                refetch();
                toast.success('Producto borrado');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Productos</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit /> Crear Producto
                    </Button>
                </Col>
            </Row>
            
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {
                isLoading
                    ? <Loader />
                : isError
                    ? <Message variant='danger'>{isError}</Message>
                : 
                (
                    <>
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm mx-2'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                <FaTrash style={{ color: 'white' }}/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                            isAdmin={true}
                        />
                    </>
                )
            }
        </>
    )
}

export default ProductListScreen;