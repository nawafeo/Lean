import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Fitness() {

    const navigate = useNavigate();

    function handleClick() {
        navigate('/fitness/goal');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[29rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold '>Your Fitness</h1>
                <p className='tw-my-6'>
                    Now, you'll be asked a few basic questions about your workout and fitness goals.
                </p>
                <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-2'
                        onClick={handleClick}>Next</button>
            </div>
        </Layout>
    );
}

export default Fitness;