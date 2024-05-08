"use client"

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import axios from 'axios';
import { Button } from '@/components/ui/button';

const AdminPage: React.FC = () => {
    const [downloads, setDownloads] = useState([]);
    const [postResult, setPostResult] = useState(null);

    useEffect(() => {
        const getDownloads = async () => {
            const response = await axios.get('/api/record-download');
            setDownloads(response.data);
        };

        getDownloads();
    }, []);

    const handlePost = async () => {
        const response = await axios.post('/api/record-download', {
            userId: 'testUser',
            fileName: 'testFile',
        });
        setPostResult(response.data);
    };

    console.log(downloads, 'downloads');
    console.log(postResult, 'postResult');

    return (
        <Layout>
            <div className='flex justify-center items-center'>
                <h1>Test Page</h1>
                <Button onClick={handlePost}>Test POST</Button>
            </div>
        </Layout>
    );
};

export default AdminPage;