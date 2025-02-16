import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { LOGIN } from "../../constants/routes";

const requireAuth = (ChildComponent) => {
    return function CheckAuth () {
        const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

        if(!isLoggedIn) {
            return <Navigate to={LOGIN} replace={true} />
        }

        return <ChildComponent />
    }
};

export default requireAuth;