"use strict";

(function () {
  const inputs = document.querySelectorAll(`.signup input:not([type="submit"])`);

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.id === "confirm-signup-pw") {
        const pw = document.querySelector("#signup-pw");
        input.setAttribute("style",
          `background: no-repeat 96% / 8% url(../resources/images/is_${pw.value === input.value ? "" : "in"}valid.svg);`
        );
      } else {
        input.setAttribute("style",
          `background: no-repeat 96% / 8% url(../resources/images/is_${input.checkValidity() ? "" : "in"}valid.svg);`
        );
      }
    });
  });

  const userEndpoint = 'http://localhost:1200/api/users'

  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(loginForm);
    data.forEach((value, key) => (data[key] = value))

    const response = await fetchPost(`${userEndpoint}/login`, data);
    if (response.status === 200) {
      window.sessionStorage.setItem('isLoggedIn', 'true');
      window.sessionStorage.setItem('user', JSON.stringify(await response.json().user));
      window.location.replace(window.sessionStorage.getItem('prevUrl'));
    } else {
      console.error(response.status, await response.json());
    }
  });

  const signupForm = document.querySelector('.signup-form');
  signupForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = new FormData(signupForm);
    data.forEach((value, key) => (data[key] = value));
    try {
      await fetchPost(`${userEndpoint}/signup`, data)
    } catch (err) {
      console.err(err)
    }
  });
})();

const fetchPost = async (url, data) => {
  const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });

  return response;
}