'use client';

import { Label, TextInput, Flowbite } from 'flowbite-react';

import {Mailbox} from "react-bootstrap-icons"

export default function SubscribeUs() {

    const customTheme = {
        field: {
            input: {
                colors: {
                    gray: "bg-rose-600 border-rose-600 text-white focus:border-cyan-500 focus:ring-cyan-500 dark:border-stone-600 dark:bg-stone-700 dark:text-white dark:placeholder-stone-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                }
            }
        },
    };


    return (
        <div className="max-w-md shadow-lg flex flex-col gap-4 bg-stone-50 rounded-md text-stone-950 py-8 p-10">
            <div className='flex flex-col gap-2 text-center mb-4'>
                <h3 className='text-xl font-bold'>
                    Get Freebies & Weekly Insights
                </h3>
                <p className='text-sm text-stone-800'>Put your email and name. And then you can get regular insightful email from me & my team.</p>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        className='text-stone-950'
                        htmlFor="email4"
                        value="Your email"
                    />
                </div>
                {/* <Flowbite theme={{ theme: customTheme }}> */}
                <TextInput
                    color={"gray"}
                    // theme={customTheme}
                    id="email2"
                    placeholder="name@gmail.com"
                    required
                    type="email"
                />
                {/* </Flowbite> */}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        className='text-stone-950 '
                        htmlFor="username"
                        value="Username"
                    />
                </div>
                <TextInput
                    // addon="@"
                    className="bg-stone-50"
                    id="username3"
                    placeholder="Bonnie Green"
                    required
                />
            </div>
        </div>
    )
}


