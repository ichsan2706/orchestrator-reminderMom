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

    type Pregnant {
        status:String,
        id_parent:String,
        lastMens:String
    }

    type Message {
        message:String
        status:Int
    }

    type Query {
        getTips: [Tips]
        detailTips(phase: String): Tips
        getChildrens(id_parent:String): [Children]
        getMedicalRecordPerChild(id_children: Int):[MedicalRecord]
        getAllMedicalRecords:[MedicalRecord]
        getTreatments(id_children:String):Treatment
        getAllTreatments:[Treatment]
        getAllPregnants:[Pregnant]
        getPregnantPerParent(id_parent:String):Pregnant
    }

    type Mutation {
        addChildren(name:String, nik:String, pob:String, dob:String, weight: String, height: String, headCirc: String, gender: String, status: String, id_parent:String): Message
        addMedicalRecord(id_children:String, id_treatment:String, id_midwife: String, place:String, height: String, weight: String, headCirc: String, note: String): Message
        addPregnant(id_parent:String, lastMens:String): Message
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
        getTreatments: async (_, args) => {
            try {
                let { data: treatments } = await axios.get(`http://localhost:4002/treatment/${args.id_children}`)
                return treatments
            } catch (error) {
                return error
            }
        },
        getAllTreatments: async () => {
            try {
                let { data: treatments } = await axios.get(`http://localhost:4002/treatment/`)
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
        },
        getAllMedicalRecords: async () => {
            try {
                let { data: medicalRecords } = await axios.get(`http://localhost:4002/medicalRecord/`)
                return medicalRecords.result
            } catch (error) {
                return error
            }
        },
        getAllPregnants: async () => {
            try {
                let { data: Pregnants } = await axios.get(`http://localhost:4002/pregnant/`)
                return Pregnants.result
            } catch (error) {
                return error
            }
        },
        getPregnantPerParent: async (_, args) => {
            try {
                let { data: Pregnant } = await axios.get(`http://localhost:4002/pregnant/${args.id_parent}`)
                return Pregnant.result
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
        },
        addMedicalRecord: async (_, args) => {
            try {
                const { id_children, id_treatment, id_midwife, place, height, weight, headCirc, note } = args
                const { data: medicalRecord } = await axios.post('http://localhost:4002/medicalRecord/', {
                    id_children, id_treatment, id_midwife, place, height, weight, headCirc, note
                })
                return { message: "success add medical record", status : 201}
            } catch (error) {
                return error
            }
        },
        addPregnant: async (_, args) => {
            console.log(args);
            try {
                const { id_parent, lastMens } = args
                const { data: pregnant } = await axios.post(`http://localhost:4002/pregnant/`, {
                    id_parent, lastMens, status:'janin'
                })
                return { message: "success add Pregnant", status : 201}
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