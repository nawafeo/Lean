import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout(props: any) {

    return (
        <div className='tw-flex tw-flex-col tw-min-h-[100vh]'>
            <Header />
            {props.children}
            <Footer />
        </div>
    );
}

export default Layout;