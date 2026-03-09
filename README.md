1. What is the difference between var, let, and const?

Answer: var, let,const are used to declar a variable. var is function-scoped.  It allows re-declaration and reassignment in the same scope. var can trigared bugs. because it can me access before declared.

The let was introduce in ES6. ES6 is now the latest vertion of JS. And the let is a Block scoped, that it will only work where it declared.

The const, is also a block scoped. but it different from let. we cant reassign value in it. we can only reasign values in let.

let and const are best to use, because thay dont triggred any bug and we can access it when we had declared.

2. What is the spread operator (...)?

Answer: The spread operator (...) is used spread or expand elements of array, object. it likes opening a box and spread its goods.

Ex: 
const numbers = [1, 2, 3];

console.log(...numbers);

Output: 1 2 3

Using spread operator we can copy an Array, merge multiple array, and pass value in an function.

3. What is the difference between map(), filter(), and forEach()?

Answer: The map(), filter(), and forEach() are used in JS for loop through in array. but they behabe differently when we used them.

forEach(): The forEach() function runs for every Element in an array, but it dose not return any new array.
Ex:
const numbers = [1, 2, 3];

numbers.forEach(function(num) {
  console.log(num * 2);
});

Output: 
2
4
6

map(): map() creates a new array by modifying each element.

Ex:

const number = [1, 2, 3]

const double = number.map(function(num)){
    return * 2;
}
console.log(double)

Output: [2, 4, 6]

filter(): filter() creates a new array containing only those that passes a condition.

Ex:

const numbers = [1, 2, 3, 4, 5];

const even = numbers.filter(function(num) {
  return num % 2 === 0;
});

console.log(even);

Output: [2, 4]

4. What is an arrow function?

Answer: An Arrow Function is a shorter way to declared a functions in JS using the => syntax.It was introduced in ES6 to make code shorter and cleaner.

Normal function:
function add(a, b) {
  return a + b;
}

arrow function: 
const add = (a, b) => a + b;

5. What are template literals?

Answer: Template Literals are a feature in JS that allow us to create strings more easily, especially when adding variables or writing multi-lines of text. it was also introduce in ES6.

Ex:

Normal way:
const text = "world!";
const message = "Hello " + text;

console.log(message);

Template literals:
const text = "world!";
const message = `Hello ${text}`;

console.log(message);

