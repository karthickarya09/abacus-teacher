import initializeData from '../database'



const initState = {classrooms:[{cid: 'Class01', acdYear: 2018}, {cid: 'Class02', acdYear: 2018}, {cid: 'Class01', acdYear: 2018}, {cid: 'Class02', acdYear: 2018}]}
const classrooms = [{cid: 'Class01', acdYear: 2018}, {cid: 'Class02', acdYear: 2018}, {cid: 'Class01', acdYear: 2018}, {cid: 'Class02', acdYear: 2018}]


const rootReducer = (state=initState, action)=>{
    initializeData().then(data=>{
        state.data = data
    })
    return state
}

export default rootReducer