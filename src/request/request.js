import { APP_HOST } from "../config/constants.js";

export const postData = async function (url = "", data = {}, needToken) {
    url = APP_HOST + url;
    let aHeaders = new Headers();
    aHeaders.append("Content-Type", "application/json");
    if (needToken) {
      let token = localStorage.getItem("token");
      if (token != null) {
        aHeaders.append("Authorization", `${"Bearer " + token}`);
      } else {
        throw "No se pudo obtener el token";
      }
    }
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: aHeaders,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  export const getData = async function (url = "", params) {
    url = APP_HOST + url;
    if (params !== null) {
      url += "?" + new URLSearchParams(params).toString();
    }
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    return response.json();
  };
  
  
  export const putData = async function (url = "", data = {}) {
    url = APP_HOST + url;
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  export const deleteData = async function (url = "", data = {}) {
    url = APP_HOST + url;
    const response = await fetch(url, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  };