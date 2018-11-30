import React, { Component } from "react";
import {Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RubricsPage from "./components/RubricsPage"
import CreateRubric from "./components/CreateRubric"
import Classroom from "./components/classroom"


class Routes extends Component{

    render(){
        return(
            <div className="content-wrapper">
                <Route exact path="/" component={Dashboard}/>
                <Route path="/Rubrics" component={RubricsPage}/>
                <Route path="/createRubric" component={CreateRubric}/>
                <Route path="/classroomAnalysis" component={Classroom}/>
                {/* <Route path="/enterData" component={StudentRubricData}/>
                <Route path="/analysis" component={Dashboard}/>
                <Route path="/studentAnalysis" component={StudentAnalytics}/> */}
            </div>
        )
    }
}

export default Routes;