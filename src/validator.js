const validator = {
  maskify:function (cardNumber) {
    // Substitui todos os dígitos, exceto os últimos 4, por '#'.
    const maskedDigits = cardNumber.slice(0, -4).replace(/\d/g, '#');
    // Seleciona os últimos 4 dígitos do número do cartão de crédito.
    const visibleDigits = cardNumber.slice(-4);
    // Retorna a concatenação dos dígitos mascarados e dos últimos 4 dígitos visíveis.
    return maskedDigits + visibleDigits;
  },
  isValid: function isValid(cardNumber) {
    // Remove todos os caracteres não numéricos do número do cartão.
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');
    // Inicializa a variável "sum" com 0 para calcular a soma dos dígitos.
    let sum = 0;
    // Indica se o dígito atual é o segundo dígito a ser processado.
    let isSecondDigit = false;
  
    // Itera através dos dígitos do número do cartão de crédito, começando do último dígito.
    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
      // Converte o dígito atual em um número inteiro.
      let digit = parseInt(cleanedCardNumber.charAt(i));
  
      // Verifica se o dígito atual deve ser multiplicado por 2.
      if (isSecondDigit) {
        digit *= 2;
  
        // Se o resultado da multiplicação for maior ou igual a 10, soma os dígitos individualmente.
        if (digit >= 10) {
          digit = digit.toString();
          digit = parseInt(digit.charAt(0)) + parseInt(digit.charAt(1));
        }
      }
  
      // Adiciona o dígito (ou a soma dos dígitos, no caso de multiplicação por 2) à variável "sum".
      sum += digit;
      // Alterna a flag "isSecondDigit" para indicar o próximo dígito.
      isSecondDigit = !isSecondDigit;
    }
  
    
  
    // Retorna um objeto com a validade do número do cartão e o número mascarado.
    return  sum % 10 === 0;
  }

}

export default validator;
  
  
