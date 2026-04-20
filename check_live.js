const http = require('https');
http.get('https://www.anthonyspaintingservice.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const start = data.indexOf('<script type="application/ld+json">');
        const end = data.indexOf('</script>', start);
        const jsonStr = data.substring(start + 35, end).trim();
        console.log("JSON STRING FROM LIVE SITE:");
        console.log(jsonStr);
        try {
            JSON.parse(jsonStr);
            console.log("SUCCESSFULLY PARSED");
        } catch (e) {
            console.log("PARSE ERROR: ", e.message);
        }
    });
});
