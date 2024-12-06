# Dog Adoption Center - README

Welcome to the **Dog Adoption Center** project! This is a simple yet dynamic website that helps connect lovable dogs with potential adopters. Below, you'll find details about the structure, features, and setup of the project.

---

## Features

1. **Home Page**:
   - Welcoming users with an overview of the adoption center.
   - Featured dogs with brief introductions.
![image](https://github.com/user-attachments/assets/6a80d291-d944-45e1-8fde-fe07627d60aa)

     

2. **About Us**:
   - Information about the adoption center's mission, history, and values.
   - Embedded images to enhance storytelling.
![image](https://github.com/user-attachments/assets/da05cfd5-ebc1-4878-a509-eea21d5a6001)

3. **Adoption Form**:
   - A simple form where users can apply to adopt a dog.
   - Collects basic details like name, contact information, and preferences.
![image](https://github.com/user-attachments/assets/28545de3-8aa9-458e-912f-fd5ecc4f8f9e)

4. **Dog Listings**:
   - A paginated list of all dogs available for adoption.
   - Data fetched from the **Petify API**.
   - Includes photos, names, breeds, and brief descriptions of each dog.
![image](https://github.com/user-attachments/assets/b3f8429a-5112-4104-9f12-ae4dbc2a110b)

5. **Store**:
   - A small shopping section for pet-related items.
   - Simple shopping experience, including item display and selection.
![image](https://github.com/user-attachments/assets/db3e3e70-c2c0-4e7d-981c-ac0a3ffe11d0)

6. **Contacts**:
   - Contact form for inquiries.
   - Address, phone number, and other contact details displayed.
![image](https://github.com/user-attachments/assets/213664ed-a48c-4d3f-bab2-701486228b56)

7. **Responsive Design**:
   - Optimized for all screen sizes: mobile, tablet, and desktop.

8. **Favourites
   - Sessions are created and stored to keep some informtion, the most prevalant
   is favourite dogs, that the user can go back and revisted without searching
   for them.
![image](https://github.com/user-attachments/assets/b0d874be-435f-4db0-a15d-bb18ed8e4bc2)



---

## Technology Stack

- **HTML**: Markup for the structure of the website.
- **CSS**: Styling for layout and design, including responsiveness.
- **JavaScript (Vanilla)**: Interactivity and API integration.
- **Petify API**: Used as the database for fetching dog details.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/WineSteward/PWC_IAPSI_Website_Project.git
   cd PWC_IAPSI_Website_Project
   open the index.html in any web browser
   ```


   ## API Integration (Petify API)

The website fetches data about available dogs from the **Petify API**. Below is an example of how the API is used:

```javascript
// Example API call
fetch('https://api.petify.com/dogs')
  .then(response => response.json())
  .then(data => {
    // Process and display the data
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching dog data:', error);
  });
```


## Responsive Design

The website is designed to work seamlessly across various devices. Key responsive features include:

- **Flexbox and Grid Layouts**: Ensure content adjusts elegantly on different screen sizes.
- **Media Queries**: Adjust styling for mobile, tablet, and desktop screens.
- **Image Optimization**: Dog photos and other images are optimized for faster loading and better display.

---

## Credits

- **Petify API**: For providing the dog database.
- **Open Source Resources**: Icons, fonts, and libraries where applicable.
- **All Contributors and Testers**: Thanks to everyone who supported the project.
