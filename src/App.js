import React, { Component } from 'react'
import Embed from 'flat-embed';
import LineChart from './Chart' 
import ScoreList from './ScoreList'
import Loader from './Loader'

import "./App.css"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            data: null,
            embed: {}
        };
        this.embedRef = React.createRef();
    }

    componentDidMount() {
        this.initiateEmbed(process.env.REACT_APP_SCORE_KEY_1)
    }

    initiateEmbed = (scoreId) => {
        const container = this.embedRef.current
        const embed = new Embed(container, {
            score: scoreId,
            embedParams: {
                appId: process.env.REACT_APP_FLAT_KEY,
            }
        });
        this.loadEmbedScore(embed,scoreId)
    }

    loadEmbedScore = (embed,scoreId) => {
        embed.loadFlatScore(scoreId).then(e => {
            embed.getJSON().then(data => {
                console.log('data',data)
                const title = data['score-partwise']['work']['work-title']    
                this.setState({title,data})
            })
        }).catch(function (error) {
            console.error(error)
        });
    }

    render() {
        return (
            <div className="App">
                <ScoreList updateEmbed={this.initiateEmbed}/>
                {!this.state.data && <Loader />}
                {
                    this.state.data && 
                    <React.Fragment>
                        <h1 className={'chart-title'}>{this.state.title}</h1>
                        <LineChart data={this.state.data}/>
                    </React.Fragment>
                }
                <div id="embed-container" ref={this.embedRef}/>
            </div>
        )
    }
}