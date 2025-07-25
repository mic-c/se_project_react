import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const currentTemperatureUnit = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }
  if (!clothingItems) {
    return <div>Loading clothing items...</div>;
  }

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems.length === 0 ? (
            <li>No clothing items found.</li>
          ) : (
            clothingItems.map((item) => (
              <ItemCard
                key={item._id || item.id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
