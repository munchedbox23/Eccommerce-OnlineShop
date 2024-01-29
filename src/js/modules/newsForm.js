import { postData } from "../services/services";

const newsForm = () => {
  const newsMailing = document.querySelectorAll('.news__form');

  function clearInputs() {
    newsMailing.forEach((news) => {
      news.querySelector('input').value = '';
    });
  }

  const message = {
    loading: 'Отправка',
    success: 'Поздравляю! Вы успешно подписались на рассылку новостей',
    failure: 'Упс! Что-то пошло не так',
    spinner: "assets/images/spinner.gif",
    ok: "assets/images/ok.png",
    fail: 'assets/images/fail.png'
  };

  newsMailing.forEach((newsForm) => {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.style.cssText = `
        display: flex;
        gap: 15px;
        justify-content: center;
        align-items: center;
      `;
  
      (newsForm.parentNode).appendChild(statusMessage);
  
      newsForm.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        newsForm.style.display = 'none';
      }, 400);
  
      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.append(statusImg);
  
      let statusText = document.createElement('div');
      statusText.style.cssText = `
        color: #fff;
        font-size: 1rem;
        font-weight: 700;
      `;
      statusText.textContent = message.loading;
      statusMessage.append(statusText);
  
      const formData = new FormData(newsForm);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
      postData('http://localhost:3000/mailing', json)
      .then((data) => {
        console.log(data);
        statusImg.src = message.ok;
        statusText.textContent = message.success;
      })
      .catch((e) => {
        statusImg.src = message.fail;
        statusText.textContent = message.failure;
      })
      .finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
          newsForm.style.display = 'flex';
          newsForm.classList.remove('fadeOutUp');
          newsForm.classList.add('fadeInUp');
        }, 5000);
      });
    });
  });
};

export default newsForm;
