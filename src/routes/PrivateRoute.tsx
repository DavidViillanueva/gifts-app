
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLogged }: { children: JSX.Element, isLogged: boolean }) => {

    if( !isLogged ) {
        return <Navigate to="/login"></Navigate>
    }
    
    return children;
}

export default PrivateRoute