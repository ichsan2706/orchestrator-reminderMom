const { gql } = require('apollo-server');
const axios = require('axios')

// axios.defaults.baseURL = `http://localhost:4001`

const typeDefs = gql`

    type Parent {
        _id: ID,
        name: String,
        nik: String,
        pob: String,
        dob: String,
        email: String,
        password: String,
        address: String,
        gender: String,
        phoneNumber: String
    }

    type Message {
        message:String
        status:Int
    }

    type MessageLogin {
        access_token: String,
        profile: Parent,
        status: Int
    }

    input inputLogin {
        email: String,
        password: String
    }

    type Query {
        getParents: [Parent]
        getProfile(email:String): Parent
    }

    type Mutation {
        register(
            name: String, 
            nik: String, 
            pob: String, 
            dob: String, 
            email: String,
            password: String,
            address: String,
            gender: String,
            phoneNumber: String
        ): Message
        loginUser(email: String, password: String) : MessageLogin
    }

`

const resolvers = {
    Query: {
        getParents: async () => {
            try {
                let { data: parents } = await axios.get('http://localhost:4001/')
                return parents
            } catch (error) {
                return error
            }
        },
        getProfile: async (_, args) => {
            try {
                console.log(args);
                const { data: parent } = await axios.get('http://localhost:4001/getProfile/' + args.email)
                return parent
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        register: async (_, args) => {
            try {
                const {name, nik, pob, dob, email, password, address, gender, phoneNumber} = args
                const {data} = await axios.post(`http://localhost:4001/register`, {
                    name, nik, pob, dob, email, password, address, gender, phoneNumber
                })
                return {message: `success register`, status: 201}
            } catch (error) {
                return error
            }
        },
        loginUser: async(_,args) => {
            try {
                const {email, password} = args
                console.log(email, password);
                const { data } = await axios.post(`http://localhost:4001/login`, { email, password })
                console.log(data);
                return {access_token: data.access_token, profile: data.profile, status: 200}
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
}


module.exports = {
    typeDefs,
    resolvers
}