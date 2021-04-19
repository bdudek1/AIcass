import React from 'react';

import './Button.css';

const Button = (props) => (
    <button
        style={{width: props.buttonWidth,
                height: props.buttonHeight}}
        disabled={props.disabled}
        className="Button"
        onClick={props.clicked}><div>{props.children}</div>
    </button>
);

export default Button;