import validator from './validator.js';

const form = document.querySelector('form');
const cardNumberInput = document.getElementById('credit-card');
const cvvInput = document.getElementById('cvv');
const cardNameInput = document.getElementById('card-name');
const expirationDateInput = document.getElementById('expiration-date');
const resultContainer = document.getElementById('result');

// Event listener para quando o formulário for enviado
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o envio tradicional do formulário

  // Obter os valores dos campos do formulário
  const cardNumber = cardNumberInput.value;
  const cvv = cvvInput.value;
  const cardName = cardNameInput.value;
  const expirationDate = expirationDateInput.value;

  // Verificar se o número do cartão é válido
  if (!/^\d{13,19}$/.test(cardNumber)) {
    resultContainer.textContent = 'Por favor, insira um número de cartão de crédito válido.';
    resultContainer.classList.add('error');
    return;
  }

  // Verificar se o CVV é válido
  if (!/^\d{3,4}$/.test(cvv)) {
    resultContainer.textContent = 'Por favor, insira um CVV válido.';
    resultContainer.classList.add('error');
    return;
  }

  // Verificar se o nome no cartão é válido
  if (!/^[a-zA-Z\s]+$/.test(cardName)) {
    resultContainer.textContent = 'Por favor, insira um nome no cartão válido.';
    resultContainer.classList.add('error');
    return;
  }

  // Verificar se a data de expiração é válida (MM/AA)
  if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
    resultContainer.textContent = 'Por favor, insira uma data de expiração válida (MM/AA).';
    resultContainer.classList.add('error');
    return;
  }

  // Verificar se o número do cartão é válido usando o módulo importado "validator"
  const isValid = validator.isValid(cardNumber);

  // Exibir resultado com base na validade do cartão
  if (isValid) {
    resultContainer.textContent = `O número do cartão de crédito é válido: ${validator.maskify(cardNumber)}`;
    resultContainer.classList.remove('error');
  } else {
    resultContainer.textContent = 'O número do cartão de crédito é inválido.';
    resultContainer.classList.add('error');
  }
});

// Event listener para formatar o campo do número do cartão à medida que é digitado
cardNumberInput.addEventListener('input', () => {
  cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '');
});

// Event listener para formatar o campo do CVV à medida que é digitado
cvvInput.addEventListener('input', () => {
  cvvInput.value = cvvInput.value.replace(/\D/g, '');
});

// Event listener para permitir somente letras e espaços no campo do nome do cartão
cardNameInput.addEventListener('input', () => {
  cardNameInput.value = cardNameInput.value.replace(/[^a-zA-Z\s]/g, '');
});

// Event listener para formatar o campo da data de expiração à medida que é digitado
expirationDateInput.addEventListener('input', () => {
  expirationDateInput.value = expirationDateInput.value.replace(/\D/g, '');
});

// Event listener para formatar o campo da data de expiração com a máscara "MM/AA"
expirationDateInput.addEventListener('input', (event) => {
  const input = event.target;
  const { value } = input;
  const digitsOnly = value.replace(/\D/g, '');
  const formattedValue = formatExpirationDate(digitsOnly);
  input.value = formattedValue;
});

// Função para formatar a data de expiração em "MM/AA"
function formatExpirationDate(value) {
  const month = value.slice(0, 2);
  const year = value.slice(2, 4);

  if (value.length <= 2) {
    return month;
  } else {
    return `${month}/${year}`;
  }
}
