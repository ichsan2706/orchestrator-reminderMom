const { gql } = require('apollo-server');
const axios = require('axios')

axios.defaults.baseURL = `http://localhost:4001`

const typeDefs = gql`

    type Parent {
        _id: ID,
        name: String,
        nik: String,
        pob: String,
        dob: String,
        email: String,
        address: String,
        gender: String,
        phoneNumber: String
    }

    type Query {
        getParents: [Parent]
        checkParent(email:String): Parent
    }
`

const resolvers = {
    Query: {
        getParents: async () => {
            try {
                let { data: parents } = await axios.get('/')
                return parents
            } catch (error) {
                return error
            }
        },
        checkParent: async (_, args) => {
            try {
                console.log(args);
                const { data: parent } = await axios.get('/checkLogin/' + args.email)
                return parent
            } catch (error) {
                console.log(error);
            }
        }
    }
}


module.exports = {
    typeDefs,
    resolvers
}