import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p>Page not found</p>
            <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
        </div>
    );
};
export default NotFound;