import React, { useState, useEffect } from 'react'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


import maratImage from './marat-basharov.png'; 

function App() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    drinks: '',
    comments: '',
    attendingRegistration: 'Yes'
  });

  const [showFines, setShowFines] = useState(false); 

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
    form.append('attendingRegistration', formData.attendingRegistration);

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbyuWQgNVQ3mFwQYLCo3F12NcLny-q_62kZMa4wpl6ISGCf279mDzu9eR-gFuM2zCuEw/exec',
        {
          method: 'POST',
          body: form,
          mode: 'no-cors' // Оставляем no-cors, так как это работает для Google Apps Script
        }
      );
      toast.success('Спасибо за подтверждение! ❤️', {
        position: 'top-right',
        autoClose: 3000,
      });
      setFormData({ name: '', guests: '1', drinks: '', comments: '' , attendingRegistration:'Yes'});
      setShowFines(true); 
    } catch (error) {
      console.error('Ошибка:', error);
      toast.error('Что-то пошло не так. Попробуйте снова.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  
  useEffect(() => {
    if (showFines) {
      const finesSection = document.getElementById('fines');
      if (finesSection) {
        finesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [showFines]);

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
            <p>5 июля 2025, 16:10<br />ул. Голодеда, 21/1, ЗАГС Заводского района</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">🥂</span>
          <div>
            <h3>Банкет</h3>
            <p>5 июля 2025, 17:00<br />Бизнес-кафе "Ребус", ул. Жилуновича, 11</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">👔</span>
          <div>
            <h3>Дресс-код для мужчин</h3>
            <p>Коктейльный стиль<br />Костюм в классических или пастельных тонах, рубашка, галстук по желанию</p>
          </div>
        </div>
        <div className="info-item">
          <span className="icon">👗</span>
          <div>
            <h3>Дресс-код для женщин</h3>
            <p>Вечерние платья любого цвета<br/>Просим избегать черного и белого цвета.</p>
          </div>
        </div>
      </div>

      {/* Секция с пожеланием вместо букетов */}
      <div className="wishes-section">
        <h2 className="wishes-title">Наше пожелание</h2>
        <p className="wishes-text">
         Будем признательны за альтернативу букетам в форме бутылочки вина или другого приятного напитка и записки о событии, к которому приурочить ее открытие.
        </p>
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

        <label htmlFor="attendingRegistration">Будете ли вы присутствовать на регистрации в ЗАГСе?</label>
        <select
          id="attendingRegistration"
          name="attendingRegistration"
          value={formData.attendingRegistration}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="Yes">Да</option>
          <option value="No">Нет</option>
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

        <label htmlFor="comments">Дополнительные сведения о Вас:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Имена Ваших спутников, наличие каких-либо аллергий и пр."
          className="form-input form-textarea"
        />

        <button type="submit" className="submit-button">Принять приглашение</button>
      </form>

      {/* Секция со штрафами (вне формы) */}
      {showFines && (
        <div className="fines-section" id="fines">
          <h2 className="fines-title">Штрафы за нарушение свадебных традиций</h2>
          <ul className="fines-list">
            <li>За крик "Горько!" на счёт 3 — <span className="fine-amount">5 рублей</span></li>
            <li>За крик "Горько!" на счёт 5 — <span className="fine-amount">10 рублей</span></li>
            <li>За опоздание на тост — <span className="fine-amount">15 рублей</span></li>
            <li>За отказ танцевать с тёщей/свекровью — <span className="fine-amount">20 рублей</span></li>
            <li>За попытку спрятать бутылку под стол — <span className="fine-amount">30 рублей</span></li>
            <li>За крик "Мало!" после поцелуя — <span className="fine-amount">10 рублей</span></li>
            <li>За попытку увести невесту на танец без разрешения жениха — <span className="fine-amount">50 рублей</span></li>
            <li>За громкий храп во время тоста — <span className="fine-amount">40 рублей</span></li>
            <li>За использование телефона во время конкурсов — <span className="fine-amount">15 рублей</span></li>
            <li>За "случайное" падение в торт — <span className="fine-amount">100 рублей</span></li>
            <li>За крик "А где мой подарок?" — <span className="fine-amount">25 рублей</span></li>
            <li>За попытку спеть песню без микрофона — <span className="fine-amount">10 рублей</span></li>
            <li>За пролитый бокал на платье невесты — <span className="fine-amount">200 рублей</span></li>
            
          </ul>
        </div>
      )}

      {/* Надпись и фото Марата Башарова (вне формы) */}
      {showFines && (
        <div className="warning-section">
          <p className="warning-text">Прибыть к назначенному времени, в назначенное место</p>
          <img src={maratImage} alt="Марат Башаров" className="marat-image" />
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;