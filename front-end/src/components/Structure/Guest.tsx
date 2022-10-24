import React from 'react';
import { Link } from 'react-router-dom';

function Guest() {

    return (
        <ul tabIndex={0} className='tw-mt-3 tw-p-2 tw-shadow tw-daisy-menu tw-daisy-menu-compact
        tw-daisy-dropdown-content tw-bg-base-100 tw-rounded-box tw-w-[10rem]'>
            <li><Link className='tw-rounded-[0.5rem]' to='/login'>Login</Link></li>
            <li><Link className='tw-rounded-[0.5rem]' to='/register'>Register</Link></li>
        </ul>
    );
}

export default Guest;