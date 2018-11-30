import React, { Component } from "react";
import SimpleCard from "./Card";
import { connect } from "react-redux";
import getTeacher from "../actions/teacherActions";
import { bindActionCreators, compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Dashboard extends Component {
  state = {
    cardData: {
      title: "Classroom 1"
    }
  };

  handleClick = () => {
    // this.props.getTeacher()
  };
  render() {
    let classrooms = [];
    if (this.props.classrooms.length > 0) {
      this.props.teacherData.classrooms.forEach(classID => {
        classrooms.push(
          this.props.classrooms.find(classroom => {
            return classroom.id === classID;
          })
        );
      });
    }
    return (
      <div style={{ padding: 25 }}>
        <h1>Dashboard</h1>
        <div>
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
                    handleClick={this.handleClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTeacher: bindActionCreators(getTeacher, dispatch)
  };
};

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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(["teachers", "classrooms"])
)(Dashboard);
