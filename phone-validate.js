class PhoneValidate {

  constructor({ phoneValidatMess }) {
    this.phoneValidatMess = phoneValidatMess;
  }

  addInput = (input) => {
    const wrapper = document.createElement('span');
    const wrapperInput = document.createElement('span');

    wrapper.classList.add('phone-validate__wrap');
    wrapperInput.classList.add('phone-validate');
    input.parentNode.insertBefore(wrapperInput, input);
    wrapperInput.appendChild(input);
    input.setAttribute('maxlength', 25);
    input.setAttribute('placeholder', '');

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    wrapper.insertAdjacentHTML('afterend', this._iconCheckValidate());
    input.insertAdjacentHTML('afterend', this._errorTemplate());

    input.value = '+7';

    input.addEventListener('input', this._addValidate);
  }

  _errorTemplate = () => {
    return `<span class="phone-validate__error"></span>`;
  }

  _iconCheckValidate = () => {
    return `<svg class="phone-validate__icon" viewBox="0 0 78.369 78.369" xmlns="http://www.w3.org/2000/svg"><path d="M78.049 19.015L29.458 67.606a1.094 1.094 0 01-1.548 0L.32 40.015a1.094 1.094 0 010-1.547l6.704-6.704a1.095 1.095 0 011.548 0l20.113 20.112 41.113-41.113a1.095 1.095 0 011.548 0l6.703 6.704a1.094 1.094 0 010 1.548z"/></svg>`;
  }

  wrapCreate = html => {
    const popupWrap = document.createElement('div');
    popupWrap.insertAdjacentHTML('beforeend', html);

    return popupWrap;
  }

  _addValidate = (event) => {
    const target = event.target;
    const strArray = target.value.split('');
    const strValidate = strArray.filter((symbol) => symbol.match(/\d/));
    const errorBlock = target.nextSibling;
    const icon = target.closest('.phone-validate').querySelector('.phone-validate__icon');

    if(strValidate.length === 11 && +strValidate[0] === 8) {
      strValidate.splice(0, 0, '7');
    }

    if(strValidate.length > 11 && +strValidate[1] === 8) {
      strValidate.splice(1, 1);
    }

    if(strValidate.length < 12) {
      if(strValidate.length > 11 && +strValidate[0] === 8 && +strValidate[1] === 9) {
        strValidate.splice(0, 1);
        strValidate.splice(0, 0, '7');
      }

      if(strValidate[0] !== '+' && strValidate.length > 0) {
        strValidate.unshift('+');
      }

      if(strValidate.length > 2) {
        strValidate.splice(2, 0, ' (');
      }

      if(strValidate.length > 6) {
        strValidate.splice(6, 0, ') ');
      }

      if(strValidate.length > 10) {
        strValidate.splice(10, 0, '-');
      }

      if(strValidate.length > 13) {
        strValidate.splice(13, 0, '-');
      }

      errorBlock.classList.add('phone-validate__error_is_active');
      errorBlock.textContent = this.phoneValidatMess.number11;
      errorBlock.classList.add('phone-validate__error_is_active');
    } else {
      errorBlock.classList.add('phone-validate__error_is_active');
      errorBlock.textContent = this.phoneValidatMess.checkNumber;
    }

    if(strValidate.length === 16) {
      icon.classList.add('phone-validate__icon_is_active');
      errorBlock.classList.remove('phone-validate__error_is_active');
    } else {
      icon.classList.remove('phone-validate__icon_is_active');
    }

    target.value = strValidate.join('');
  }
}

const phoneValidatMess = {
  number11: 'Номер телефона должен состоять минимум из 11 цифр.',
  checkNumber: 'Убедитесь, что номер телефона введен правильно.'
};

const phoneValidate = new PhoneValidate({ phoneValidatMess });
const formCommonInputPhone = document.querySelector('.form-common__input-phone');

if(formCommonInputPhone) {
  phoneValidate.addInput(formCommonInputPhone);
}
