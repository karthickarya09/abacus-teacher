import React, { Component } from "react";
import {Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RubricsPage from "./components/RubricsPage"



class Routes extends Component{

    render(){
        return(
            <div className="content-wrapper">
                <Route exact path="/" component={Dashboard}/>
                <Route path="/Rubrics" component={RubricsPage}/>
                {/* <Route path="/createRubric" component={CreateRubric}/>
                <Route path="/enterData" component={StudentRubricData}/>
                <Route path="/analysis" component={Dashboard}/>
                <Route path="/classroomAnalysis" component={ClassroomAnalytics}/>
                <Route path="/studentAnalysis" component={StudentAnalytics}/> */}
            </div>
        )
    }
}

export default Routes;