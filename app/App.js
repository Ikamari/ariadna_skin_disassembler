//React
import React, { Component } from 'react';
import { connect } from "react-redux"
//Components
import SkinPalette from './components/GUI/SkinPalette'
import SkinPartsPalette from './components/GUI/SkinPartsPalette'
import SkinLoader from './components/SkinLoader/SkinLoader'
import SkinDisassemble from './components/skin-disassemble/SkinDisassemble'

export default class App extends Component {
    render() {
        return(
            <div className="app">
                <SkinLoader/>
                <SkinPalette/>
                <SkinDisassemble/>
                <SkinPartsPalette/>
            </div>
        )
    }
}



