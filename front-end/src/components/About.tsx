import React from 'react';
import Layout from './Structure/Layout';

function About() {

    return (
        <Layout>
            <div className='tw-bg-neutral tw-bg-opacity-50 tw-p-20 tw-rounded-[5rem] tw-max-w-[44rem] tw-flex
            tw-flex-col tw-items-center tw-gap-y-8 tw-my-4'>
                <h1 className='tw-text-5xl tw-font-bold'>About</h1>
                <p className='tw-text-center tw-text-lg'>Lean is a simple, beginner friendly workout and diet planner
                    that will guide you along your journey towards your health and fitness goals!</p>
                <ul>
                    <p className='tw-text-center tw-text-lg tw-font-bold'>Using Lean, you'll be able to easily:</p>
                    <div>
                        <li className='tw-text-base tw-h-[1.75rem]'>
                            1. Find a workout routine based on your fitness experience and goals.
                        </li>
                        <li className='tw-text-base tw-h-[1.75rem]'>
                            2. Calculate your daily caloric intake to match your weight goals.
                        </li>
                        <li className='tw-text-base tw-h-[1.75rem]'>
                            3. Update your goals and plan at any time.
                        </li>
                        <li className='tw-text-base'>
                            4. Track your progress.
                        </li>
                    </div>
                </ul>
            </div>
        </Layout>
    );
}

export default About;