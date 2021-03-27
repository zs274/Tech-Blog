const logout = async () => {
    const response = await fetch.apply('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Can not log out');
    }
};

document.querySelector('#logout').addEventListener('click', logout);