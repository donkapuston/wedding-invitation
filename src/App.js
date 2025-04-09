import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    drinks: '',
    comments: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://wedding-proxy-9a0hkbetq-donkapustons-projects.vercel.app', // Замени на свой URL от Vercel
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast.success('Спасибо за подтверждение! ❤️', {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({ name: '', guests: '1', drinks: '', comments: '' });
    } catch (error) {
      console.error('Ошибка:', error);
      toast.error('Что-то пошло не так. Попробуйте снова.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container">
      <h1>Приглашение на нашу свадьбу!</h1>
      <p>Дорогие друзья, мы рады пригласить вас на наше торжество!</p>

      <div className="info-section">
        <div className="info-item">
          <span className="icon">💍</span>
          <div>
            <h3>Регистрация в ЗАГСе</h3>
            <p>15 мая 2025, 12:00<br />ул. Ленина, 10, ЗАГС Центрального района</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">🥂</span>
          <div>
            <h3>Банкет</h3>
            <p>15 мая 2025, 15:00<br />Ресторан "Золотой Лев", ул. Мира, 25</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">👗</span>
          <div>
            <h3>Дресс-код</h3>
            <p>Коктейльный стиль<br />Цвета: пастельные или классические</p>
          </div>
        </div>
      </div>

      <h2>Подтвердите ваше присутствие</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Ваше имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="guests">Количество гостей:</label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label htmlFor="drinks">Предпочтение по напиткам:</label>
        <input
          type="text"
          id="drinks"
          name="drinks"
          value={formData.drinks}
          onChange={handleChange}
          placeholder="Например, вино, сок, вода"
        />

        <label htmlFor="comments">Дополнительные пожелания:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Ваши пожелания"
        />

        <button type="submit">Принять приглашение</button>
      </form>

      {/* Контейнер для уведомлений */}
      <ToastContainer />
    </div>
  );
}

export default App;