import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Draw Image</NavigationItem>
        <NavigationItem link="/identify">Identify Images</NavigationItem>
        <NavigationItem link="/favourites">Favourite Images</NavigationItem>
        <NavigationItem link="/faq">FAQ</NavigationItem>
        <NavigationItem link="/about">About</NavigationItem>
    </ul>
);

export default navigationItems;