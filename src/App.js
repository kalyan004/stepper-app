import React from 'react';
import './App.scss';
import StepOne from './Components/Step-One/StepOne';
import Stepper from './Components/Stepper/Stepper';


class App extends React.Component {
  render () { 
    return (<Stepper 
    steps = {["Step One",
    "Step Two",
    "Step Three",
    "Step Four"]}
    optionalSteps = {[1]}
    stepsContent = {
      [
        <StepOne/>,
        "<h2>Second Step Content</h2>",
        "<h3>Third Step Content</h3>",
        "<h4>Fourth Step Content</h4>",
        "<div>Finished Content</div>"
    ]
    }
    />
    )
  }
}
export default App;
