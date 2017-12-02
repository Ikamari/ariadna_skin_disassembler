//React
import React, { Component } from 'react';
import { connect } from "react-redux";
//Components
import SkinPalette from './components/GUI/SkinPalette';
import SkinPartsPalette from './components/GUI/SkinPartsPalette';
import SkinLoader from './components/SkinLoader/SkinLoader';
import SkinDisassemble from './components/skin-disassemble/SkinDisassemble';
import PartExport from './components/PartExport';

export default class App extends Component {
    render() {
        return(
            <div className="app">
                <div className="restriction">
                    <span>Caution:</span> Данное приложение спокойно разбирает скины 64*32 и 64*64,<br/>
                    однако не стоит заливать скины для модельки Алекс (Модель с более тонкими<br/>
                    руками и другим размером текстур для них). Сборщик-то сможет из этих частей<br/>
                    собрать скин, но игра не будет их правильно рендерить, ибо на текущей версии<br/>
                    нет поддержки урезанных текстур рук, да и такой модельки тоже.
                </div>
                <SkinLoader/>
                <SkinPalette/>
                <SkinDisassemble/>
                <SkinPartsPalette/>
                <PartExport/>
            </div>
        )
    }
}



