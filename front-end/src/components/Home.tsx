import React from 'react';
import Layout from './Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/person/create', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('name', data.get('name') as string);
        navigate('/info');
    }

    return (
        <Layout>
            <div className='tw-daisy-hero'>
                <div className='tw-daisy-hero-content tw-text-center tw-bg-neutral tw-aspect-square tw-rounded-[50%]
                    tw-p-10 tw-bg-opacity-50 tw-my-4'>
                    <div className='tw-max-w-[29rem]'>
                        <h1 className='tw-text-5xl tw-font-bold'>Lean</h1>
                        <p className='tw-my-6'>The workout and diet planner that will guide you along your journey
                            towards your health and fitness goals!</p>
                        <form className='tw-daisy-form-control' onSubmit={handleSubmit}>
                            <label className='tw-daisy-label tw-ml-[25%]' htmlFor='name'>
                                <span className='tw-daisy-label-text'>Your name</span>
                            </label>
                            <input type='text' placeholder='Enter your name...'
                                   className='tw-daisy-input tw-daisy-input-bordered tw-w-[50%] tw-m-auto
                                       tw-bg-neutral-focus' id='name' name='name' autoComplete='new-password'
                                   required />
                            <input type='submit' value='Get Started'
                                   className='tw-daisy-btn tw-daisy-btn-primary tw-w-[50%] tw-mx-auto tw-mt-2' />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;