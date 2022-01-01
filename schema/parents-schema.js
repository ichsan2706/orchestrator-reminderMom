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
        address: String,
        gender: String,
        phoneNumber: String
    }

    type Query {
        getParents: [Parent]
        getProfile(email:String): Parent
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
    }
}


module.exports = {
    typeDefs,
    resolvers
}