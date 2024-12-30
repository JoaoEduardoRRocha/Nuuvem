import { useEffect, useState } from "react";
import "./section.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Section = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      await axios
        .get("http://localhost:5050/api/games/")
        .then((response) => {
          setGames(response.data as []);
        })
        .catch((err) => console.error(err));
    };
    fetchGames();
  }, []);

  return (
    <section className="section-container">
      <h1 className="section-container__title">Jogos Disponíveis</h1>
      <div className="section-container__game-grid">
        {games.map((game: any) => (
          <div key={game.id} className="section-container__game-card-container">
            <img
              className="section-container__game-card-container__img"
              src={game.image}
              alt={game.name}
            />
            <p className="section-container__game-name">{game.name}</p>
            <p className="section-container__game-price">R$ {game.price}</p>
            <p className="section-container__game-description">
              {game.description}
            </p>
            <div className="section-container__btn-card">
              <Link to={`/products/${game.id}`} className="link">
                <button className="section-container__btn-buy">Comprar</button>
              </Link>

              <button className="section-container__btn-add-cart">
                Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section;
