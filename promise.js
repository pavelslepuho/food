let req = new Promise((resolve, reject) => {
    setTimeout(() => {
        let a = 1;
        console.log(a);
        resolve(a);
    }, 1000);
}).then((a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 2;
            console.log(a);
            resolve(a);
            reject();
        }, 1000);
    });
}).then((a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 3;
            console.log(a);
            resolve(a);
        }, 1000);
    });
}).then((a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            a = 4;
            console.log(a);
            resolve(a);
        }, 1000);
    });
}).catch(() => {
    console.error('Error!');
}).finally(() => {
    console.log('final');
});