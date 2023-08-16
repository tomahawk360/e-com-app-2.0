import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {   
    useGetUsersQuery,
    useDeleteUserMutation
} from '../../slices/usersApiSlice';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, isError } = useGetUsersQuery();
    const [ deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
        if(window.confirm(`Seguro de borrar el usuario ${id}`)) {
            try {
                await deleteUser(id);
                refetch();
                toast.success('Usuario borrado');

            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        };
    };

    return (
        <>
            <h1>Usuarios</h1>
            {loadingDelete && <Loader />}
            {
                isLoading
                    ? <Loader />
                : isError
                    ? <Message variant='danger'>{isError}</Message>
                : 
                (
                    <Table striped hver responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{
                                        user.isAdmin
                                            ?
                                            (
                                                <FaCheck style={{ color: 'green' }} />
                                            )
                                        :
                                        (
                                            <FaTimes style={{ color: 'red' }} />
                                        )
                                    }</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(user._id)}
                                        >
                                            <FaTrash style={{color: 'white'}}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default UserListScreen;