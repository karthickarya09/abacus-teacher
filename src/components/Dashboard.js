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
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))?'center':'left'}}>
                    <div style={{padding:10}}><SimpleCard data={this.state.cardData}/></div>
                    <div style={{padding:10}}><SimpleCard data={this.state.cardData}/></div>
                </div>
                
            </div>
        )
    }
}

export default Dashboard;