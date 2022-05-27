
import { useResolvedPath, useMatch, Link } from 'react-router-dom'

export const CustomLinkMobileMenuAdmin = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div className={match ? "card-body card-body-active" : "card-body"}>
            <Link
                className="text-link"
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}

function CustomLinkAdmin({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <div>
            <Link
                className={match ? "active" : "none"}
                to={to}
                {...props}
            >
                {children}
            </Link>
        </div>
    );
}

export default CustomLinkAdmin