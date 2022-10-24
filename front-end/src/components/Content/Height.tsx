import React from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function Height() {

    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData(document.querySelector('form')!);
        if (localStorage.getItem('member') != null) {
            const xhttp = new XMLHttpRequest();
            data.append('username', localStorage.getItem('member')!);
            xhttp.open('POST', '/api/person/update/height', true);
            xhttp.send(data);
        }
        sessionStorage.setItem('feet', data.get('feet') as string);
        sessionStorage.setItem('inches', data.get('inches') as string);
        navigate('/info/weight');
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[29rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[10%]'>Height</h1>
                <form className='tw-flex tw-flex-wrap tw-justify-center tw-gap-x-4 tw-gap-y-2' onSubmit={handleSubmit}>
                    <div>
                        <label className='tw-daisy-label' htmlFor='feet'>
                            <span className='tw-daisy-label-text'>Feet</span>
                        </label>
                        <select className='tw-daisy-select tw-daisy-select-bordered tw-bg-neutral-focus' id='feet'
                                name='feet' defaultValue='' required>
                            <option value='' disabled>Pick one</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                        </select>
                    </div>
                    <div>
                        <label className='tw-daisy-label' htmlFor='inches'>
                            <span className='tw-daisy-label-text'>Inches</span>
                        </label>
                        <select className='tw-daisy-select tw-daisy-select-bordered tw-bg-neutral-focus' id='inches'
                                name='inches' defaultValue='' required>
                            <option value='' disabled>Pick one</option>
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                            <option value={11}>11</option>
                        </select>
                    </div>
                    <div className='tw-basis-[100%] tw-h-0'/>
                    <input type='submit' value='Next'
                           className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto' />
                </form>
            </div>
        </Layout>
    );
}

export default Height;