const logout = async () => {
  const response = await fetch("/login/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  response.ok ? document.location.replace("/") : alert(response.statusText);
};

document.querySelector("#logout").addEventListener("click", logout);
