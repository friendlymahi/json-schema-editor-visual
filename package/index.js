import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.js'
import utils from './utils'
import moox from 'moox'
import schema from './models/schema'
import PropTypes from 'prop-types'
import sampleSchema from "./sampleSchema";

// const SchemaEditor = (config = {})=>{
//   if(config.lang) utils.lang = config.lang;
  
  const Model = moox({
    schema
  })
  // if(config.format){
  //   Model.__jsonSchemaFormat = config.format
  // } else {
  //   Model.__jsonSchemaFormat = utils.format
  // }

  // if(config.mock) {
  //   Model.__jsonSchemaMock = config.mock
  // }

  const store = Model.getStore();

  const Component = (props)=>{
    return <Provider store={store} className="wrapper">
      <App Model={Model} {...props} />
    </Provider>
  }

  Component.propTypes = {
    data: PropTypes.string,
    onChange: PropTypes.func,
    showEditor: PropTypes.bool
  }
  // return Component;

// }

// window.buildEditor = function(props) {
//   this.console.log(props);
//       ReactDOM.render(
//       <SchemaEditor {...props} />,
//     document.getElementById('vsjson')
//     )
//   };

function dispatchPreview(newSchema)
{  
  window.dispatchEvent(new CustomEvent('schemaUpdated', { detail: { schema: newSchema } }));
}

function readSchema()
{
  var schemaValue = document.getElementById("originalReference");
  if(schemaValue == null || (!schemaValue.value))
  {
    schemaValue = sampleSchema;
    console.error("Issue while loading schema. Picked default values");    
  }
  else
  {
    schemaValue= schemaValue.value;
    schemaValue = JSON.parse(schemaValue);
  }

    if(typeof schemaValue == "string")
    {
      schemaValue = schemaValue.trim();
    }
    
    console.log(schemaValue)
    return JSON.stringify(schemaValue);
}

ReactDOM.render(
  <Component  showEditor={false} onChange={dispatchPreview} data={(readSchema())} />,
document.getElementById('vsjson'));