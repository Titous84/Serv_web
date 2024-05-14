function createUser() {
    const courriel = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nom = document.getElementById('nom').value; 
    const prenom = document.getElementById('prenom').value; 

    fetch('http://localhost:3000/api/utilisateurs/creer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courriel, password, nom, prenom }) 
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
    const courriel = document.getElementById('emailKey').value;
    const password = document.getElementById('passwordKey').value;

    fetch('http://localhost:3000/api/utilisateurs/nouvelle-cle-api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courriel, password })
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
