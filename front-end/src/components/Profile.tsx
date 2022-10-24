import React, {useEffect, useState} from 'react';
import Layout from './Structure/Layout';

function Profile() {

    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [BFP, setBFP] = useState('');
    const [activity, setActivity] = useState('');
    const [BMI, setBMI] = useState('');
    const [BMR, setBMR] = useState('');
    const [TDEE, setTDEE] = useState('');
    const [diet, setDiet] = useState({
        type: '',
        calories: ''
    });
    const [protein, setProtein] = useState('');
    const [workout, setWorkout] = useState('');
    const [routine, setRoutine] = useState('');

    const display = {
        display: 'none'
    }

    useEffect(() => {
        getData()
    }, []);

    function getData() {
        const data = new FormData();
        const xhttp = new XMLHttpRequest();
        data.append('username', localStorage.getItem('member')!);
        xhttp.open('POST', '/api/health/get/all', true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const data = xhttp.response;
                setName(data[0].person.name);
                setSex(data[0].person.sex);
                setAge(data[0].person.age);
                setHeight(Math.floor(data[0].person.height / 12) + "' " + data[0].person.height % 12 + '"');
                setWeight(data[0].person.weight);
                if (data[0].person.bodyFatPercentage === null) {
                    setBFP('N/A');
                } else {
                    setBFP(data[0].person.bodyFatPercentage);
                }
                setActivity(data[0].activity);
                setBMI(data[1][0]);
                setBMR(data[1][1]);
                setTDEE(data[1][2]);
                if (data[1][2] > data[1][3]) {
                    setDiet({type: 'cut', calories: data[1][3]});
                } else if (data[1][2] < data[1][3]) {
                    setDiet({type: 'bulk', calories: data[1][3]});
                } else {
                    setDiet({type: 'maintain', calories: data[1][3]});
                }
                setProtein(data[1][4]);
                setWorkout(data[2]);
                setRoutine(data[3]);
            }
        }
        xhttp.responseType = 'json';
        xhttp.send(data);
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

    function workoutTitle() {
        if (workout[0] === 'LISS') {
            return 'Endurance Routine';
        } else if (workout[0] === 'BODYBUILDING') {
            if (workout.length === 2) {
                if (workout[1] === 'LISS') {
                    return 'Bodybuilding + LISS Routine';
                }
                return 'Calisthenics Routine';
            } else if (workout.length === 3) {
                return 'Calisthenics + LISS Routine';
            }
            return 'Bodybuilding Routine';
        } else if (workout[0] === 'POWERLIFTING') {
            if (workout.length === 2) {
                if (workout[1] === 'LISS') {
                    return 'Powerlifting + LISS Routine';
                }
                return 'Calisthenics Routine';
            } else if (workout.length === 3) {
                return 'Calisthenics + LISS Routine';
            }
            return 'Powerlifting Routine';
        } else if (workout[0] === 'POWERBUILDING') {
            if (workout.length === 2) {
                return 'Calisthenics Routine';
            }
            return 'Powerbuilding Routine';
        }
    }

    function routineTitle() {
        switch (routine) {
            case 'JOSH_CLARK_C25K': return 'Couch to 5K';
            case 'HAL_HIGDON_N10K': return 'Novice 10K';
            case 'HAL_HIGDON_I15k': return 'Intermediate 15K';
            case 'BODYWEIGHT_FITNESS_RR': return 'Recommended Routine';
            case 'BODYWEIGHT_FITNESS_BWPPL': return 'Bodyweight Push/Pull/Legs';
            case 'ANTRANIK_PPL': return 'Push/Pull/Legs Split';
            case 'BODYWEIGHT_FITNESS_BWPLUS': return 'Bodyweight+';
            case 'FITNESS_BBR': return 'Basic Beginner Routine';
            case 'JIM_WENDLER_531': return '5/3/1 - Boring But Big';
            case 'CODY_LEFEVER_GZCLP': return 'GZCLP';
            case 'JASON_BLAHA_ICF': return 'Ice Cream Fitness 5x5';
            case 'METALLICADPA_PPL': return 'Push/Pull/Legs';
            case 'LAYNE_NORTON_PHAT': return 'PHAT: Power Hypertrophy Adaptive Training';
            case 'JOE_DEFRANCO_WS4SB': return 'Westside for Skinny Bastards III';
        }
    }

    function routineAuthor() {
        switch (routine) {
            case 'JOSH_CLARK_C25K': return 'Josh Clark';
            case 'HAL_HIGDON_N10K': return 'Hal Higdon';
            case 'HAL_HIGDON_I15k': return 'Hal Higdon';
            case 'BODYWEIGHT_FITNESS_RR': return 'r/BodyweightFitness';
            case 'BODYWEIGHT_FITNESS_BWPPL': return 'user/Jokester';
            case 'ANTRANIK_PPL': return 'Antranik Kizirian';
            case 'BODYWEIGHT_FITNESS_BWPLUS': return 'user/Jokester';
            case 'FITNESS_BBR': return 'r/Fitness';
            case 'JIM_WENDLER_531': return 'Jim Wendler';
            case 'CODY_LEFEVER_GZCLP': return 'Cody Lefever';
            case 'JASON_BLAHA_ICF': return 'Jason Blaha';
            case 'METALLICADPA_PPL': return 'user/Metallicadpa';
            case 'LAYNE_NORTON_PHAT': return 'Dr. Layne Norton';
            case 'JOE_DEFRANCO_WS4SB': return 'Joe Defranco';
        }
    }

    function routineLink() {
        switch (routine) {
            case 'JOSH_CLARK_C25K': return 'https://runmoreapp.com/couch-to-5k/#workout-schedule';
            case 'HAL_HIGDON_N10K': return 'https://www.halhigdon.com/training-programs/10k-training/novice-10k/';
            case 'HAL_HIGDON_I15k': return 'https://www.halhigdon.com/training-programs/15k-10-mile-training/intermediate-15k-10-mile/';
            case 'BODYWEIGHT_FITNESS_RR': return 'https://old.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine';
            case 'BODYWEIGHT_FITNESS_BWPPL': return 'https://old.reddit.com/r/bodyweightfitness/wiki/move/phase5/bwppl';
            case 'ANTRANIK_PPL': return 'https://antranik.org/bodyweight-training/';
            case 'BODYWEIGHT_FITNESS_BWPLUS': return 'https://old.reddit.com/r/bodyweightfitness/wiki/bwplus';
            case 'FITNESS_BBR': return 'https://thefitness.wiki/routines/r-fitness-basic-beginner-routine/';
            case 'JIM_WENDLER_531': return 'https://www.jimwendler.com/blogs/jimwendler-com/101077382-boring-but-big';
            case 'CODY_LEFEVER_GZCLP': return 'https://thefitness.wiki/routines/gzclp/';
            case 'JASON_BLAHA_ICF': return 'https://www.muscleandstrength.com/workouts/jason-blaha-ice-cream-fitness-5x5-novice-workout';
            case 'METALLICADPA_PPL': return 'https://www.reddit.com/r/Fitness/comments/37ylk5/a_linear_progression_based_ppl_program_for/';
            case 'LAYNE_NORTON_PHAT': return 'http://simplyshredded.com/mega-feature-layne-norton-training-series-full-powerhypertrophy-routine-updated-2011.html';
            case 'JOE_DEFRANCO_WS4SB': return 'https://www.defrancostraining.com/westside-for-skinny-bastards-part3/';
        }
    }

    function routineEndurance() {
        if (workout.length > 1 && workout[1] === 'LISS') {
            display.display = 'flex';
            return '150 Minutes of Low Intensity Steady State Cardio per Week';
        }
    }

    return (
        <Layout>
            <div className='tw-text-center tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem]
            tw-min-w-[44rem] tw-flex tw-flex-col tw-items-center tw-gap-y-8 tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold'>Profile</h1>
                <div className='tw-flex tw-flex-col tw-items-center tw-gap-y-8'>
                    <table className='tw-daisy-table'>
                        <thead>
                        <tr>
                            <th/>
                            <th>Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                            <th>Height</th>
                            <th>Weight (lbs)</th>
                            <th>Body Fat %</th>
                            <th>Activity Level</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th/>
                            <td>{name}</td>
                            <td>{sex.charAt(0) + sex.slice(1).toLowerCase()}</td>
                            <td>{age}</td>
                            <td>{height}</td>
                            <td>{weight}</td>
                            <td>{BFP}</td>
                            <td>{activity.charAt(0) + activity.slice(1).toLowerCase()}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h2 className='tw-text-4xl tw-font-bold'>Health</h2>
                    <div className='tw-daisy-stats tw-shadow tw-border-4 tw-border-neutral'>
                        <div className='tw-daisy-stat'>
                            <div className='tw-daisy-stat-figure tw-text-primary'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                     className='tw-inline-block tw-w-8 tw-h-8 tw-stroke-current'>
                                    <circle cx={12} cy={7} r={6} strokeLinecap='round' strokeLinejoin='round'
                                            strokeWidth='2' />
                                    <circle cx={12} cy={24} r={11} strokeLinecap='round' strokeLinejoin='round'
                                            strokeWidth='2' />
                                    <line x1={0} y1={23} x2={24} y2={23} strokeLinecap='round' strokeLinejoin='round'
                                          strokeWidth='2' />
                                </svg>
                            </div>
                            <p className='tw-daisy-stat-title'>BMI</p>
                            <p className='tw-daisy-stat-value'>{BMI}</p>
                            <p className='tw-daisy-stat-desc'>Body Mass Index</p>
                        </div>
                        <div className='tw-daisy-stat'>
                            <div className='tw-daisy-stat-figure tw-text-primary'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                     className='tw-inline-block tw-w-8 tw-h-8 tw-stroke-current'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                                          d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0
                                          00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                                </svg>
                            </div>
                            <p className='tw-daisy-stat-title'>BMR</p>
                            <p className='tw-daisy-stat-value'>{BMR}</p>
                            <p className='tw-daisy-stat-desc'>Basal Metabolic Rate</p>
                        </div>
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
                            <p className='tw-daisy-stat-desc'>Total Daily Energy Expenditure</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='tw-text-4xl tw-font-bold tw-mb-[6%]'>Diet Plan</h1>
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
                </div>
                <div className='tw-daisy-stats tw-shadow tw-border-4 tw-border-neutral tw-mt-[-2%]'>
                    <div className='tw-daisy-stat'>
                        <div className='tw-daisy-stat-figure tw-text-primary'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 512 512'
                                 className='tw-inline-block tw-w-10 tw-h-10 tw-stroke-current'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='30'
                                      d='M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16
                                      16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64
                                      224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256
                                      32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16
                                      16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1
                                      16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z' />
                            </svg>
                        </div>
                        <p className='tw-daisy-stat-title'>Protein Intake</p>
                        <p className='tw-daisy-stat-value'>
                            {protein}<span className='tw-text-[1.75rem]'> g</span>
                        </p>
                    </div>
                </div>
                <div className='tw-flex tw-flex-col tw-items-center'>
                    <h1 className='tw-text-4xl tw-font-bold tw-mb-[6%]'>Fitness Plan</h1>
                    <h2 className='tw-text-3xl tw-font-bold tw-mb-[6%]'>{workoutTitle()}</h2>
                    <div className='tw-daisy-card tw-w-96 tw-bg-neutral tw-shadow-xl'>
                        <div className='tw-daisy-card-body tw-items-center'>
                            <h2 className='tw-daisy-card-title'>{routineTitle()}</h2>
                            <p className='tw-mt-[-1%]'>{routineAuthor()}</p>
                            <div className='tw-daisy-card-actions tw-mt-[4%]'>
                                <a href={routineLink()} target='_blank' rel='noopener noreferrer'>
                                    <button className='tw-daisy-btn tw-daisy-btn-primary'>View Program</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='tw-daisy-card tw-w-96 tw-bg-neutral tw-shadow-xl tw-mt-[4%]' style={display}>
                        <div className='tw-daisy-card-body tw-items-center'>
                            <h2 className='tw-daisy-card-title'>{routineEndurance()}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;