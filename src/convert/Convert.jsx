import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import convert from 'xml-js';

import X2JS from 'x2js';

import xmlTwoJs from 'xml2js';

const Convert = () => {
  const [formState, changeState] = useState({ xmlValue: '', jsonValue: '' });

  const { xmlValue, jsonValue } = formState;

  const handleChange = event => {
    const { name, value } = event.target;

    changeState({ [name]: value });
  };

  const onConvertToJSON = () => {
    // const xmlToJS = new X2JS();
    // const intputVal = xmlToJS.xml2js(xmlValue);
    const intputVal = convert.xml2js(xmlValue);

    console.log(intputVal);
    if (intputVal) {
      changeState({ jsonValue: JSON.stringify(intputVal) });
    }
  };

  const onConvertToXML = () => {
    // const jsToxml = new X2JS();
    // const intputVal = jsToxml.js2xml(jsonValue);
    const intputVal = convert.js2xml(jsonValue);

    console.log(intputVal);
    if (intputVal) {
      changeState({ xmlValue: intputVal });
    }
  };

  const convertXMLtoJS = () => {
    xmlTwoJs.parseString(xmlValue, (err, result) => {
      if (err) {
        throw err;
      }

      // `result` is a JavaScript object
      // convert it to a JSON string
      const json = JSON.stringify(result, null, 4);
      changeState({ jsonValue: json });
      // log JSON string
      console.log(json);
    });
  };

  const conversioX2JS = () => {
    let x2js = new X2JS();
    const result = x2js.xml2js(xmlValue);
    const json = JSON.stringify(result, null, 4);

    changeState({ jsonValue: json });
    console.log(json);
  };

  return (
    <div>
      <textarea
        placeholder="Enter XML"
        name="xmlValue"
        value={xmlValue}
        onChange={e => handleChange(e)}
        cols={40}
        rows={12}
      />
      <hr />
      <textarea
        placeholder="JSON"
        name="jsonValue"
        value={jsonValue}
        onChange={e => handleChange(e)}
        cols={40}
        rows={12}
      />

      <br />

      <button type="button" onClick={conversioX2JS}>
        Convert To JSON
      </button>
    </div>
  );
};

export default Convert;
