import React from 'react';

const Header = (props) => {
    return (
        <nav>
            <p onClick={props.handleAllTripsClick}>All Trips</p>
            <p onClick={props.handleAddTripClick}>Add Trip</p>
        </nav>
    )
};

export default Header;
