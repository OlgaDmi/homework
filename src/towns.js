/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

function loadTowns() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';

        xhr.onload = function() {
            if (this.status == 200) {
                cities = this.response;

                cities.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                });
                resolve(cities);
            } else {
                reject();
            }
        };

        xhr.onerror = function() {
            reject(new Error('Network Error'));
        };

        xhr.send();
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0) {
        return true;
    } 

    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
let cities = [];

function addTowns(cities) {
    filterResult.textContent = '';
    let searchPhrase = filterInput.value;
    let fragment = document.createDocumentFragment();

    for (const city of cities) {
        if (filterInput.value != '' && isMatching(city.name, searchPhrase)) {
            let p = document.createElement('p');

            p.textContent = city.name;
            fragment.appendChild(p);
        }
    }
    filterResult.appendChild(fragment);
}

function load() {
    loadTowns().then((data => {
        cities = data;
        filterBlock.style.display = 'block';
        loadingBlock.style.display = 'none';
        
    }))
        .catch(() => {
            let errorBlock = document.createElement('p');
            
            errorBlock.textContent = 'Не удалось загрузить города';
            homeworkContainer.appendChild(errorBlock);
            const reloadBrn = document.createElement('button');

            reloadBrn.innerText = 'Повторить';
            reloadBrn.addEventListener('click', load);
            homeworkContainer.appendChild(reloadBrn);
        });
}

load();

filterInput.addEventListener('keyup', function() {
    addTowns(cities);
});
