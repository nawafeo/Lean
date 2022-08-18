import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {

    return (
        <footer className='tw-daisy-footer tw-daisy-footer-center tw-bg-neutral tw-grid-cols-3
                            tw-gap-y-5 tw-px-[25%] tw-pt-[25px] tw-pb-[15px] tw-mt-auto'>
            <div>
                <img src={process.env.PUBLIC_URL + '/images/logo_side_text.png'} alt='Lean logo side text' />
            </div>
            <div className='tw-pl-[50%]'>
                <span className='tw-daisy-footer-title'>Group</span>
                <Link className='tw-daisy-link tw-daisy-link-hover' to='/about-me'>About me</Link>
                <Link className='tw-daisy-link tw-daisy-link-hover' to='/connect'>Connect</Link>
            </div>
            <div className='tw-pl-[50%]'>
                <span className='tw-daisy-footer-title'>Legal</span>
                <Link className='tw-daisy-link tw-daisy-link-hover' to='/terms'>Terms of use</Link>
                <Link className='tw-daisy-link tw-daisy-link-hover' to='/privacy'>Privacy policy</Link>
            </div>
            <div className='tw-col-start-1 tw-col-span-3 tw-brightness-75'>
                <p>Copyright © 2022 - All right reserved by Nawaf Osman</p>
            </div>
        </footer>
    );
}

export default Footer;