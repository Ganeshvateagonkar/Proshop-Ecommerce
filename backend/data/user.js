import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin123@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true

    },
    {
        name: 'ganesh User',
        email: 'ganesh123@gmail.com',
        password: bcrypt.hashSync('123456', 10),


    },
    {
        name: 'vaibhav User',
        email: 'vaibhav123@gmail.com',
        password: bcrypt.hashSync('123456', 10),


    },
]
export default users;