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


// Call the functions to update the sections on page load
document.addEventListener('DOMContentLoaded', () => {
  updateUserProfile();
  updateAdminProfile();
  updateNewsletter();

});
