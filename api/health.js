module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(
        JSON.stringify({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        })
    );
};


