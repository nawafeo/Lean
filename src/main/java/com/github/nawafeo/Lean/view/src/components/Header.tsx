import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <header className='tw-daisy-navbar tw-bg-neutral tw-sticky tw-top-0'>
            <div className='tw-daisy-navbar-start'/>
            <div className='tw-daisy-navbar-center tw-gap-4'>
                <Link className='nav-btn tw-daisy-btn' to='/'>Home</Link>
                <Link className='nav-btn tw-daisy-btn' to='/about'>About</Link>
                <img className='tw-daisy-btn tw-border-0 tw-no-animation tw-cursor-pointer' id='nav-logo' src={process.env.PUBLIC_URL + '/images/logo.png'}
                     alt='Lean logo' />
                <Link className='nav-btn tw-daisy-btn' to='/contact'>Contact</Link>
                <div className='tw-daisy-dropdown' id='nav-menu'>
                    <label tabIndex={0} className='nav-btn tw-daisy-btn tw-daisy-avatar'>
                        <img id='menuIMG' src={process.env.PUBLIC_URL + '/images/nav_menu.png'} alt='3 dot menu' />
                    </label>
                </div>
            </div>
            <div className='tw-daisy-navbar-end'/>
        </header>
    );
}

export default Header;