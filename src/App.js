import React, { useState } from 'react';
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
    const form = new FormData();
    form.append('name', formData.name);
    form.append('guests', formData.guests);
    form.append('drinks', formData.drinks);
    form.append('comments', formData.comments);

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwR28_hNEP-h1ITKwlME6CyivOCF-1wENYH9eY9jrwoUJSaF9U5BWawTdkmi3KeZivS/exec',
        {
          method: 'POST',
          body: form,
          redirect: 'follow'
        }
      );
      if (response.ok || response.redirected) {
        toast.success('Спасибо за подтверждение! ❤️', {
          position: 'top-right',
          autoClose: 3000,
        });
        setFormData({ name: '', guests: '1', drinks: '', comments: '' });
      } else {
        throw new Error('Response not OK');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      toast.error('Что-то пошло не так. Попробуйте снова.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container">
      <div className="background-overlay"></div>
      <h1 className="title">Приглашение на нашу свадьбу!</h1>
      <p className="subtitle">Дорогие друзья, мы рады пригласить вас на наше торжество!</p>

      <div className="info-section">
        <div className="info-item">
          <span className="icon">💍</span>
          <div>
            <h3>Регистрация в ЗАГСе</h3>
            <p>5 июля 2025, 16:10<br />ул. Голодеда, 10, ЗАГС Заводского района</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">🥂</span>
          <div>
            <h3>Банкет</h3>
            <p>5 июля 2025, 17:30<br />Ресторан "У дороги", ул. Выдуманная, 228</p>
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

      <h2 className="form-title">Подтвердите ваше присутствие</h2>
      <form onSubmit={handleSubmit} className="wedding-form">
        <label htmlFor="name">Ваше имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="guests">Количество гостей:</label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          required
          className="form-input"
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
          className="form-input"
        />

        <label htmlFor="comments">Дополнительные пожелания:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Ваши пожелания"
          className="form-input form-textarea"
        />

        <button type="submit" className="submit-button">Принять приглашение</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default App;