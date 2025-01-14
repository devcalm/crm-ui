export const LOCAL_CONFIG = {
    productServerURL: "http://localhost:8080/api",
    customerServerURL: "http://localhost:8080/api",
    managerServerURL: "http://localhost:8080/api",
    inquiryServerURL: "http://localhost:8081/api",
    keycloak: {
        url: "http://localhost:8890",
        realm: "keycloak-react-auth",
        clientId: "react-auth"
    }
};

const config = LOCAL_CONFIG;

export default config;