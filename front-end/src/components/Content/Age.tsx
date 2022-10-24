import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Age() {

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/person/update/age', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('age', data.get('age') as string);
        navigate('/info/height');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[23rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Age</h1>
                <form className='tw-daisy-form-control' onSubmit={handleSubmit}>
                    <label className='tw-daisy-label tw-ml-[10%]' htmlFor='age'>
                        <span className='tw-daisy-label-text'>Your age</span>
                    </label>
                    <input type='number' min='1' step='1' placeholder='Enter your age...'
                           className='tw-daisy-input tw-daisy-input-bordered tw-w-[80%] tw-m-auto
                           tw-bg-neutral-focus' id='age' name='age' autoComplete='new-password' required />
                    <input type='submit' value='Next'
                           className='tw-daisy-btn tw-daisy-btn-primary tw-w-[39.38%] tw-mx-auto tw-mt-4' />
                </form>
            </div>
        </Layout>
    );
}

export default Age;