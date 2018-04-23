

import React from 'react';
import {
    Slider
    
} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



import {SketchField, Tools, } from 'react-sketch';


class SketchFieldDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lineColor: 'black',
            lineWidth: 10,
            backgroundColor: 'transparent',
            tool: Tools.Pencil,
            artpng: '',
            canUndo: false,
            canRedo: false,
            sketchWidth: 600,
            sketchHeight: 600,
            stretched: true,
            stretchedX: false,
            stretchedY: false,
            originX: 'left',
            originY: 'top',   
            notes:''
    };
        }

    
    _save = () => {
        fetch('http://localhost:3001/api/artlog/',{
            method:'POST',
            body:JSON.stringify(
                {artlog:
                    {artpng:this.state.artpng, 
                     notes:this.state.notes}
                }),
            headers: new Headers({
                'Content-Type':'application/json',
                  
                })
        })
        .then(onfullfilled=>this.setState({artpng:''}))
        .then(onfullfilled=>alert('You added it to the cloud'))
    };
   
    _removeMe = (index) => {
        let drawings = this.state.drawings;
        drawings.splice(index, 1);
        this.setState({drawings: drawings});
    };
    _undo = () => {
        this._sketch.undo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };
    _redo = () => {
        this._sketch.redo();
        this.setState({
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };
    _clear = () => {
        this._sketch.clear();
        this._sketch.setBackgroundFromDataUrl('');
        this.setState({
            backgroundColor: 'transparent',
            fillWithBackgroundColor: false,
            canUndo: this._sketch.canUndo(),
            canRedo: this._sketch.canRedo()
        })
    };
    _onSketchChange = () => {
        let prev = this.state.canUndo;
        let now = this._sketch.canUndo();
        if (prev !== now) {
            this.setState({canUndo: now});
        }
        this.setState({artpng: this._sketch.toDataURL()})
    };
    
    
    render = () => {
        
        return (
           
                <div>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                            
                                <button
                                    onClick={this._undo}
                                    disabled={!this.state.canUndo}>
                                    UNDo Button
                                    
                                </button>
                                <button
                                    onClick={this._redo}
                                    disabled={!this.state.canRedo}>
                                    Redo Button
                                </button>
                                <button
                                    onClick={this._clear}>
                                    Clear
                                </button>
                                <button
                                    onClick={this._save}>
                                    Save
                                </button>
                            
                        </div>
                    </div>

                   

                    <div className='row'>
                        <div className='col-xs-7 col-sm-7 col-md-9 col-lg-9'>

                           

                            <SketchField
                                name='sketch'
                                className='canvas-area'
                                ref={(c) => this._sketch = c}
                                lineColor={this.state.lineColor}
                                lineWidth={this.state.lineWidth}
                                fillColor={this.state.fillWithColor ? this.state.fillColor : 'transparent'}
                                backgroundColor={this.state.fillWithBackgroundColor ? this.state.backgroundColor : 'transparent'}
                                width={this.state.controlledSize ? this.state.sketchWidth : null}
                                height={this.state.controlledSize ? this.state.sketchHeight : null}
                                undoSteps={25}
                                onChange={this._onSketchChange}
                                tool={this.state.tool}
                            />
                            <label htmlFor='slider'>Line Weight</label>
                            <MuiThemeProvider>
                                    <Slider ref='slider' step={0.1}
                                            defaultValue={this.state.lineWidth / 100}
                                            onChange={(e, v) => this.setState({lineWidth: v * 100})}/>
                                    </MuiThemeProvider>              
                           
                                    <br/>
                                    <label htmlFor='lineColor'>Line</label>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'red'})}>Red</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'pink'})}>Pink</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'orange'})}>Orange</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'yellow'})}>Yellow</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'green'})}>Green</button> 
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'blue'})}>Blue</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'lightblue'})}>Sky Blue</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'brown'})}>Brown</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'purple'})}>Purple</button>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'black'})}>Black</button>     
                                    <br/>
                                    <button
                                        id='lineColor' color={this.state.lineColor}
                                        onClick={(color) => this.setState({lineColor: 'white'})}>White</button>
                                </div>
                            </div>
                        </div>

        )
    };
}

export default SketchFieldDemo;