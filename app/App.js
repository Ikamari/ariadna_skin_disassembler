//React
import React, { Component } from 'react';
import { connect } from "react-redux"
//Components
import SkinCarousel from './components/GUI/SkinCarousel'
import SkinPartsCarousel from './components/GUI/SkinPartsCarousel'
import SkinLoader from './components/SkinLoader/SkinLoader'

export default class App extends Component {
    render() {
        return(
            <div className="app">
                <SkinLoader/>
                <SkinCarousel/>

                <SkinPartsCarousel/>
            </div>
        )
    }
}



