/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

let arrNumbers = [1, 5, 6];

function forEach(array, fn) {
    
    for(let i = 0; i < array.length; i++){
        
        const result = fn(array[i], i, array);
        
        console.log(result);
    }
}

function getArr(value, indx, array){

    for (let i = 0; i < array.length; i++) {
        
        var result = fn(array[i], i, array);
        
    }

    return result;

}

function getArr(value, indx, array) {

    return ` Массив ${array} с индексом ${indx} и значением ${value} `;
    
}

forEach(arrNumbers, getArr);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */

var fruits = ['Apple', 'Orange', 'Banana'];

function map(array, fn) {

    let newArray = [];

    for (let i = 0; i < array.length; i++) { 
        
        const newResult = fn(array[i], i, array);

        newArray.push(newResult);
    }

    return newArray;
}

function getArrMap(value, indx, array) {

    return ` Массив ${array} с индексом ${indx} и значением ${value} `;
    
}

map(fruits, getArrMap);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

var someNumbers = [1, 2, 3, 4];

function reduce(array, fn, initial = array[0]) {

    for (let i = 0; i < array.length; i++) {

        initial = fn(initial, array[i], i, array);

    }

    return initial;
}

function sum(initial, value, indx, array) {

    return value + initial;
} 

reduce(someNumbers, sum, 5);

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

upperProps({ name: 'Сергей', lastName: 'Петров' })

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */

var cloth = ['брюки', 'топ', 'джинсы', 'колготки', 'пиджак'];

function slice(array, from, to = array.length) {

    let newArray1 = [];

    if (from < 0) {

        from = array.length + from;

    }

    if (to < 0) {

        to = array.length + to;
    }

    for (let i = from; i < to; i++) { 
    
        newArray1.push(array[i]);

    }
    
    return newArray1;

}

slice(cloth, -3, -1);

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */

let garage = {
    cars: 4,
    scooters: 1
};

function createProxy(obj) {

    obj = new Proxy(obj, {
        
        set(obj, prop, val) { 
    
            val = Math.pow(val, 2);
 
            return val;

        }
        
    });

    return obj;        

}

createProxy(garage);

garage.cars = 5;

garage.scooters = 6;

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
