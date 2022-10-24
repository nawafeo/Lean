import { Navigate } from 'react-router-dom';

function PrivateRoute(props: any) {
    if (props.children.type.name === 'me') {
        return localStorage.getItem('member') != null ? props.children : <Navigate to='/login' />;
    } else {
        return localStorage.getItem('member') == null ? props.children : <Navigate to='/' />;
    }
}

export default PrivateRoute;