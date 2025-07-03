import { useAuthStore } from "../Utils/useAuthStore"
import { Outlet, Navigate } from 'react-router'
import { routes } from "../Utils/routes";

const ProtectedRoute = () => {
    const { user } = useAuthStore()
    return (
            user ? <Outlet /> : <Navigate to={routes.login} />
    )
}

export default ProtectedRoute