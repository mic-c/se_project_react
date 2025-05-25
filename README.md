# WTWR Project

## Description

WTWR (What To Wear) is a weather-based clothing recommendation app.  
It allows users to:

- Register and log in
- View current weather for a specific location
- Add, like, and remove clothing items
- Edit their profile and avatar
- Sign out securely

The app fetches real-time weather data from [WeatherAPI](https://www.weatherapi.com/) and displays it alongside user-managed clothing items, helping users decide what to wear based on the weather.

## Technologies and Techniques Used

- **React**: Frontend framework for building user interfaces
- **React Router**: For client-side routing
- **Context API**: For global state management (user, temperature unit)
- **WeatherAPI**: For fetching real-time weather data
- **REST API**: For backend communication (user authentication, clothing items)
- **CSS Modules**: For component-scoped styling
- **Fetch API**: For making HTTP requests
- **JWT Authentication**: For secure user sessions
- **Modular Component Structure**: For maintainable and reusable code

## Project Structure

- **components/**: Contains all React components, including:
  - `App.jsx`
  - `Footer.jsx`
  - `Header.jsx`
  - `ItemCard.jsx`
  - `ItemModal.jsx`
  - `Main.jsx`
  - `ModalWithForm.jsx`
  - `WeatherCard.jsx`
  - `Profile.jsx`
  - `AddItemModal.jsx`
  - `SideBar.jsx`
  - `ClothesSection.jsx`
  - `ToggleSwitch.jsx`
  - `LoginModal.jsx`
  - `RegisterModal.jsx`
- **vendor/**: Contains `normalize.css`, `fonts.css`, and a `fonts/` directory
- **utils/**: Utility functions and API logic
- **contexts/**: Contains `CurrentTemperatureUnitContext.js` and `CurrentUserContext.js`
- **.prettierignore**: Tells Prettier to ignore `normalize.css`

## Notes

- All JS and CSS files are stored in the `src` folder, grouped by component.
- Stylesheets are connected and scoped to their components.
- The project is built and run using Vite, ensuring fast development and HMR.
- The project builds and runs without errors.
- The project uses Vite for fast development and hot module replacement.
- All dependencies are managed via npm.
- For weather data, you must provide a valid [WeatherAPI](https://www.weatherapi.com/) key in `weatherApi.js`.
