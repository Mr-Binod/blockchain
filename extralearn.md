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

- DTO : Data transfer object is used to transfer data between different parts of an application

- from client to server
- controller to service
- backend to frontend

```js

export class UserDTO {
    constructor({ name, email, age }) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
}

import { UserDTO } from './UserDTO.js';

app.post('/users', (req, res) => {
    const userDto = new UserDTO(req.body);
    
    // Pass only validated/structured data to the service
    userService.createUser(userDto);
    
    res.status(201).send('User created');
});

```

- DAO :  data access object is design pattern used to abstract and encapsulate all access to datasource (like database or files). it works as a bridge between application logic and your database

```js
// UserDAO.js
import { db } from './db.js'; // a connected Mongo client

export class UserDAO {
    static async findById(id) {
        return await db.collection('users').findOne({ _id: id });
    }

    static async create(user) {
        return await db.collection('users').insertOne(user);
    }

    static async deleteByEmail(email) {
        return await db.collection('users').deleteOne({ email });
    }
}

import { UserDAO } from './UserDAO.js';

export class UserService {
    static async register(userDto) {
        const existing = await UserDAO.findById(userDto.id);
        if (existing) throw new Error('User already exists');
        return await UserDAO.create(userDto);
    }
}

```

- VO : value object is a object which represents a value in yor domain
with a value object we can identiy weather the object has a value we determined or not

```js
export class Money {
    constructor(amount, currency) {
        if (amount < 0) throw new Error('Amount must be positive');
        this.amount = amount;
        this.currency = currency;
        Object.freeze(this);
    }

    equals(other) {
        return other instanceof Money &&
               this.amount === other.amount &&
               this.currency === other.currency;
    }

    toString() {
        return `${this.currency} ${this.amount.toFixed(2)}`;
    }
}

const price = new Money(100, 'USD');
console.log(price.toString()); // USD 100.00

```



5. Express	Apply your knowledge in a lightweight framework
6. NestJS	Use a powerful framework for production apps
7. TypeORM