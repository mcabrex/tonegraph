import React, { Component } from 'react'
import "./App.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Embed from 'flat-embed';
import LineChart from './Chart' 

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            partData: [],
            data: null
        };
        this.embedRef = React.createRef();
    }

    componentDidMount() {
        this.initiateEmbed()
    }

    initiateEmbed = () => {
        const container = this.embedRef.current
        const embed = new Embed(container, {
            score: process.env.REACT_APP_SCORE_KEY,
            embedParams: {
                appId: process.env.REACT_APP_FLAT_KEY,
            }
        });
        
        embed.getJSON().then(data => {
            const partData = data['score-partwise']['part']     
            console.log('JSON data',partData)
            const title = data['score-partwise']['work']['work-title']    
            this.setState({partData,title,data})
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return (
            <div className="App">
                {
                    !this.state.data && <div>Loading Brutha</div>
                }
                {
                    this.state.data && 
                    <React.Fragment>
                        <h1 className={'chart-title'}>{this.state.title}</h1>
                        <LineChart partData={this.state.partData} data={this.state.data}/>
                    </React.Fragment>
                }
                <div id="embed-container" ref={this.embedRef}/>
            </div>
        )
    }
}