import React from 'react';
import './UserDashProfile.scss';
import headshot from '../../../assets/chris-headshot.png'

export default function UserDashProfile(props) {
    const accountDetails = {
        user_name: 'Christopher Jones',
        first_name: 'Christopher',
        last_name: 'Jones',
        user_gender: 'male',
        favorite_food: 'Chicken Wings & Caesar Salad',
        user_email: 'tkcwebdev@gmail.com',
        location: 'Las Vegas, NV, 89149',
        user_description: "I'm the best at finding awesome eateries, you should join me some time!",
        created_on: '',
        last_updated: '',
        top_three: ['American', 'Mexican', 'Italian']
    }
     return (
        <div className='UserDashProfile'>
            <img className="headshot" src={headshot} alt={accountDetails.user_name + ' headshot'} />
            <hr/>
            <div className="account-group">
                <label>Name</label>
                <h6>{accountDetails.user_name}</h6>
            </div>
            <div className="account-group">
                <label>Location</label>
                <h6>{accountDetails.location}</h6>
            </div>
            <div className="account-group">
                <label>Favorite Food</label>
                <h6>{accountDetails.favorite_food}</h6>
            </div>
            <div className="account-group">
                <label>Top 3 Types</label>
                <h6>{accountDetails.top_three.join(', ')}</h6>
            </div>
        </div>
    );
}