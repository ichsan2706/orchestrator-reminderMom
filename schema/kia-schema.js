const { gql } = require('apollo-server');
const axios = require('axios')

// axios.defaults.baseURL = `http://localhost:4002`

const typeDefs = gql`
    type Children {
        id:ID,
        name: String,
        nik: String,
        pob: String,
        dob: String,
        weight: String,
        height: String,
        headCirc: String,
        gender: String,
        status: String,
        id_parent:String
    }

    type Message {
        message:String
        status:Int
    }

    type Query {
        getChildrens(id_parent:String): [Children]
    }

    type Mutation {
        addChildren(name:String, nik:String, pob:String, dob:String, weight: String, height: String, headCirc: String, gender: String, status: String, id_parent:String): Message
    }
`

const resolvers = {
    Query: {
        getChildrens: async (_, args) => {
            try {
                let { data: childrens } = await axios.get('http://localhost:4002/children/'+args.id_parent)
                return childrens.result
            } catch (error) {
                return error
            }
        }
    },
    Mutation: {
        addChildren: async (_, args) => {
            try {
                const { name, nik, pob, dob, weight, height, headCirc, gender, status, id_parent } = args
                const { data: children } = await axios.post('http://localhost:4002/children/', {
                    name, nik, pob, dob, weight, height, headCirc, gender, status, id_parent
                })
                return { message: "success add children", status: 201 }
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