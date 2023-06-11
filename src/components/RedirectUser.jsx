import { Navigate, useLocation} from 'react-router-dom';
import UseAuth from '../providers/AuthProvider';

const RedirectUser = ({ children }) => {
  const location = useLocation()
  const {currentUser} = UseAuth()

  return currentUser ? <Navigate to="/dashboard" replace state={{ path: location.pathname }} /> : children
};

export default RedirectUser