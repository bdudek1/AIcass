import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Draw Image</NavigationItem>
        <NavigationItem link="/train">Train Me!</NavigationItem>
        <NavigationItem link="/faq">FAQ</NavigationItem>
        <NavigationItem link="/about">About</NavigationItem>
    </ul>
);

export default navigationItems;