let _errors = [];
const validateUsername = function(username){
    if (username) {
        if (username.length > 0) {
        let regex = /^[a-zA-Z0-9.]{6,16}$/;
        if (regex.test(username)) {
            return;
        } else {
            _errors.push(
            "Your unique username must be between 6 to 16 characters and must not included any special characters. Get Creative!"
            );
        }
        } else {
            _errors.push("You must enter a unique username.");
        }
    } else {
        return;
    }
};
const validateEmail = function(email){
    if(email) {
        if(email.length > 0) {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(regex.test(email)) {
                // TODO: Check to see whether the value exists in the database already
                return;
            } else {
                _errors.push('You must enter a valid email.');
            }
        } else {
            _errors.push('You must enter an email address.');
        }
    }
};
const validatePassword = function(password){
    if (password) {
        if (password.length > 0) {
            let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$&%^&*+=_-]).{8,}$/;
            if (regex.test(password)) {
                return;
            } else {
                _errors.push(
                "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
                );
            }
        } else {
            _errors.push("You must enter a password.");
        }
    }
};
const validateConfirmationPassword = function(password, confirmPassword){
    if(password && confirmPassword) {
        if(password === confirmPassword) {
            return;
        } else {
            _errors.push('Passwords do not match.');
        }
    }
};

const validateAll = function(username, email, password, confirmPassword){
    _errors = [];
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);
    validateConfirmationPassword(password, confirmPassword);
    return _errors;
}

export default { validateAll };