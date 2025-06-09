Step	Goal
1. RESTful API	Learn API design principles
2. Node.js	Master async programming and the event loop
3. OOP	Use classes and structure your code
- encapsulation : binding class and function in as one 
- abstraction : visible only the method or variables which can be accessed from outside 
```js
function Circle(radius) {
    this.radius = radius;
    let count = 1
    let increment = (factor) => {
        const result = factor + 1
    }
    this.draw = () => {
        const new_result = increment(1)
        return new_result b
    }
}

const circle = new circle(10)
circle.draw()
```
 inheritance and polymorphism
 
4. Architecture	Understand  IOC, DI, DTO, DAO, VO

- IOC : inversion of control is a flow of a program where the framework or a library calls our code rather than we call the code
```js

// traditional pattern

const database = new MySQLDatabase();
const userRepo = new UserRepository(database)
userRepo.save('user')

// we just pass the datas and the library or the framework processes the data using our codes and returns the result 
// IOC pattern


```
- DI : dependency injection is a design pattern used to implement IOC by injecting dependencies (other objects or services) into a class from outside.
```js
const database = new MySQLDatabase();
const userRepo = new UserRepository(database)
userRepo.save('user')

const map = (list, d,  fn) => {
    const newList = []
    for (const item of list){
        console.log(item, d)
        newList.push(fn(item, d))
    } 
    return newList
}

const prices = [100, 200, 300, 400]
const d = 25
const round2 = (n, d) => ("$ " + (Math.floor(n - (n * (d/100)))))

const formattedPrices = map(prices, d, round2)
console.log(formattedPrices)

```

5. Express	Apply your knowledge in a lightweight framework
6. NestJS	Use a powerful framework for production apps
7. TypeORM