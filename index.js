// main.js

// Function to fetch data from maindb.json
async function fetchMainData() {
  try {
    const response = await fetch('db.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data from db.json.');
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

// Function to update the user profile section with data from maindb.json
async function updateUserProfile() {
  const mainData = await fetchMainData();
  const userProfileSection = document.querySelector('.user-profile');
  if (userProfileSection) {
    const userData = mainData.users.find(user => user.role === 'user');
    userProfileSection.innerHTML = `
      <h2>User Profile</h2>
      <p>Name: ${userData.name}</p>
      <p>Email: ${userData.email}</p>
    `;
  }
}

// Function to update the admin profile section with data from maindb.json
async function updateAdminProfile() {
  const mainData = await fetchMainData();
  const adminProfileSection = document.querySelector('.admin-profile');
  if (adminProfileSection) {
    const adminData = mainData.users.find(user => user.role === 'admin');
    adminProfileSection.innerHTML = `
      <h2>Admin Profile</h2>
      <p>Name: ${adminData.name}</p>
      <p>Email: ${adminData.email}</p>
    `;
  }
}

// Function to update the newsletter section with data from maindb.json
async function updateNewsletter() {
  const mainData = await fetchMainData();
  const newsletterSection = document.querySelector('.newsletter');
  if (newsletterSection) {
    let newsletterHTML = '<h2>Newsletter</h2>';
    mainData.newsletter.forEach(news => {
      newsletterHTML += `
        <div>
          <h3>${news.title}</h3>
          <p>${news.content}</p>
        </div>
      `;
    });
    newsletterSection.innerHTML = newsletterHTML;
  }
}

// Function to update the events section with data from maindb.json
async function updateEvents() {
  const mainData = await fetchMainData();
  const eventsSection = document.querySelector('.events');
  if (eventsSection) {
    let eventsHTML = '<h2>Events</h2>';
    mainData.events.forEach(event => {
      eventsHTML += `
        <div>
          <h3>${event.title}</h3>
          <p>Date: ${event.date}</p>
          <p>Location: ${event.location}</p>
          <p>Description: ${event.description}</p>
        </div>
      `;
    });
    eventsSection.innerHTML = eventsHTML;
  }
}
// Function to initialize the image slider
function initImageSlider() {
  const imageSlider = document.querySelector('.image-slider');
  const images = imageSlider.querySelectorAll('img');
  let currentIndex = 0;

  // Function to show the next image
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImageSlider();
  }

  // Function to update the image slider
  function updateImageSlider() {
    images.forEach((image, index) => {
      image.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });
  }
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    // Basic validation to check if all fields are filled out
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // Assuming you have a function to handle sending the message to the server
    // For demonstration purposes, we'll simply show an alert here
    alert('Message has been sent!');
    // You can also redirect to the home page here
    window.location.href = '/index.html';
  }

  // Add event listener to the form submit event
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', handleSubmit);

  // Start the image slider
  setInterval(showNextImage, 3000); // Change image every 3 seconds (adjust as needed)
}

// Call the function to initialize the image slider
initImageSlider();

// Call the functions to update the sections on page load
document.addEventListener('DOMContentLoaded', () => {
  updateUserProfile();
  updateAdminProfile();
  updateNewsletter();

});
