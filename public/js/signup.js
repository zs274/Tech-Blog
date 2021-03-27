const signupForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!name | !email | !password) {
            alert('Please fill in all fields');
        }
    
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Can not sign up');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupForm);