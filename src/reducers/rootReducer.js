const initState = { classrooms: {}, Name: {} };
function rootReducer(state = initState, action) {
    console.log("action: ", action)
  return state;
}

export default rootReducer;
