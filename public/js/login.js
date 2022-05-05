const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#InputEmail1').value.trim();
  const password = document.querySelector('#InputPassword1').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/login/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    response.ok ? document.location.replace("/offers") : alert(response.statusText);
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#InputUsername2').value.trim();
  const email = document.querySelector('#InputEmail2').value.trim();
  const password = document.querySelector('#InputPassword2').value.trim();

  if (username && email && password) {
    const response = await fetch('/login/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    response.ok ? document.location.replace("/offers") : alert(response.statusText);
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);