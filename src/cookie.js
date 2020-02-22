/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function newTrBuild(cookie) {
    if(cookie){
        const tr = listTable.insertRow(0);
        let cookieArr = cookie.split('=');
        
        for (let i = 0; i < 3; i++) {
            const td = tr.insertCell(-1);
        
        if (i != 2) {
            td.innerText = cookieArr[i];
        } else {
            let deleteBtn = document.createElement('button');
        
            deleteBtn.innerText = 'Удалить';
            deleteBtn.addEventListener('click', function(){
            let datePast = new Date(Date.now() - 1000);
            
            datePast = datePast.toUTCString();
            document.cookie = `${cookie};expires=${datePast}`;
            tr.remove();
        });
            td.appendChild(deleteBtn);
        }
        }
    }
}
 
function isMatching(full, chunk) {
    if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0) {
        return true;
    } 
    
    return false;
}

function getAllCookie(cookie) {
    let cookieArr = cookie.split(';');

    for (let i = 0; i < cookieArr.length; i++) {
        newTrBuild(cookieArr[i]);
    }
}

filterNameInput.addEventListener('keyup', function() {
    let isTr = document.querySelector('#list-table tbody tr');
    let filtrValue = filterNameInput.value;
    
    if (isTr != null) {
        if (filtrValue === '') {
            listTable.textContent = '';
            getAllCookie(document.cookie);
        } else { 
            for (let a = 0; a < listTable.children.length; a++) {
                let listName = listTable.children[a].children[0].textContent;
                let listValue = listTable.children[a].children[1].textContent;
                        
                if (isMatching(listName, filtrValue)) {
                    listTable.children[a].style.display = 'table-row';
                } else {
                    listTable.children[a].style.display = 'none';
                }
            }
        }
    }
});
 
addButton.addEventListener('click', () => {
    let nameCookie = addNameInput.value;
    let valueCookie = addValueInput.value;
    let filtrName = filterNameInput.value;
 
    if (nameCookie && valueCookie) {
        let nameFiltrResult = isMatching(nameCookie, filtrName);
        let valueFiltrResult = isMatching(valueCookie, filtrName);
        let cookie = `${nameCookie}=${valueCookie}`;
        let isTd = document.querySelector('#list-table tbody tr td');
        
        if (isTd != null) {
            for (let a = 0; a < listTable.children.length; a++) {
                let isTr = listTable.children[a];
                let listValue = isTr.children[0].textContent;
                
                if (nameCookie === listValue) {
                    if (valueFiltrResult && nameFiltrResult || !valueFiltrResult && nameFiltrResult || valueFiltrResult && !nameFiltrResult) {
                    isTr.children[1].innerText = valueCookie;
                    break;
                    } else {
                        listTable.children[a].remove();
                        break;
                    }
                } else {
                    if (valueFiltrResult && nameFiltrResult || !valueFiltrResult && nameFiltrResult || valueFiltrResult && !nameFiltrResult) {
                        newTrBuild(cookie);
                        document.cookie = `${cookie}`;
                        break;
                    } else {
                        document.cookie = `${cookie}`;
                        break;
                    }
                }
            }
        } 
    else {
        if (valueFiltrResult && nameFiltrResult || !valueFiltrResult && nameFiltrResult || valueFiltrResult && !nameFiltrResult) {
            newTrBuild(cookie);
            document.cookie = `${cookie}`;
        } else {
            document.cookie = `${cookie}`;
        }
    }
}
});