import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout(props: any) {

    const [height, setHeight] = useState(window.innerHeight - 64 - 214 + 'px');

    const minHeight = {
        minHeight: height
    }

    window.onresize = function () {
        setHeight(window.innerHeight - 64 - 214 + 'px');
    }

    return (
        <div className='tw-flex tw-flex-col tw-min-h-[100vh]'>
            <Header />
            <div className='tw-flex tw-flex-col tw-justify-center tw-items-center
            tw-bg-gradient-to-tr tw-from-neutral tw-via-zinc-700 tw-to-neutral' style={minHeight}>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;