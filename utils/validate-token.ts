function isLogged() {
  return localStorage.getItem("token");
}

export { isLogged };
