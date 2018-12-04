import config from '../config'
const initialState = {
    teacherData:{acdYear: config.acdYear},
    classrooms: {acdYear: config.acdYear},
    students: {},
    templates: {},
    currentRubric: {},
    submitSuccess: false
}

export default initialState