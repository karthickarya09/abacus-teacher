export default function addTemplate(state) {
  return (dispatch, getFirebase, getFirestore) => {
    const firestore = getFirestore.getFirestore();
    let myTemplates = state.teacherData.myTemplates;
    let templateData = {
      Title: state.title,
      Author: state.teacherData.Name,
      createdOn: new Date(),
    };
    templateData.competencies = {};
    state.competencies.forEach(competency => {
      let key = competency.key;
      delete competency.key;
      delete competency.index;
      templateData.competencies[key] = competency;
    });
    firestore
      .collection("templates")
      .add(templateData)
      .then(data => {
        let key = data._key.path.segments[data._key.path.segments.length - 1];
        firestore
          .update("teachers/8HuuLwmrU1xrltwrCByE", {
            myTemplates: [...myTemplates, key]
          })
          .then(() => {
            dispatch({
              type: "ADD_TEMPLATE_SUCCESS",
              templateData
            });
          });
      });
  };

  // return{
  //     action: 'ADD_TEMPLATTE_SUCCESSFUL',
  //     templateData
  // }
}
