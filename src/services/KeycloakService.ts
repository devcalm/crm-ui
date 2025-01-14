import Keycloak from "keycloak-js";
import config from "@config";

class KeycloakService {
    private keycloak: Keycloak;
    private initialized: boolean = false;

    constructor() {
        const keycloakConfig = {
            responseType: 'code',
            ...config.keycloak
        }
        this.keycloak = new Keycloak(keycloakConfig);
    }

    async init(): Promise<void> {
        if (this.initialized) {
            console.log("Keycloak already initialized.");
            return;
        }

        try {
            await this.keycloak.init({
                onLoad: "check-sso",
                checkLoginIframe: false,
                pkceMethod: 'S256',
                silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
            });

            this.keycloak.onTokenExpired = async () => {
                try {
                    console.log("Refreshing token...");
                    await this.keycloak.updateToken(30); // Refresh if the token will expire in 30 seconds
                    console.log("Token refreshed");
                } catch (error) {
                    console.error("Failed to refresh token", error);
                    this.logout();
                }
            };

            this.initialized = true;
            console.log("Keycloak initialized successfully.");
        } catch (error) {
            console.error("Keycloak initialization failed", error);
        }
    }

    getToken(): string | undefined {
        return this.keycloak.token;
    }

    isAuthenticated(): boolean {
        return !!this.keycloak.authenticated;
    }

    logout(): void {
        this.keycloak.logout();
    }

    getKeycloakInstance(): Keycloak {
        return this.keycloak;
    }
}

export default new KeycloakService();
