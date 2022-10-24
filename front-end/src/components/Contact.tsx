import React, { FormEvent, useState } from 'react';
import Layout from './Structure/Layout';

function Contact() {

    const [confirmation, setConfirmation] = useState('none');

    const display = {
        display: confirmation
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/email/send', true);
        xhttp.send(data);
        setConfirmation('flex');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[44rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[4%]'>Contact</h1>
                <p className='tw-grid tw-text-sm tw-mb-[4%]'>Note: Your message is anonymous. You can e-mail me directly
                    at: lean.wdp@gmail.com.</p>
                <div className='tw-daisy-alert tw-daisy-alert-success tw-shadow-lg tw-justify-center tw-mb-2'
                     style={display}>
                    <div>
                        <svg xmlns='http://www.w3.org/2000/svg' className='tw-stroke-current tw-flex-shrink-0 tw-h-6
                        tw-w-6' fill='none' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                        </svg>
                        <span>Sent!</span>
                    </div>
                </div>
                <form className='tw-flex tw-flex-col tw-gap-y-2' onSubmit={handleSubmit}>
                    <div>
                        <label className='tw-daisy-input-group'>
                            <span className='tw-flex tw-justify-center tw-bg-neutral tw-w-[10rem]'>Subject</span>
                            <input type='text' placeholder='Subject' className='tw-daisy-input
                            tw-bg-neutral-focus tw-w-[50rem] tw-daisy-input-bordered' autoComplete='new-password'
                                   id='subject' name='subject' required />
                        </label>
                    </div>
                    <div>
                        <label className='tw-daisy-input-group'>
                            <span className='tw-flex tw-justify-center tw-bg-neutral tw-w-[10rem]'>Message</span>
                            <textarea placeholder='Message...' className='tw-daisy-textarea
                            tw-bg-neutral-focus tw-w-[50rem] tw-min-h-[14rem] tw-resize-none
                            tw-daisy-textarea-bordered' autoComplete='new-password' id='body' name='body' required/>
                        </label>
                    </div>
                    <div className='tw-basis-[100%] tw-h-0'/>
                    <input type='submit' value='Send'
                           className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto' />
                </form>
            </div>
        </Layout>
    );
}

export default Contact;