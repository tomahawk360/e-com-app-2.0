import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form , Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { 
    useUpdateUserMutation, 
    useGetUserDetailsQuery,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, refetch, isLoading, isError } = useGetUserDetailsQuery(userId);
    const [ updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success('Usuario actualizado');
            refetch();
            navigate('/admin/userlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Volver
            </Link>
            <FormContainer>
                <h1>Editar usuario</h1>
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

                            <Form.Group controlId='email' className='my-2'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ingresar email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isAdmin' className='my-2'>
                                <Form.Check
                                    type='checkbox'
                                    label='Es Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
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

export default UserEditScreen;