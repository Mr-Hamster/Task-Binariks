import React from 'react'
import './calculate.css'
import swap from '../static/img/swap.png'
import Chart from '../chart/chart'
import TextField from '@material-ui/core/TextField';
import {crudBuilder} from '../../services/http'

export default class Calculate extends React.Component{  
    state = {
        amountFrom: 0,
        amountTo: 0,
        currencyFrom:'',
        currencyTo:'',
        data:[],
        labels: [],
        startData:'2018-01-01',
        endData:'2018-09-01'
    }

    chartData = async () =>{
        if(this.state.currencyFrom.length === 3){
            const response = await crudBuilder(`history?start_at=${this.state.startData}&end_at=${this.state.endData}&base=${this.state.currencyFrom.toUpperCase()}`).get()
            const arrayValues = [];
            const labels = [];
            for(let key in response.data.rates){
                for(let currency in response.data.rates[key]){
                    if(currency ===  this.state.currencyTo.toUpperCase()){
                        arrayValues.push(response.data.rates[key][currency])
                    }
                }
                labels.push(key);
            }
            this.setState({data:arrayValues, labels})
            this.calculate();
        }
    }

    updating = async () =>{
        if(this.state.currencyFrom.length === 3){         
            const response = await crudBuilder(`history?start_at=2018-01-01&end_at=2018-09-01&base=${this.state.currencyFrom.toUpperCase()}`).get()  
            this.setState({
                arr:response.data.rates["2018-08-22"] 
            })
            this.calculate();
        }
    }

    calculate = () => {
        const{amountFrom,currencyTo,arr}=this.state;
        let kof = 0;
        for(let key in arr){
            if(key === currencyTo.toUpperCase()){
                kof = arr[key]
            }
        }
        let result = +amountFrom * kof;
        result = result.toFixed(2);
        this.setState({
            amountTo:result
        })

    }

    swaping = () => {
        const{currencyFrom, currencyTo}=this.state;
        let someVar = currencyFrom;
        this.setState({
            currencyFrom: currencyTo,
            currencyTo: someVar
        },()=>{
            this.updating();
            this.chartData();
        })
    }

    handleChangeAmount = ({target: {value}}) => {
        this.setState({
            amountFrom: value
        },()=>{
            this.updating();
        })
        
    }

    handleChangeCurrencyFrom = ({target: {value}}) => {
        console.log(value)
        this.setState({
            currencyFrom: value
        },()=>{
            this.updating();
            this.chartData();
        })
    }

    handleChangeCurrencyTo = ({target: {value}}) => {
        this.setState({
            currencyTo: value
        },()=>{
            this.updating();
            this.chartData();
        })
    }

    handleChangeDateTo = ({target: {value}}) => {
        this.setState({
            endData: value
        },()=>{
            this.chartData();
        })
    }

    handleChangeDateFrom = ({target: {value}}) => {
        this.setState({
            startData: value
        },()=>{
            this.chartData();
        })
    }
    
    render(){
        return(
            <div className='wrapper'>
                <div className='inputs'>
                    <TextField
                        id="outlined-number"
                        label="Amount from..."
                        type="number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        onChange = {this.handleChangeAmount}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Currency from..."
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        value = {this.state.currencyFrom} 
                        onChange = {this.handleChangeCurrencyFrom}
                    />
                    <img src = {swap} onClick = {this.swaping} alt="iconSwap" />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Currency to..."
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        value = {this.state.currencyTo} 
                        onChange = {this.handleChangeCurrencyTo}
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Amount to..."
                        value={this.state.amountTo}
                        margin="normal"
                        InputProps={{
                        readOnly: true,
                        }}
                        variant="outlined"
                    />
                </div>
                <div className="inputDate">   
                    <TextField
                        id="date"
                        label="Date from..."
                        type="date"
                        defaultValue="2018-01-01"                    
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange = {this.handleChangeDateFrom}
                    />
                    <TextField
                        id="date"
                        label="Date to..."
                        type="date"
                        defaultValue="2018-09-01"                    
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange = {this.handleChangeDateTo}
                    />
                </div>
                <Chart labels={this.state.labels}  data={this.state.data} currencyTo={this.state.currencyTo}/>
            </div>
       );
    }
}
