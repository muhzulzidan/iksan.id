'use client';

import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ResetDatabasePage = () => {
    const [message, setMessage] = useState('');

    const resetDatabase = async () => {
        try {
            const response = await fetch('/api/reset-database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error('Error resetting database:', error);
            setMessage('Error resetting database');
        }
    };

    return (
        <Layout metaDefault={"metaDefault"}>
            <div className="flex flex-col items-center justify-center w-full max-w-screen-lg mx-auto py-10 bg-stone-100 text-stone-950 ">
                <h2>Reset Database</h2>
                <Button onClick={resetDatabase}>Reset Database</Button>
                {message && <p>{message}</p>}
            </div>
        </Layout>
    );
};

export default ResetDatabasePage;