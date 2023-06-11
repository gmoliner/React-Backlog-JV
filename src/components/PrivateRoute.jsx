import { Navigate, useLocation} from 'react-router-dom';
import UseAuth from '../providers/AuthProvider';

// Permet de rediriger automatiquement vers la page de login si l'utilisateur n'est pas connecté
// Si l'utilisateur est connecté, on le redirige vers la dernière destination demandée
const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const {currentUser} = UseAuth()

  return currentUser ? children : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default PrivateRoute