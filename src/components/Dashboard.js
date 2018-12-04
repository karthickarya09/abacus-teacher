import React, { Component } from "react";
import SimpleCard from "./Card";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "./Loading";

class Dashboard extends Component {
  state = {
    cardData: {
      title: "Classroom 1"
    }
  };

  render() {
    let classrooms = [];
    let loading = true;
    if (this.props.classrooms.length > 0) {
      this.props.teacherData.classrooms.forEach(classID => {
        classrooms.push(
          this.props.classrooms.find(classroom => {
            return classroom.id === classID;
          })
        );
      });
      loading = false;
    }
    return (
      <div style={{ padding: 25 }}>
        <h1>Dashboard</h1>
        <div>
          {loading && <Loading />}
          {!loading && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
                  navigator.userAgent
                )
                  ? "center"
                  : "left"
              }}
            >
              {classrooms.map(classroom => {
                return (
                  <div style={{ margin: 10 }} key={classroom.id}>
                    <SimpleCard
                      data={classroom}
                      handleClick={this.props.setClassroom}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    teacherData: state.firestore.ordered.teachers
      ? state.firestore.ordered.teachers[0]
      : {},
    classrooms: state.firestore.ordered.classrooms
      ? state.firestore.ordered.classrooms
      : []
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect(["teachers", "classrooms"])
)(Dashboard);
