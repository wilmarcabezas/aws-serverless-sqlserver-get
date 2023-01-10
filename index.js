const to = "nicolasalexandercabezasmonroy@gmail.com,wilmar.cabezas@gmail.com";
const To_array = to.split(',');
for (const email of To_array) {
    console.log(email);
}
    
for (const email of To_array) {
    console.log(email)
    const params = {
        Destination: {
            ToAddresses: email,
        },
        Message: {
            Body: {
                Text: { Data: '12' },
            },
            Subject: { Data: 'subject' },
        },
        Source: 'from',
    };
    
    console.log(params);
}