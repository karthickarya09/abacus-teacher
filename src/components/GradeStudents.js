import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

class GradeStudents extends Component {
    render(){
        console.log("Props: ", this.props.rubricData)
        return(
            <div style={{margin:20}}>
                <h4>Select Classroom</h4>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return {
        rubricData: ownProps.location.state,
    }
}

export default connect(mapStateToProps)(GradeStudents)