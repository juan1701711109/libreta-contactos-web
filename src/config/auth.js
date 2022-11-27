import VueJwtDecode from "vue-jwt-decode";

export const isAuthenticated = function () {
  let token = localStorage.getItem("token")
  if (token) {
    if (VueJwtDecode.decode(token).exp > Math.floor(Date.now() / 1000)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const idUser = function () {
  let token = localStorage.getItem("token")
  if (token) {
      return VueJwtDecode.decode(token).id;
  } else {
    return 0;
  }
}

export const nameUser = function () {
  let token = localStorage.getItem("token")
  if (token) {
      return VueJwtDecode.decode(token).username;
  } else {
    return 0;
  }
}