const createPostHandler = async (event) => {
  event.preventDefault();

  //RADIO Values
  let postType;
  let date_available;

  const postTypes = document.getElementsByName('post-type');
  const months = document.getElementsByName('post-month');

  for (var month of months) {
    if (month.checked) {
        date_available = month.value;
    }
}

  for (var type of postTypes) {
    if (type.checked) {
        postType = type.value;
      }
  }

  //SELECT Values
  const cities = document.getElementById('city');  
  const location = cities. options[cities.selectedIndex].value;

  //TEXT Values
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const crop = document.querySelector('#post-crop').value.trim();
  const quantity = document.querySelector('#post-quantity').value.trim();

  if (postType === "Offer") {
    if (title && content && date_available && location && crop && quantity) {
      const response = await fetch('/api/offers', {
        method: 'POST',
        body: JSON.stringify({ title, content, date_available, location, crop, quantity }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/offers');
      } else {
        alert(response.statusText);
      }
    }
  } else {
    if (title && content && date_available && location && crop && quantity) {
      const response = await fetch('/api/requests', {
        method: 'POST',
        body: JSON.stringify({ title, content, date_available, location, crop, quantity }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/requests');
      } else {
        alert(response.statusText);
      }
    }
  }
};

document.querySelector('.submission-form').addEventListener('submit', createPostHandler);