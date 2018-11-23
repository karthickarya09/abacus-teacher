import React, {Component} from 'react';
import CustomizedTable from './List';

class RubricsPage extends Component{
    state ={
        data :[
            {id: 1, name: 'Rubrics 1', dateCreated: '11/09/2018', lastModified:'11/20/2018'},
            {id: 1, name: 'Rubrics 1', dateCreated: '11/09/2018', lastModified:'11/20/2018'},
            {id: 1, name: 'Rubrics 1', dateCreated: '11/09/2018', lastModified:'11/20/2018'}
        ]
    }

    render(){
        return(
            <div style={{padding:10}}>
                <CustomizedTable data={this.state.data}/>
            </div>
        )
    }
}

export default RubricsPage