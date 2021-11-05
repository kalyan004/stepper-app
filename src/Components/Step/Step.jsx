import React, { Component } from 'react'
import './Step.scss'

export default class Step extends Component {
     render() {
         const {stepObj,index ,isLastStep} = this.props;
         return (
                <div className="step-wrapper" key={index}>
                    <div  className={`step-number ${stepObj.selected ? "step-number-active": "step-number-disabled"}`} >{stepObj.completed ? <span>&#10003;</span> : index + 1 }</div>
                    <div className={`step-description 
                    ${stepObj.highlighted &&
                    "step-description-active"}`}
                    >{stepObj.label}</div>
                    <div>{stepObj.optional ? "Optional":""}</div>
                    <div 
                    className = {!isLastStep ?`divider-line` :""}>
                    </div>
                </div>
                
            );
     }
}
