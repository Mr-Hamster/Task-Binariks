import React, {Fragment} from 'react'
import './data.css'
import {Button, ButtonToolbar} from 'react-bootstrap'

const arr = [
    {
        name: 'red',
        color: 'red'
    },
    {
        name: 'red1',
        color: 'red'
    },
    {
        name: 'red2',
        color: 'red'
    },
    {
        name: 'blue',
        color: 'blue'
    },
    {
        name: 'blue1',
        color: 'blue'
    },
    {
        name: 'blue2',
        color: 'blue'
    },
    {
        name: 'yellow',
        color: 'yellow'
    },
    {
        name: 'green',
        color: 'green'
    },
    {
        name: 'green1',
        color: 'green'
    },

]

export default class Data extends React.Component{

    state = {
        filter:'',
        staticData:[],
        filterData:[],
    }

    componentDidMount(){
        this.setState({filterData: arr, staticData: arr})
    }

    filtering = (value) => {
        const{staticData} = this.state;
        if(value === ''){
            this.setState({
                filterData: staticData
            })
        }
        else{
            this.setState({filterData: staticData.filter(item => item.color === value)})
        }
    }

    handleChange = ({target : {value}}) =>{
        this.setState({
            filter: value
        })
        this.filtering(value);
    }

    render(){
        console.log(this.state)
        return(
            <Fragment className="wrapper">
                    <h3>Choose the button:</h3>
                    <ButtonToolbar className="buttons">
                        <Button variant="secondary" value = '' onClick={this.handleChange}>All</Button>
                        <Button variant="danger" value = 'red' onClick={this.handleChange}>Red</Button>
                        <Button variant="primary" value = 'blue' onClick={this.handleChange}>Blue</Button>
                        <Button variant="warning" value = 'yellow' onClick={this.handleChange}>Yellow</Button>
                        <Button variant="success" value = 'green' onClick={this.handleChange}>Green</Button>
                    </ButtonToolbar>
                    <hr />
                    <h3>Result:</h3>
                <div className="wrapperBlocks">
                    {
                        this.state.filterData.map((item, index) => (
                            <div key = {index} style={{backgroundColor: item.color }} className="blocks"> 
                                {item.name}
                            </div>
                        ))
                    }
                </div>
            </Fragment>
        );
    }
}