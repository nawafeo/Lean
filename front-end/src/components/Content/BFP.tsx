import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function BFP() {

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/person/update/BFP', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('bodyFatPercentage', data.get('bodyFatPercentage') as string);
        navigate('/info/activity');
    }

    function handleClick() {
        const data = new FormData();
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('bodyFatPercentage', '0');
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/person/update/BFP', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('bodyFatPercentage', '0');
        navigate('/info/activity');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-3xl tw-font-bold tw-mb-[5%]'>Optional:</h1>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Body Fat Percentage</h1>
                <form className='tw-daisy-form-control' onSubmit={handleSubmit}>
                    <label className='tw-daisy-label tw-ml-[22.5%]' htmlFor='bodyFatPercentage'>
                        <span className='tw-daisy-label-text'>Your body fat percentage</span>
                    </label>
                    <input type='number' min='1' max='100' step='1' placeholder='Enter your body fat percentage...'
                           className='tw-daisy-input tw-daisy-input-bordered tw-w-[55%] tw-m-auto
                    tw-bg-neutral-focus' id='bodyFatPercentage' name='bodyFatPercentage'
                           autoComplete='new-password' />
                    <input type='submit' style={{display: 'none'}} />
                    <button className='tw-daisy-btn tw-w-[25%] tw-mx-auto tw-mt-[0.5rem]' onClick={handleClick}>
                        Skip
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default BFP;