//React
import React, { Component } from 'react';
//Components
import Disassembler from './components/Disassembler'

export default  class App extends Component {
    render() {
        return(
            <div className="app">
                <Disassembler/>
            </div>
        )
    }
}
