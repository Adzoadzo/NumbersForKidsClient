export const userValidation = (data, mode) => {
    let isValid = true;
    const errors = {
        username: "",
        firstName: "",
        lastName: "",
        homeAddress: "",
        profileImage: "",
        linkedUids: "",
        notificationMessage: "",
        ignoredNotifications: "",
        password: "",
        confirmPassword: "",
    }

    // Validation logic
    if (!data.firstName) {
        errors.firstName = "Name cannot be empty";
        isValid = false;
    }

    if (!data.email) {
        errors.email = "Email cannot be empty";
        isValid = false;
    }

    if (!data.lastName) {
        errors.lastName = "Last name cannot be empty";
        isValid = false;
    }

    // if new user we need password
    if (mode === 'new') {
        if (!data.password) {
            errors.password = "Password cannot be empty";
            isValid = false;
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = "Confirm password cannot be empty";
            isValid = false;
        }

        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Confirm password and password do not match";
            isValid = false;
        }
    }

    return { isValid, errors }
}

export const quizValidation = (data, mode) => {
    let isValid = true;
    const errors = {
        name: '',
        subject: '',
        description: '',
        questions: [],
    }

    // Validation logic
    if (!data.name) {
        errors.name = "Name cannot be empty";
        isValid = false;
    }

    if (!data.subject) {
        errors.subject = "Subject cannot be empty";
        isValid = false;
    }

    if (data.questions.length === 0) {
        errors.global = "At least one question is required";
        isValid = false;
    }

    data.questions.forEach(q => {
        if (!q.text) {
            errors.global = "Question text is required";
            isValid = false;
        }

        if (q.answers.length === 0) {
            errors.global = "Question must have at least one answer";
            isValid = false;
        }

        let hasCorrect = false;
        q.answers.forEach(a => {
            if (!a.text) {
                errors.global = "Answer text is required";
                isValid = false;
            }
            if (a.correct) hasCorrect = true;
        });

        if (!hasCorrect) {
            errors.global = "Correct answer must be marked";
            isValid = false;
        }
    })


    return { isValid, errors }
}



export const setPasswordValidation = (data) => {
    let isValid = true;
    const errors = {
        password: '',
        confirmPassword: '',
    }

    // Validation logic
    if (!data.password) {
        errors.password = "Password cannot be empty";
        isValid = false;
    }

    if (!data.confirmPassword) {
        errors.confirmPassword = "Confirm password cannot be empty";
        isValid = false;
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Confirm password and password do not match";
        isValid = false;
    }


    return { isValid, errors }
}