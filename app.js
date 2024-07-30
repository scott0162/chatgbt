let token = null;

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error:', error));
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            token = data.access_token;
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('trade-section').style.display = 'block';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function getPrice() {
    const symbol = document.getElementById('price-symbol').value;

    fetch(`http://localhost:5000/price/${symbol}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('price-display').innerText = `The price of ${symbol} is ${data.price}`;
    })
    .catch(error => console.error('Error:', error));
}

function trade() {
    const symbol = document.getElementById('trade-symbol').value;
    const quantity = document.getElementById('trade-quantity').value;
    const side = document.getElementById('trade-side').value;

    fetch('http://localhost:5000/trade', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ symbol, side, quantity })
    })
    .then(response => response.json())
    .then(data => {
        alert('Trade executed!');
    })
    .catch(error => console.error('Error:', error));
}
