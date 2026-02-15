const fetch = require('node-fetch'); // If node-fetch isn't installed, native fetch works in Node 18+

const API_URL = 'http://localhost:5000/api';

const testApi = async () => {
    try {
        console.log('Logging in as admin...');
        const loginRes = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            body: JSON.stringify({ email: 'admin@hopeplates.com', password: 'Admin@123' }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!loginRes.ok) {
            const error = await loginRes.json();
            throw new Error(`Login failed: ${JSON.stringify(error)}`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Login successful. Token obtained.');
        console.log('User Role:', loginData.user.role);

        console.log('Fetching donations...');
        const donationsRes = await fetch(`${API_URL}/donations`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!donationsRes.ok) {
            const error = await donationsRes.json();
            throw new Error(`Donations fetch failed: ${JSON.stringify(error)}`);
        }

        const donations = await donationsRes.json();
        console.log(`Status: ${donationsRes.status}`);
        console.log(`Donations found: ${donations.length}`);

        if (donations.length > 0) {
            console.log('First donation:', donations[0]);
        } else {
            console.log('No donations returned from API.');
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
};

testApi();
