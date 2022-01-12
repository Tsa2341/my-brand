
export const emailValidator = (email) => {
    const pattern = /^(.+)([a-z]+)([0-9]+)@(gmail|yahoo|andela)\.(com)\s*$/i;

    return new Promise((resolve, reject) => {
        if (email === '') {
            return reject('Please, enter your email.');
        } else {
            return (pattern.test(email)) ? resolve('') : reject('Invalid email');
        } 
    })
    
}

export const passwordValidator = (password) => {
    const pattern = /^(\d|\w){7,}$/;

    return new Promise((resolve, reject) => {
        if (password === '') {
            return reject('Please, enter your password.');
        } else {
            return (pattern.test(password)) ? resolve('') : reject('Invalid password\nPassword should be greater than 7');
        } 
    })
    
}


export const spaceValidator = (...args) => {

    let arr = [...args]
    var ans = true;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            ans = false;
            return ans;
        } else {
            ans = true;
        } 
    }

    return ans;
}
