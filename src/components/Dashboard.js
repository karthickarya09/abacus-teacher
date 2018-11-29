import React, { Component } from "react";
import SimpleCard from "./Card";
import { connect } from "react-redux";
import getTeacher from '../actions/teacherActions'
import {bindActionCreators} from 'redux'

class Dashboard extends Component {
  state = {
    cardData: {
      title: "Classroom 1"
    }
  };

  handleClick = () => {
    this.props.getTeacher()
  }
  render() {
    console.log("Props: ", this.props.data)
    return (
      <div style={{ padding: 25 }}>
        <h1>Dashboard</h1>
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
          <div style={{ padding: 10 }}>
            <SimpleCard data={this.state.cardData} handleClick={this.handleClick}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getTeacher: bindActionCreators(getTeacher, dispatch)
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
      data: state.data
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
