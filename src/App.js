import React from 'react';
import './App.scss';
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
        "<h1>First Content</h1>",
        "<h2>Second Content</h2>",
        "<h3>Third Content</h3>",
        "<h4>Fourth Content</h4>",
    ]
    }
    />
    )
  }
}
export default App;
