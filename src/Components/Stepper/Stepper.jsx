import React, { Component } from 'react'
import Step from '../Step/Step';
import './Stepper.scss';

export default class Stepper extends Component {
    constructor() {
        super();       
        this.state = {
          activeStep :0,
          skipped:new Set(),
          stepsObjs : [],
          optnlSteps : new Set(),
          stepsContents : []
          };
      }

      componentDidMount() {
        const {stepsContent} = this.props;
        this.setState({
          stepsContents:stepsContent
        })
        this.prepareStatesObj(this.state.activeStep,this.state.skipped);
      
    }
     getStepContent(activeStep){
      let content = this.state.stepsContents[activeStep];
      if(activeStep > 0 && activeStep === this.state.stepsObjs.length){
        console.log('activeStep :',activeStep);
        if(content){
          return this.getStepContentOfProp(content);    
        }
        return (<div>All steps completed - you're finished</div>);
      }
      if(this.state.stepsContents && this.state.stepsContents.length > 0){
        return this.getStepContentOfProp(content);    
      }
      else{
        return (<div>Step {activeStep+1}</div>);
      }

    }

    getStepContentOfProp(content){
      if(typeof content === "object"){
        return <div>{content}</div>
      }
      else{
        return (<div dangerouslySetInnerHTML={{__html: content}}/>)
      }
    }

     prepareStatesObj (activeStep,skipped){
        const {steps,optionalSteps} = this.props;
        const optnlSteps = new Set();
        if(optionalSteps){
          for(const step of optionalSteps){
              optnlSteps.add(step);
          }
        }
        const stepsState = steps.map((step,index) => {
            const stepObj = {};
            stepObj.label = step;
            stepObj.completed =  skipped.has(index) ? false : index < activeStep ;//past are completed
            stepObj.highlighted =  skipped.has(index) ? false :index === activeStep ;//only present is highlighted
            stepObj.selected =   skipped.has(index) ? false : index <= activeStep ;//past & present are colored
            stepObj.optional = optnlSteps && optnlSteps.has(index);
            return stepObj;
        });

        this.setState({
            stepsObjs:stepsState,
            optnlSteps:optnlSteps
        })
    }
      
      handleButtonClick = clickType => {
        const {activeStep} = this.state;
        let newActiveStep = activeStep;
        let newSkipped = this.state.skipped;
        switch(clickType) {
          case "next":
            if (this.isStepSkipped(newActiveStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(newActiveStep);
               }
                newActiveStep++;
                break;
          case  "reset":
                newActiveStep = 0;
                newSkipped = new Set();
                break;
          case  "skip":
                const currentSkipped = new Set(newSkipped.values());
                currentSkipped.add(newActiveStep);
                newSkipped = currentSkipped;
                newActiveStep++;
                break;
          default :
                newActiveStep = newActiveStep-1;
                if(this.state.skipped.has(newActiveStep)){
                  newSkipped = new Set();
                }
                break;
        }
          this.setState({
            activeStep:newActiveStep,
            skipped:newSkipped
          });
          this.prepareStatesObj(newActiveStep,newSkipped);
      
       
      }
        isStepSkipped = (step) => {
        return this.state.skipped.has(step);
        };
        render () {
          return (<>
          <div className="stepper-container">
          <div className="stepper-wrapper">
          {this.state.stepsObjs.map((stepObj, index) => {
            return <Step key = {index} stepObj ={stepObj} index = {index} isLastStep = {index === this.state.stepsObjs.length-1} ></Step>;
          })}
          </div>
          </div>
          <div className="content">
            {this.getStepContent(this.state.activeStep)}
          </div>
          <div className="buttons-container">
          {this.state.activeStep ===this.state.stepsObjs.length ? (
            <div className="button-rightcontainer">
            <button onClick = {()=> this.handleButtonClick("reset")}>Reset</button>
            </div>
          ):
          (
            <>
            <div className = "button-leftcontainer">
              <button disabled = {this.state.activeStep ===0} onClick = {() =>this.handleButtonClick()}>Back</button>
            </div>
            <div className = "button-rightcontainer">
            <div className = "button-skip-div">{this.state.optnlSteps.has(this.state.activeStep) ? <button onClick = {()=> this.handleButtonClick("skip")}>Skip</button>:""}</div>
            <button onClick = {()=> this.handleButtonClick("next")}>{this.state.activeStep === this.state.stepsObjs.length-1 ?"Finish":"Next"}</button>
            
            </div>
            
            </>
          )
          }
          </div>
          </>
          )
        }
}
