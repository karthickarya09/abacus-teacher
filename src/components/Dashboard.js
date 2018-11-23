import React, {Component} from "react"
import SimpleCard from "./Card"


class Dashboard extends Component{

    state ={
        cardData:{
            title: "Classroom 1"
        }
    }
    
    render(){
        return(
            <div style={{padding: 25}}>
                <h1>Dashboard</h1>
                <div style={{display: 'flex'}}>
                    <div style={{padding:10}}><SimpleCard data={this.state.cardData}/></div>
                    <div style={{padding:10}}><SimpleCard data={this.state.cardData}/></div>
                </div>
                
            </div>
        )
    }
}

export default Dashboard;