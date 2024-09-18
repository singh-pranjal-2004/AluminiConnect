// server.mjs
// Code By Pranjal

import express from 'express';
import fetch from 'node-fetch';
import ObjectsToCsv from 'objects-to-csv';

const app = express();
const port = 3000;

app.use(express.static('public'));

async function getJobData() {
    const url = `https://unstop.com/api/public/opportunity/search-result?opportunity=jobs&per_page=15&searchTerm=software%20developer&oppstatus=recent&page=1`;
    let range = 0;
    let jobs_data = [];
    
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        range = data.data.last_page;

        for (let i = 0; i < data.data.data.length; i++) {
            const job = data.data.data[i];
            if(job.regnRequirements?.remain_days !== 'Ended'){
                jobs_data.push({
                    title: job.title || 'N/A',
                    logo: job.logoUrl2 || 'N/A',
                    company: job.organisation?.name || 'N/A',
                    link: job.seo_url || 'N/A',
                    location: job.jobDetail?.locations || ['N/A'],
                    date: job.regnRequirements?.remain_days || 'N/A',
                });
            }
            
        }
        
        for (let j = 2; j <= 1; j++) {
            const url1 = `https://unstop.com/api/public/opportunity/search-result?opportunity=jobs&per_page=15&searchTerm=software%20developer&oppstatus=recent&page=${j}`;

            const response = await fetch(url1);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            for (let i = 0; i < data.data.data.length; i++) {
                const job = data.data.data[i];
                if(job.regnRequirements?.remain_days !== 'Ended'){
                    jobs_data.push({
                        title: job.title || 'N/A',
                        logo: job.logoUrl2 || 'N/A',
                        company: job.organisation?.name || 'N/A',
                        link: job.seo_url || 'N/A',
                        location: job.jobDetail?.locations || ['N/A'],
                        date: job.regnRequirements?.remain_days || 'N/A',
                    });
                }
                
            }
        }

        const csv = new ObjectsToCsv(jobs_data);
        await csv.toDisk('./UnstopJobs2.csv', { append: true });

        return jobs_data;

    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
}

app.get('/jobs', async (req, res) => {
    const jobs_data = await getJobData();
    res.json(jobs_data);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Code By Pranjal
