import React from 'react';
import './App.css';

function App() {
  return (
    <div className='tw-flex tw-flex-col tw-min-h-[100vh]'>
        <header className='tw-daisy-navbar tw-bg-neutral tw-sticky tw-top-0'>
            <div className='tw-daisy-navbar-start'/>
            <div className='tw-daisy-navbar-center'>
                <a className='tw-daisy-btn'>Home</a>
                <a className='tw-daisy-btn'>About</a>
                <img className='tw-daisy-btn tw-border-0' id='logo' src={process.env.PUBLIC_URL + '/images/logo.png'}
                     alt='logo' />
                <a className='tw-daisy-btn'>Contact</a>
                <div className='tw-daisy-dropdown'>
                    <label tabIndex={0} className='tw-daisy-btn tw-daisy-avatar'>
                            <img id='login' src={process.env.PUBLIC_URL + '/images/login.png'} alt='login' />
                    </label>
                </div>
            </div>
            <div className='tw-daisy-navbar-end'/>
        </header>
        <div>

        </div>
        <footer className='tw-daisy-footer tw-daisy-footer-center tw-bg-neutral tw-grid-cols-3
                            tw-gap-y-5 tw-px-[25%] tw-pt-[25px] tw-pb-[15px] tw-mt-auto'>
            <div>
                <img src={process.env.PUBLIC_URL + '/images/logo_side_text.png'} alt='logo' />
            </div>
            <div className='tw-pl-[50%]'>
                <span className='tw-daisy-footer-title'>Group</span>
                <a className='tw-daisy-link tw-daisy-link-hover'>About me</a>
                <a className='tw-daisy-link tw-daisy-link-hover'>Contact</a>
            </div>
            <div className='tw-pl-[50%]'>
                <span className='tw-daisy-footer-title'>Legal</span>
                <a className='tw-daisy-link tw-daisy-link-hover'>Terms of use</a>
                <a className='tw-daisy-link tw-daisy-link-hover'>Privacy policy</a>
            </div>
            <div className='tw-col-start-1 tw-col-span-3 tw-brightness-75'>
                <p>Copyright © 2022 - All right reserved by Nawaf Osman</p>
            </div>
        </footer>
    </div>
  );
}

export default App;
