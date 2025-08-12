import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { editProfile } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";
import { signup, signin, checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  addCardLike,
  removeCardLike,
  getItems,
  postItem,
  deleteItem,
} from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Edit profile modal handlers
  const handleEditProfileClick = () => setIsEditProfileOpen(true);
  const closeEditProfileModal = () => setIsEditProfileOpen(false);

  // Use this everywhere to close modals
  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Edit profile submit handler
  const handleEditProfile = (form) => {
    const token = localStorage.getItem("jwt");
    editProfile(form, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeEditProfileModal();
      })
      .catch((err) => {
        alert("Profile update failed");
        console.error(err);
      });
  };

  // Registration handler
  const handleRegister = (form) => {
    signup(form)
      .then(() => {
        closeActiveModal();
        handleLogin({ email: form.email, password: form.password }); // Auto-login
      })
      .catch((err) => {
        alert("Registration failed");
        console.error(err);
      });
  };

  // Login handler
  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          closeActiveModal();
          checkToken(res.token).then((user) => setCurrentUser(user));
        }
      })
      .catch((err) => {
        alert("Login failed");
        console.error(err);
      });
  };

  // Sign out handler
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(() => setIsLoggedIn(false));
    }
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => setActiveModal("register");
  const handleSignInClick = () => setActiveModal("login");

  const handleAddItemModalSubmit = ({ name, image, weather }) => {
    const newItem = {
      name,
      imageUrl: image,
      weather,
    };

    return postItem(newItem).then((dbItem) => {
      setClothingItems((prevItems) => [dbItem, ...prevItems]);
      closeActiveModal();
    });
  };

  const handleDeleteCard = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard(null);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error deleting the item:", err);
      });
  };

  // --- LIKE/DISLIKE LOGIC ---
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onSignInClick={handleSignInClick}
              onSignUpClick={handleSignUpClick}
            />
            <Routes>
              <Route
                path=""
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          selectedCard={selectedCard}
          onSelectCard={setSelectedCard}
          onDeleteClick={handleDeleteCard}
        />
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={closeEditProfileModal}
          onEditProfile={handleEditProfile}
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
          onSignUpClick={handleSignUpClick}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
