import React from 'react';
import ReactTooltip from 'react-tooltip';

import './Switch.css';

const SwitchType = (props) => {
    return (
        <div class="mid" 
             data-tip="Click to mark all your uploaded images as views or non-views."
             data-for="Switch">
          <label class="rocker rocker-small">
            <input type="checkbox" onClick = {props.clicked}/>
            <span class="switch-left">A view</span>
            <span class="switch-right">Not view</span>
          </label>
          <ReactTooltip 
            id="Switch"
            backgroundColor="#33B7EE"
            borderColor="#B637F1"
            border="true" />
        </div>
    );
}

export default SwitchType;