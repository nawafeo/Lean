import React, {useEffect, useState} from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function DietInfo() {

    const [TDEE, setTDEE] = useState('');
    const [diet, setDiet] = useState({
        type: '',
        calories: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        getDiet()
    }, []);

    function getDiet() {
        const data = new FormData();
        data.append('name', sessionStorage.getItem('name')!);
        data.append('sex', sessionStorage.getItem('sex')!);
        data.append('age', sessionStorage.getItem('age')!);
        data.append('feet', sessionStorage.getItem('feet')!);
        data.append('inches', sessionStorage.getItem('inches')!);
        data.append('weight', sessionStorage.getItem('weight')!);
        data.append('bodyFatPercentage', sessionStorage.getItem('bodyFatPercentage')!);
        data.append('activity', sessionStorage.getItem('activity')!);
        data.append('diet', sessionStorage.getItem('diet')!);
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/api/health/get/data', true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const health = xhttp.response;
                setTDEE(health[2]);
                if (health[2] > health[3]) {
                    setDiet({type: 'cut', calories: health[3]});
                    return;
                } else if (health[2] < health[3]) {
                    setDiet({type: 'bulk', calories: health[3]});
                    return;
                } else {
                    setDiet({type: 'maintain', calories: health[3]});
                    return;
                }
            }
        }
        xhttp.responseType = 'json';
        xhttp.send(data);
    }

    function handleClick() {
        navigate('/diet/protein');
    }

    function dietTitle() {
        if (diet.type === 'cut') {
            return 'Cutting Calories';
        } else if (diet.type === 'bulk') {
            return 'Bulking Calories';
        } else if (diet.type === 'maintain') {
            return 'Maintenance Calories';
        }
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-max-w-[38.9rem] tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[6%]'>Diet Plan</h1>
                <div className='tw-daisy-stats tw-shadow tw-border-4 tw-border-neutral'>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-text-primary'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                 className='tw-inline-block tw-w-8 tw-h-8 tw-stroke-current'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                      d='M13 0 L4 14 h7 l-1 10 l9-14 h-7 z' />
                            </svg>
                        </div>
                        <p className='tw-daisy-stat-title'>TDEE</p>
                        <p className='tw-daisy-stat-value'>{TDEE}</p>
                    </div>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-col-start-1'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                 className='tw-inline-block tw-w-10 tw-h-10 tw-stroke-current'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'
                                      d='M12.0063 7.31853C12.326 7.03878 12.812 7.07117 13.0917 7.39089L16.6815
                                      11.4935C16.9352 11.7835 16.9352 12.2165 16.6815 12.5065L13.0917 16.6091C12.812
                                      16.9288 12.326 16.9612 12.0063 16.6815C11.6866 16.4017 11.6542 15.9157 11.9339
                                      15.596L14.4074 12.7692H7.89744C7.4726 12.7692 7.12821 12.4248 7.12821 12C7.12821
                                      11.5752 7.4726 11.2308 7.89744 11.2308H14.4074L11.9339 8.40398C11.6542 8.08426
                                      11.6866 7.59829 12.0063 7.31853Z' fill='#DCA54C' />
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='0.5'
                                      d='M12 3.53846C9.83082 3.53846 6.86615 3.73753 5.01495 3.88095C4.40616 3.92811
                                      3.92811 4.40616 3.88095 5.01495C3.73753 6.86615 3.53846 9.83082 3.53846
                                      12C3.53846 14.1692 3.73753 17.1338 3.88095 18.985C3.92811 19.5938 4.40616
                                      20.0719 5.01495 20.1191C6.86615 20.2625 9.83082 20.4615 12 20.4615C14.1692
                                      20.4615 17.1338 20.2625 18.985 20.1191C19.5938 20.0719 20.0719 19.5938 20.1191
                                      18.985C20.2625 17.1338 20.4615 14.1692 20.4615 12C20.4615 9.83082 20.2625 6.86615
                                      20.1191 5.01495C20.0719 4.40616 19.5938 3.92811 18.985 3.88095C17.1338 3.73753
                                      14.1692 3.53846 12 3.53846ZM4.89612 2.34708C6.74819 2.2036 9.76547 2 12 2C14.2345
                                      2 17.2518 2.2036 19.1039 2.34708C20.4686 2.45281 21.5472 3.53141 21.6529
                                      4.89612C21.7964 6.74819 22 9.76547 22 12C22 14.2345 21.7964 17.2518 21.6529
                                      19.1039C21.5472 20.4686 20.4686 21.5472 19.1039 21.6529C17.2518 21.7964 14.2345
                                      22 12 22C9.76547 22 6.74819 21.7964 4.89612 21.6529C3.53141 21.5472 2.45281
                                      20.4686 2.34708 19.1039C2.2036 17.2518 2 14.2345 2 12C2 9.76547 2.2036 6.74819
                                      2.34708 4.89612C2.45281 3.53141 3.53141 2.45281 4.89612 2.34708Z' fill='#DCA54C' />
                            </svg>
                        </div>
                    </div>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-text-primary'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='-2 -2 24 24'
                                 className='tw-inline-block tw-w-10 tw-h-10 tw-stroke-current'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5'
                                      d='M18 11v7a2 2 0 0 1-4 0v-5h-2V3a3 3 0 0 1 3-3h3v11zM4 10a2 2 0 0 1-2-2V1a1
                                      1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v7a2 2 0 0 1-2 2v8a2 2 0 0
                                      1-4 0v-8z' />
                            </svg>
                        </div>
                        <p className='tw-daisy-stat-title'>{dietTitle()}</p>
                        <p className='tw-daisy-stat-value'>{diet.calories}</p>
                    </div>
                </div>
                <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-8'
                        onClick={handleClick}>Next</button>
            </div>
        </Layout>
    );
}

export default DietInfo;