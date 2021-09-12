import React, { Component } from 'react'
import './ScoreList.css'

const PieceList = (props) => {
    // REACT_APP_SCORE_KEY_1=5a400b3a414fed57e15c8222
    // REACT_APP_SCORE_KEY_2=5c5f1886ad3e0562986ddb1a
    // REACT_APP_SCORE_KEY_3=60d1b512665b9500134fcdf8
    // REACT_APP_SCORE_KEY_4=5a28284ea812902e84a42727
    const basicTitles = [
        process.env.REACT_APP_SCORE_KEY_1,
        process.env.REACT_APP_SCORE_KEY_2,
        process.env.REACT_APP_SCORE_KEY_3,
    ]
    return (
        <ul className="scores">
            <h2>Titles</h2>
            {
                basicTitles.map((title,ind) => <li><button onClick={(e) => props.updateEmbed(basicTitles[ind])}>{title}</button></li>)
            }
        </ul>
    )
}

export default PieceList