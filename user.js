const { pool } = require('./config');

const intialize = () => {
    pool.query(`CREATE TABLE users (
        id serial,
        first_name varchar(50) not null,
        last_name varchar(100) not null,
        age integer not null,
        email varchar(100) not null,
        created_date date default now()
      )`, (error, results) => {
        if (error) {
            console.log(error)
        }
        else {
            for (let i = 0; i < 10; i++) {
                pool.query('INSERT INTO users (first_name, last_name, email, age) VALUES ($1, $2, $3, $4) RETURNING *', ["test", "init", "func", 4], (error, results) => {
                    if (error) {
                        throw error
                    }
                })
            }

        }
    })
}

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.render('users', { users: results.rows })

    })
}
//add a User
const createUser = (request, response) => {
    const { first, last, email, age } = request.body
    pool.query('INSERT INTO users (first_name, last_name, email, age) VALUES ($1, $2, $3, $4) RETURNING *', [first, last, email, age], (error, results) => {
        if (error) {
            throw error
        }
        //console.log(` ${results.rows[0].id}`);
        response.redirect("/users")
    })
}

const deleteUser = (req, res) => {
    const id = req.params.id
    console.log(id);
    pool.query('delete from users where id = ($1)', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('/users');
    })
}

const findUser = (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM users WHERE id = ($1)', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.render('edit', { user: results.rows[0] });
    })
}

const updateUser = (req, res) => {
    const id = req.params.id
    const { first, last, email, age } = req.body
    pool.query('UPDATE users SET first_name = ($1), last_name = ($2), email = ($3), age = ($4) WHERE id = ($5)', [first, last, email, age, id], (error, results) => {
        if (error) {
            throw error
        }
        res.redirect('/users');
    })

}

const sortUsers = (req, res) => {
    const field = req.params.field
    const order = req.params.order

    let query = `SELECT * FROM users ORDER BY ${field} ${order}`

    console.log(req.params)
    pool.query( query, (error, results) => {
        if(error) {
            throw error;
        }
        res.render('users', {users: results.rows})
    })
}

const searchUser = (req, res) => {
    const {first, last} = req.body
    let query = ""
    let params = []
    if(first && last){
        query = `SELECT * FROM users WHERE first_name = ($1) AND last_name = ($2)`
        params = [first, last]
    }
    else if(first){
        query = `SELECT * FROM users WHERE first_name = ($1)`
        params = [first]
    }
    else if(last){
        query = `SELECT * FROM users WHERE last_name = ($1)`
        params = [last]
    }
    else{
        query = `SELECT * FROM users`
    }
    
    pool.query(query, params, (error, results) => {
        if(error){
            throw error
        }
        res.render('users', {users: results.rows})
    })
}
module.exports = {
    intialize,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    findUser,
    sortUsers,
    searchUser
    // getUserByAuthor   
}