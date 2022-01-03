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

    type Tips {
        title: String,
        description: String,
        nutrition: String,
        stimulation: String,
        tips: String,
        phase: String
    }

    type MedicalRecord {
        id_children: Int,
        id_treatment: Int,
        id_midwife: Int,
        place:String,
        imgUrl:String,
        height: String,
        weight: String,
        headCirc: String,
        note: String,
        createdAt: String
    }

    type Treatment{
        id:Int,
        name: String,
        description: String,
        month: Int
    }

    type Message {
        message:String
        status:Int
    }

    type Query {
        getTips: [Tips]
        detailTips(phase: String): Tips
        getChildrens(id_parent:String): [Children]
        getTreathment(age: Int):[Treatment]
        getMedicalRecordPerChild(id_children: Int):[MedicalRecord]
        getTreatments:[Treatment]
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
        },
        getTips: async () => {
            try {
                let {data: tips} = await axios.get(`http://localhost:4002/tips`)
                return tips
            } catch (error) {
                return error
            }
        },
        detailTips: async (_, args) => {
            try {
                let {data: tip} = await axios.get(`http://localhost:4002/tips/${args.phase}`)
                return tip
            } catch (error) {
                return error
            }
        },
        getTreathment: async (_, args) => {
            try {
                let { data: treathment } = await axios.get(`http://localhost:4002/treatment/${args.age}`)
                return treathment
            } catch (error) {
                return error
            }
        },
        getTreatments: async () => {
            try {
                let { data: treatments } = await axios.get(`http://localhost:4002/treatment`)
                return treatments.result
            } catch (error) {
                return error
            }
        },
        getMedicalRecordPerChild: async (_, args) => {
            try {
                let { data: medicalRecord } = await axios.get(`http://localhost:4002/medicalRecord/${args.id_children}`)
                return medicalRecord.result
            } catch (error) {
                return error
            }
        }
    },
    Mutation: {
        addChildren: async (_, args) => {
            try {
                console.log(args);
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