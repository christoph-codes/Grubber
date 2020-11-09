import React from 'react';
import './UserDashRequests.scss';

export default function UserDashRequests(props) {
    const requests = [
        {
            requestedUser: {
                user_id: 13,
                fname: 'Christopher',
                lname: 'Jones',
                username: 'christoph5'
            },
            date: '11-05-2020',
            title: 'It\'s Taco Tuesday!'

        }
    ]
     return (
        <div className='UserDashRequests animate__animated animate__fadeInUpBig'>
            UserDashRequests
        </div>
    );
}