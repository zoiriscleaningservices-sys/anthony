const http = require('https');
http.get('https://www.anthonyspaintingservice.com/', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        let count = 0;
        let index = data.indexOf('<script type="application/ld+json">');
        while (index !== -1) {
            count++;
            const end = data.indexOf('</script>', index);
            console.log("JSON TAG " + count + ":");
            console.log(data.substring(index + 35, end).trim());
            index = data.indexOf('<script type="application/ld+json">', end);
        }
    });
});
