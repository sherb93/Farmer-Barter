const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  // offers
  
  const offersFormHandler = async (event) => {
    event.preventDefault();
  
    const date_available = document.querySelector('#date_available').value;
    const location = document.querySelector('#location').value;
    const crop = document.querySelector('#crop').value;
  const quantity = document.querySelector('#quantity').value;
  
    if (date_available && crop && location) {
      const response = await fetch(/api/users, {
        method: 'POST',
        body: JSON.stringify({ date_available,crop,quantity}),
        headers: { 'Content-Type': application/json}
      
      });
  
      if (response.ok) {
        document.location.replace('/offers');
      } else {
        alert(response.statusText);
      }
    }
  };
  