import { postData } from "../services/services";

const form = () => {
  const mainForm = document.querySelector('form'),
        inputs = mainForm.querySelectorAll('input'),
        textArea = mainForm.querySelector('textarea');
  
  function clearInputs() {
    inputs.forEach((input) => {
      input.value = '';
    });
    textArea.value = '';
  }

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Упс! Что-то пошло не так",
    spinner: "assets/images/spinner.gif",
    ok: "assets/images/ok.png",
    fail: 'assets/images/fail.png'
  };

  // Submit Event on Form
  mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.style.cssText = `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;
    (mainForm.parentNode).insertAdjacentElement('afterbegin', statusMessage);

    mainForm.classList.add('animated', 'fadeOutUp');
    setTimeout(() => {
      mainForm.style.display = 'none';
    }, 400);

    let statusImg = document.createElement('img');
    statusImg.setAttribute('src', message.spinner);
    statusImg.classList.add('animated', 'fadeInUp');
    statusMessage.append(statusImg);

    let statusText = document.createElement('div');
    statusText.textContent = message.loading;
    statusMessage.append(statusText);

    const formData = new FormData(mainForm);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
    postData('http://localhost:3000/requests', json)
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
        mainForm.style.display = 'block';
        mainForm.classList.remove('fadeOutUp');
        mainForm.classList.add('fadeInUp');
      }, 5000);
    });
  });
};

export default form;
