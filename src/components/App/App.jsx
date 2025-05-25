import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signup, login, editProfile } from "../../utils/auth";
import { getItems, postItem, deleteItem } from "../../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  // Close the active modal
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Handle user login
  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed. Please check your credentials.");
      });
  };

  // Handle user registration
  const handleRegister = ({ email, password }) => {
    signup({ email, password })
      .then(() => {
        alert("Registration successful! Please log in.");
        setActiveModal("login");
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert("Registration failed. Please try again.");
      });
  };

  // Handle profile editing
  const handleEditProfile = ({ name, avatar }) => {
    editProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        alert("Failed to update profile. Please try again.");
      });
  };

  // Handle liking and disliking cards
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("No token found. User might not be logged in.");
      return;
    }

    const apiCall = isLiked ? api.removeCardLike : api.addCardLike;

    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Fetch weather data
  useEffect(() => {
    const coordinates = { latitude: 37.7749, longitude: -122.4194 }; // Example coordinates
    getWeather(coordinates)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  // Fetch clothing items
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Error fetching clothing items:", err);
      });
  }, []);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={() => setActiveModal("add-garment")}
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={setSelectedCard}
                  clothingItems={clothingItems}
                  onCardLike={handleCardLike}
                  handleSignOut={handleSignOut}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={setSelectedCard}
                  handleAddClick={() => setActiveModal("add-garment")}
                  handleSignOut={handleSignOut}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={(item) => {
            postItem(item)
              .then((newItem) => {
                setClothingItems([newItem, ...clothingItems]);
                closeActiveModal();
              })
              .catch((err) => console.error("Error adding item:", err));
          }}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteClick={(id) => {
            deleteItem(id)
              .then(() => {
                setClothingItems((cards) =>
                  cards.filter((item) => item._id !== id)
                );
                closeActiveModal();
              })
              .catch((err) => console.error("Error deleting item:", err));
          }}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={handleLogin}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeActiveModal}
          onEditProfile={handleEditProfile}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
