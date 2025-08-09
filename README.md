# WTWR (What to Wear) — React + Vite

A weather-based clothing recommendation app built with React and Vite.  
Users can register, log in, add clothing items, like/dislike items, edit their profile, and see recommendations based on the weather.

---

## Features

- User registration and login (JWT authentication)
- Add, like, and delete clothing items
- Edit user profile and avatar
- Weather-based clothing recommendations
- Responsive design
- Protected routes for profile and item management

---

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/) (backend)
- [MongoDB](https://www.mongodb.com/) (backend)
- [JWT](https://jwt.io/) authentication
- CSS Modules
- Context API and React Hooks

---

## Getting Started

### 1. Clone the frontend

```sh
git clone https://github.com/mic-c/se_project_express.git
cd your-frontend-repo
npm install
npm run dev
```

### 2. Clone and run the backend

The backend code is available here:  
[Backend Repository](https://github.com/mic-c/se_project_react.git)

Follow the backend README to install dependencies and start the server with Express and MongoDB.

---

## Project Structure

```
src/
  components/
    App.jsx
    Footer.jsx
    Header.jsx
    ItemCard.jsx
    ItemModal.jsx
    Main.jsx
    ModalWithForm.jsx
    WeatherCard.jsx
    Profile.jsx
    AddItemModal.jsx
    SideBar.jsx
    ClothesSection.jsx
    ToggleSwitch.jsx
    LoginModal.jsx
    RegisterModal.jsx
  contexts/
    CurrentTemperatureUnitContext.js
    CurrentUserContext.js
  utils/
    api.js
    weatherApi.js
    constants.js
  assets/
    (images, fonts, etc.)
vendor/
  normalize.css
  fonts.css
  fonts/
index.html
index.css
main.jsx
README.md
```

---

## Code Style

- camelCase for variables and functions
- Descriptive names for all variables and functions
- Functional React components and hooks
- Prettier formatting
