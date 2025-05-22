// Fetch user data
fetch('/user')
    .then(response => response.json())
    .then(data => {
        const user = data.user;
        if (user) {
            document.querySelector('p').textContent = `Hello ${user.name}`;
        }
    })
    .catch(error => console.error('Error:', error));
