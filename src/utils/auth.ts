// Funcion para verificar si el usuario esta autenticado
export const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
};

// Funcion para cerrar sesion
export const logout = () => {
    localStorage.removeItem("isAuthenticated");
};