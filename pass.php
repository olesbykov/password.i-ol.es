<?php
// Файл не используется
// На него можно направить запрос и получить ответ
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $length = $_POST["length"];
    $includeNumbers = isset($_POST["numbers"]);
    $includeUppercase = isset($_POST["uppercase"]);
    $includeLowercase = isset($_POST["lowercase"]);
    $includeSpecialChars = isset($_POST["specialChars"]);
    $similarToWord = $_POST["similarToWord"];
    $similarToNumber = $_POST["similarToNumber"];

    $password = "";

    // Генерация пароля в соответствии с выбранными требованиями
    for ($i = 0; $i < $length; $i++) {
        $charType = mt_rand(0, 3);

        if ($charType === 0 && $includeNumbers) {
            $password .= getRandomNumber();
        } elseif ($charType === 1 && $includeUppercase) {
            $password .= getRandomUppercaseLetter();
        } elseif ($charType === 2 && $includeLowercase) {
            $password .= getRandomLowercaseLetter();
        } elseif ($charType === 3 && $includeSpecialChars) {
            $password .= getRandomSpecialChar();
        } else {
            $i--; // Если ни один из требуемых типов символов не выбран, повторяем итерацию
        }
    }

    // Если выбрана опция "Похоже на заданное слово"
    if ($similarToWord !== "") {
        $password = makePasswordSimilarToWord($password, $similarToWord);
    }

    // Если выбрана опция "Похоже на заданный номер"
    if ($similarToNumber !== "") {
        $password = makePasswordSimilarToNumber($password, $similarToNumber);
    }

    // Вывод сгенерированного пароля
    echo "Сгенерированный пароль: " . $password;
}

// Функция для генерации случайного числа
function getRandomNumber()
{
    return mt_rand(0, 9);
}

// Функция для генерации случайной заглавной буквы
function getRandomUppercaseLetter()
{
    return chr(mt_rand(65, 90));
}

// Функция для генерации случайной строчной буквы
function getRandomLowercaseLetter()
{
    return chr(mt_rand(97, 122));
}

// Функция для генерации случайного специального символа
function getRandomSpecialChar()
{
    $specialChars = "!@#$%^&*()";
    $randomIndex = mt_rand(0, strlen($specialChars) - 1);
    return $specialChars[$randomIndex];
}

// Функция для создания пароля, похожего на заданное слово
function makePasswordSimilarToWord($password, $word)
{
    $similarPassword = "";
    $wordLength = strlen($word);

    for ($i = 0; $i < strlen($password); $i++) {
        $char = $password[$i];
        $index = $i % $wordLength;
        $similarChar = getSimilarMnemonicChar($char);

        if ($similarChar === null) {
            $similarChar = $word[$index];
        }

        $similarPassword .= $similarChar;
    }

    return $similarPassword;
}

// Функция для получения похожего мнемонического символа
function getSimilarMnemonicChar($char)
{
    $similarChars = array(
        "a" => "4",
        "b" => "8",
        "e" => "3",
        "g" => "9",
        "i" => "1",
        "l" => "1",
        "o" => "0",
        "s" => "5",
        "t" => "7",
        "z" => "2"
    );

    return $similarChars[strtolower($char)] ?? null;
}

// Функция для создания пароля, похожего на заданный номер
function makePasswordSimilarToNumber($password, $number)
{
    $similarPassword = "";
    $numberAsString = strval($number);

    for ($i = 0; $i < strlen($password); $i++) {
        $char = $password[$i];
        $index = $i % strlen($numberAsString);
        $similarChar = $numberAsString[$index];

        $similarPassword .= $similarChar;
    }

    return $similarPassword;
}
