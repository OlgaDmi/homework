/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
    
}

// function getArr(value, indx, array) {
//     return ` Массив ${array} с индексом ${indx} и значением ${value} `;
// }

// forEach([1, 5, 6], getArr);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) { 
        const newResult = fn(array[i], i, array);

        newArray.push(newResult);
    }

    return newArray;
}

// function getArrMap(value, indx, array) {
//     return ` Массив ${array} с индексом ${indx} и значением ${value} `;
// }

// map(['Apple', 'Orange', 'Banana'], getArrMap);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var indxFirst;

    initial ? indxFirst = 0 : (initial = array[0], indxFirst = 1);

    for (let i = indxFirst; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
    }

    return initial;
}

// function sum(initial, value) {
//     return value + initial;
// } 

// reduce([1, 2, 3, 4], sum, 5);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    var newArr = [];

    for (let key in obj) {
        const upKey = key.toUpperCase();

        newArr.push(upKey);
    }

    return newArr;
}

// upperProps({ name: 'Сергей', lastName: 'Петров' })

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArray1 = [];

    if (from === undefined || -from > array.length) {
        from = 0;
    } else if (from < 0) {
        from = array.length + from;
    }

    if (to === undefined || to > array.length) {
        to = array.length;
    } else if (to < 0) {
        to = array.length + to;
    }

    for (let i = from; i < to; i++) { 
        newArray1.push(array[i]);
    }
    
    return newArray1;
}

// slice(['брюки', 'топ', 'джинсы', 'колготки', 'пиджак'], -3, -1);

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */

function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, val) {
            return target[prop] = val ** 2;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
