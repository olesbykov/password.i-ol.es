function generatePassword() {
  var length = document.getElementById("length").value;
  var includeNumbers = document.getElementById("numbers").checked;
  var includeUppercase = document.getElementById("uppercase").checked;
  var includeLowercase = document.getElementById("lowercase").checked;
  var includeSpecialChars = document.getElementById("specialChars").checked;
  //   var similarToWord = document.getElementById("similarToWord").value;
  //   var similarToNumber = document.getElementById("similarToNumber").value;
  similarToWord = "";
  similarToNumber = "";

  // Проверка, что хотя бы один чекбокс выбран
  if (
    !includeNumbers &&
    !includeUppercase &&
    !includeLowercase &&
    !includeSpecialChars
  ) {
    alert("Выберите хотя бы один тип символов для включения в пароль.");
    return; // Прерываем выполнение функции, если ни один чекбокс не выбран
  }

  const minLength = 6;
  const maxLength = 36;

  // Проверка, что длина пароля удовлетворяет условиям
  if (length < minLength || length > maxLength) {
    alert("Длина пароля должна быть от " + minLength + " до " + maxLength + " символов.");
    return; // Прерываем выполнение функции, если условие не выполняется
  }

  var password = "";

  // Генерация пароля в соответствии с выбранными требованиями
  for (var i = 0; i < length; i++) {
    var charType = Math.floor(Math.random() * 4);

    if (charType === 0 && includeNumbers) {
      password += getRandomNumber();
    } else if (charType === 1 && includeUppercase) {
      password += getRandomUppercaseLetter();
    } else if (charType === 2 && includeLowercase) {
      password += getRandomLowercaseLetter();
    } else if (charType === 3 && includeSpecialChars) {
      password += getRandomSpecialChar();
    } else {
      i--; // Если ни один из требуемых типов символов не выбран, повторяем итерацию
    }
  }

  // Если выбрана опция "Похоже на заданное слово"
  if (similarToWord !== "") {
    password = makePasswordSimilarToWord(password, similarToWord);
  }

  // Если выбрана опция "Похоже на заданный номер"
  if (similarToNumber !== "") {
    password = makePasswordSimilarToNumber(password, similarToNumber);
  }

  // Вывод сгенерированного пароля
  document.getElementById("passwordOutput").innerHTML =
    "<div class='greenbox'>Сгенерированный пароль: <span id='password' onclick=\"copyPasswordToClipboard('" +
    password +
    "')\">" +
    password +
    "</span></div>";
}

// Функция для генерации случайного числа
function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

// Функция для генерации случайной заглавной буквы
function getRandomUppercaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Функция для генерации случайной строчной буквы
function getRandomLowercaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Функция для генерации случайного специального символа
function getRandomSpecialChar() {
  var specialChars = "!@#$%^&*()";
  return specialChars[Math.floor(Math.random() * specialChars.length)];
}

// Функция для создания пароля, похожего на заданное слово
function makePasswordSimilarToWord(password, word) {
  var similarPassword = "";
  var wordLength = word.length;

  for (var i = 0; i < password.length; i++) {
    var char = password[i];
    var index = i % wordLength;
    var similarChar = getSimilarMnemonicChar(char);

    if (similarChar === null) {
      similarChar = word[index];
    }

    similarPassword += similarChar;
  }

  return similarPassword;
}

// Функция для получения похожего мнемонического символа
function getSimilarMnemonicChar(char) {
  var similarChars = {
    "a": "4",
    "b": "8",
    "e": "3",
    "g": "9",
    "i": "1",
    "l": "1",
    "o": "0",
    "s": "5",
    "t": "7",
    "z": "2"
  };

  return similarChars[char.toLowerCase()] || null;
}

// Функция для создания пароля, похожего на заданный номер
function makePasswordSimilarToNumber(password, number) {
  var similarPassword = "";
  var numberAsString = number.toString();

  for (var i = 0; i < password.length; i++) {
    var char = password[i];
    var index = i % numberAsString.length;
    var similarChar = numberAsString[index];

    similarPassword += similarChar;
  }

  return similarPassword;
}

function copyPasswordToClipboard(password) {
  //var password = document.getElementById("password").innerText;

  // Создаем временный элемент textarea для копирования пароля в буфер обмена
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = password;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);

  // Создаем уведомление
  var notification = document.createElement("div");
  notification.textContent = "Пароль скопирован: " + password;
  notification.style.position = "fixed";
  notification.style.top = "10px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.padding = "10px 20px";
  notification.style.backgroundColor = "#000";
  notification.style.color = "#fff";
  notification.style.borderRadius = "5px";
  notification.style.zIndex = "9999";
  document.body.appendChild(notification);

  // Удаляем уведомление через 3 секунды
  setTimeout(function () {
    document.body.removeChild(notification);
  }, 3000);
}