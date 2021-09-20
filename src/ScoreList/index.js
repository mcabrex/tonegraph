import React, { Component } from 'react'
import './ScoreList.css'

const PieceList = (props) => {
    // REACT_APP_SCORE_KEY_1=5a400b3a414fed57e15c8222
    // REACT_APP_SCORE_KEY_2=5c5f1886ad3e0562986ddb1a
    // REACT_APP_SCORE_KEY_3=60d1b512665b9500134fcdf8
    // REACT_APP_SCORE_KEY_4=5a28284ea812902e84a42727
    const scoreInfo = [
        {
            title: "Fugue in G Minor - Bach",
            id: process.env.REACT_APP_SCORE_KEY_1
        },
        {
            title: "Bach Cello Suite No. 1 Prelude",
            id: process.env.REACT_APP_SCORE_KEY_2
        },
        {
            title: "Bach: Invention 13 in A Minor, BWV 784",
            id: process.env.REACT_APP_SCORE_KEY_3
        },
        {
            title: "Rondo Alla Turca (Turkish March - Mozart)",
            id: process.env.REACT_APP_SCORE_KEY_6
        },
    ]
    return (
        <ul className="scores">
            <h2>Titles</h2>
            {
                scoreInfo.map((score) => 
                    <li key={score.id}>
                        <button onClick={(e) => props.updateEmbed(score.id)}>{score.title}</button>
                    </li>
                )
            }
        </ul>
    )
}

export default PieceList