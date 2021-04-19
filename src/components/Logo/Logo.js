import React from 'react';

import brushLogo from '../../assets/images/brush_logo.png';
import './Logo.css';

const Logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={brushLogo} style={{margin: "auto"}} alt="AIcasso" />
    </div>
);

export default Logo;