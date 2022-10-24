import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Activity() {

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/health/create', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('activity', data.get('activity') as string);
        navigate('/info/submit');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Activity Level</h1>
                <form className='tw-flex tw-flex-wrap tw-gap-y-1' onSubmit={handleSubmit}>
                    <label className='tw-daisy-label' htmlFor='activity'>
                        <span className='tw-daisy-label-text'>Your activity level</span>
                    </label>
                    <input type='range' min={0} max={100} step={25} defaultValue={0} className='tw-daisy-range'
                           id='activity' name='activity' />
                    <div className='tw-w-full tw-flex tw-justify-between tw-text-xs tw-px-[0.6rem]'>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                    </div>
                    <div className='tw-w-full tw-flex tw-justify-between tw-text-xs'>
                        <span className='tw-ml-[-2.5%]'>Sedentary</span>
                        <span className='tw-ml-[-1%]'>Light</span>
                        <span className='tw-ml-[-1%]'>Moderate</span>
                        <span className='tw-ml-[-1%]'>Heavy</span>
                        <span className='tw-mr-[-1.5%]'>Athlete</span>
                    </div>
                    <input type='submit' value='Submit'
                           className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-8' />
                </form>
            </div>
        </Layout>
    );
}

export default Activity;