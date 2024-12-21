import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BackgroundImg from '../../assets/wallpeaper2.jpg';
import './add-card.scss';
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser } from '../../auth/auth-helper'

function AddCard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    description: '',
    price: '',
    discountPrice: '',
    image: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      setIsAuthenticated(!!user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5173/api/games/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Produto adicionado com sucesso!');
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Houve um erro ao adicionar o produto.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="add-card">
      <img className="add-card__background" src={BackgroundImg} alt="Background" />
      <form className="add-card__form" onSubmit={handleSubmit}>
        <h1 className="add-card__title">Adicionar Produto</h1>
        <div className="add-card__form-group">
          <label htmlFor="image" className="add-card__label">Imagem:</label>
          <input
            type="file"
            id="image"
            className="add-card__input"
            onChange={handleFileChange}
          />

          <label htmlFor="name" className="add-card__label">Nome:</label>
          <input
            type="text"
            id="name"
            className="add-card__input"
            placeholder="Digite o nome do jogo"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="gender" className="add-card__label">Gênero:</label>
          <input
            type="text"
            id="gender"
            className="add-card__input"
            placeholder="Digite o gênero do jogo"
            value={formData.gender}
            onChange={handleChange}
          />

          <label htmlFor="description" className="add-card__label">Descrição:</label>
          <textarea
            id="description"
            className="add-card__input add-card__textarea"
            placeholder="Digite uma descrição do jogo"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="price" className="add-card__label">Preço:</label>
          <input
            type="number"
            id="price"
            className="add-card__input"
            placeholder="Digite o preço do jogo"
            value={formData.price}
            onChange={handleChange}
          />

          <label htmlFor="discountPrice" className="add-card__label">Preço com Desconto (Opcional):</label>
          <input
            type="number"
            id="discountPrice"
            className="add-card__input"
            placeholder="Digite o preço com desconto"
            value={formData.discountPrice}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="add-card__button">Adicionar Produto</button>

        <Link className="link" to="/home-admin">
          <button type="button" className="add-card__button-cancel">Cancelar</button>
        </Link>
      </form>
    </div>
  );
}

export default AddCard;
