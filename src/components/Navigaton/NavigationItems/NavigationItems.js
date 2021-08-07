import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Draw</NavigationItem>
        <NavigationItem link="/identify">Identify</NavigationItem>
        <NavigationItem link="/favourites">Favourite</NavigationItem>
        <NavigationItem link="/about">About</NavigationItem>
    </ul>
);

export default navigationItems;