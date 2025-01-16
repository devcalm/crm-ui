import React, { useEffect, useState } from "react";
import KeycloakService from "@services/KeycloakService";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const initializeKeycloak = async () => {
            await KeycloakService.init();
            const authenticated = KeycloakService.isAuthenticated();
            if (authenticated) {
                setIsAuthenticated(true);
            } else {
                KeycloakService.getKeycloakInstance().login();
            }
            setLoading(false);
        };

        initializeKeycloak();
    }, []);

    if (loading) {
        return <div className="spinner"></div>;
    }

    return isAuthenticated ? <>{children}</> : null;
};
