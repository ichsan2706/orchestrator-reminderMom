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
        address: String,
        gender: String,
        phoneNumber: String
    }

    type Query {
        getParents: [Parent]
    }
`

const resolvers = {
    Query: {
        getParents: async () => {
            try {
                let {data:parents} = await axios.get('/')
                return parents
            } catch (error) {
                return error
            }
        }
    }
}


module.exports = {
    typeDefs,
    resolvers
}