// Importa a função validateCreditCardNumber do arquivo './validator.js'.
import validator from './validator.js';

// Seleciona o elemento <form> do documento HTML.
const form = document.querySelector('form');
// Seleciona o elemento de entrada de número do cartão de crédito pelo ID 'credit-card'.
const cardNumberInput = document.getElementById('credit-card');
// Seleciona o elemento de contêiner de resultado pelo ID 'result'.
const resultContainer = document.getElementById('result');

// Adiciona um ouvinte de evento para o evento 'submit' no formulário.
form.addEventListener('submit', (event) => {
  // Previne o comportamento padrão do formulário (envio da página).
  event.preventDefault();

  // Obtém o valor do número do cartão de crédito do campo de entrada.
  const cardNumber = cardNumberInput.value;

  // Verifica se o número do cartão está em branco ou contém apenas espaços.
  if (cardNumber.trim() === '') {
    // Exibe uma mensagem de erro no contêiner de resultado.
    resultContainer.textContent = 'Por favor, insira um número de cartão de crédito válido.';
    // Adiciona a classe 'error' ao contêiner para estilização específica de erro.
    resultContainer.classList.add('error');
    // Encerra a execução da função.
    return;
  }

  // Chama a função validateCreditCardNumber para validar o número do cartão.
  // A função retorna um objeto com as propriedades "isValid" e "maskedCardNumber".
  const isValid = validator.isValid(cardNumber);

  // Verifica se o número do cartão é válido.
  if (isValid) {
    // Exibe uma mensagem de sucesso com o número do cartão mascarado no contêiner de resultado.
    resultContainer.textContent = `O número do cartão de crédito é válido: ${validator.maskify(cardNumber)}`;
    // Remove a classe 'error' do contêiner para limpar a estilização de erro, se estiver presente.
    resultContainer.classList.remove('error');
  } else {
    // Exibe uma mensagem de erro no contêiner de resultado.
    resultContainer.textContent = 'O número do cartão de crédito é inválido.';
    // Adiciona a classe 'error' ao contêiner para estilização específica de erro.
    resultContainer.classList.add('error');
  }
});
