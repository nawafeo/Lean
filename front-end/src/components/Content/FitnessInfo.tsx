import React, {useEffect, useState} from 'react';
import Layout from '../Structure/Layout';
import { useNavigate } from 'react-router-dom';

function FitnessInfo() {

    const [workout, setWorkout] = useState('');
    const [routine, setRoutine] = useState('');

    const navigate = useNavigate();

    const display = {
        display: 'none'
    }

    useEffect(() => {
        getWorkout()
    }, []);

    function getWorkout() {
        const xhttp = new XMLHttpRequest();
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
        data.append('goals', JSON.parse(sessionStorage.getItem('goals')!));
        data.append('experience', sessionStorage.getItem('experience')!);
        data.append('equipment', sessionStorage.getItem('equipment')!);
        xhttp.open('POST', '/api/health/get/workout', true);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                const workout = xhttp.response;
                setWorkout(workout[0]);
                setRoutine(workout[1]);
            }
        }
        xhttp.responseType = 'json';
        xhttp.send(data);
    }

    function handleClick() {
        if (localStorage.getItem('member') === null) {
            navigate('/register');
        } else {
            navigate('/profile');
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
            case 'JOSH_CLARK_C25K':
                return 'https://runmoreapp.com/couch-to-5k/#workout-schedule';
            case 'HAL_HIGDON_N10K':
                return 'https://www.halhigdon.com/training-programs/10k-training/novice-10k/';
            case 'HAL_HIGDON_I15k':
                return 'https://www.halhigdon.com/training-programs/15k-10-mile-training/intermediate-15k-10-mile/';
            case 'BODYWEIGHT_FITNESS_RR':
                return 'https://old.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine';
            case 'BODYWEIGHT_FITNESS_BWPPL':
                return 'https://old.reddit.com/r/bodyweightfitness/wiki/move/phase5/bwppl';
            case 'ANTRANIK_PPL':
                return 'https://antranik.org/bodyweight-training/';
            case 'BODYWEIGHT_FITNESS_BWPLUS':
                return 'https://old.reddit.com/r/bodyweightfitness/wiki/bwplus';
            case 'FITNESS_BBR':
                return 'https://thefitness.wiki/routines/r-fitness-basic-beginner-routine/';
            case 'JIM_WENDLER_531':
                return 'https://www.jimwendler.com/blogs/jimwendler-com/101077382-boring-but-big';
            case 'CODY_LEFEVER_GZCLP':
                return 'https://thefitness.wiki/routines/gzclp/';
            case 'JASON_BLAHA_ICF':
                return 'https://www.muscleandstrength.com/workouts/jason-blaha-ice-cream-fitness-5x5-novice-workout';
            case 'METALLICADPA_PPL':
                return 'https://www.reddit.com/r/Fitness/comments/37ylk5/a_linear_progression_based_ppl_program_for/';
            case 'LAYNE_NORTON_PHAT':
                return 'http://simplyshredded.com/mega-feature-layne-norton-training-series-full-powerhypertrophy-' +
                    'routine-updated-2011.html';
            case 'JOE_DEFRANCO_WS4SB':
                return 'https://www.defrancostraining.com/westside-for-skinny-bastards-part3/';
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
            tw-max-w-[34rem] tw-my-4 tw-flex tw-flex-col tw-items-center'>
                <h1 className='tw-text-5xl tw-font-bold tw-mb-[6%]'>Fitness Plan</h1>
                <h2 className='tw-text-4xl tw-font-bold tw-mb-[6%]'>{workoutTitle()}</h2>
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
                <button className='tw-daisy-btn tw-daisy-btn-primary tw-w-[25%] tw-mx-auto tw-mt-8'
                        onClick={handleClick}>Next</button>
            </div>
        </Layout>
    );
}

export default FitnessInfo;