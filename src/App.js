import React, { Component } from 'react'
import "./App.css"

import Embed from 'flat-embed';
import LineChart from './Chart' 

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            measureListData: {},
        }
    }

    componentDidMount() {
        this.initiateEmbed()
    }

    initiateEmbed = () => {
        const container = document.getElementById('embed-container');
        const embed = new Embed(container, {
            //5c5f1886ad3e0562986ddb1a
            //5a400b3a414fed57e15c8222
            score: '5c5f1886ad3e0562986ddb1a',
            embedParams: {
                appId: '59e7684b476cba39490801c2',
            }
        });
        
        embed.getJSON().then(data => {
            console.log('JSON data',data)
            const measureListData = data['score-partwise']['part'].map(part => part['measure'])     
            this.setState({measureListData})
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return (
            <div className="App">
                <LineChart measureListData={this.state.measureListData}/>
                <div id="embed-container" />
            </div>
        )
    }
}