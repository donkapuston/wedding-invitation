import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    drinks: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://script.google.com/macros/s/AKfycbydjBN3m0s1UYJjYogywVA_hROp3gonpEgdSjmJby04uhnU3NQx523x6JMhd07gX_NT/exec', formData);
      setSubmitted(true);
      setFormData({ name: '', guests: '1', drinks: '', comments: '' });
      setTimeout(() => setSubmitted(false), 3000); // Скрыть сообщение через 3 сек
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="container">
      <h1>Приглашение на нашу свадьбу!</h1>
      <p>Дорогие друзья, ждем вас [дата] в [место]. Пожалуйста, заполните форму:</p>
      
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

      {submitted && <p className="success">Спасибо за ответ!</p>}
    </div>
  );
}

export default App;