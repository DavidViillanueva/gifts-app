import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, isLogged, uid = '' }: { children: JSX.Element, isLogged: boolean, uid?: string }) => {

    if( !isLogged ) {
        return children;
    }
    
    return <Navigate to={`/profile/${uid}`}></Navigate>;
}

export default PublicRoute