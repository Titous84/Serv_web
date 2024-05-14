function createUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const title = document.getElementById('title').value; 
    const startDate = document.getElementById('startDate').value; 

    fetch('http://localhost:3000/api/utilisateurs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, title, startDate }) 
    })
    .then(response => response.json())
    .then(data => {
        console.log('Utilisateur créé:', data);
        alert('Utilisateur créé avec succès! Clé API: ' + data.apiKey);
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la création de l\'utilisateur.');
    });
}

function regenerateApiKey() {
    const email = document.getElementById('emailKey').value;
    const password = document.getElementById('passwordKey').value;

    fetch('http://localhost:3000/api/utilisateurs/new-apikey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Nouvelle clé API:', data);
        alert('Nouvelle clé API générée avec succès: ' + data.newApiKey);
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la régénération de la clé API.');
    });
}
