import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Person() {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/info/sex');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
                tw-max-w-[29rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold '>About You</h1>
                <p className='tw-my-6'>To get started, you'll be asked a few basic questions about you and your
                    physique.</p>
                <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-2'
                        onClick={handleClick}>Next</button>
            </div>
        </Layout>
    );
}

export default Person;