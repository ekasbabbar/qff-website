module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { name, email, institution, experience, interests } = req.body || {};

        if (!name || !email || !institution || !experience) {
            return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
        }

        console.log('New registration:', {
            name,
            email,
            institution,
            experience,
            interests,
            timestamp: new Date().toISOString(),
            ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
        });

        return res.status(200).json({
            success: true,
            message: 'Registration successful! We will contact you soon.',
            registrationId: `QFF-${Date.now()}`
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


