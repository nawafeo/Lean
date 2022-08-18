import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ResetPage = (props:any) => {
    const location = useLocation();
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return <>{props.children}</>
};

export default ResetPage;