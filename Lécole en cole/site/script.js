function sendposte() {
    const now = new Date();

    // Formatage intelligent des nombres (ajoute un 0 si inférieur à 10)
    const f = (n) => n.toString().padStart(2, '0');

    const annee  = now.getFullYear();
    const mois   = f(now.getMonth() + 1);
    const jour   = f(now.getDate());
    const heure  = f(now.getHours());
    const minute = f(now.getMinutes());

    // Récupération des valeurs
    const titre1 = document.getElementById("TITRE1").value;
    const desc1  = document.getElementById("DESCRIPTION1").value;

    // Construction du template
    const posteHTML = `
        <article class="post">
            <h2>${titre1}</h2>
            <h5>${heure}:${minute} | ${jour}/${mois}/${annee}</h5>
            <div class="post-content">
                <p>${desc1}</p>
            </div>
        </article>
    `;

    const mainContainer = document.querySelector('#main1');
    
    if (mainContainer) {
        // "afterbegin" insère le nouveau post en haut de la liste
        // "beforeend" l'insère à la fin
        mainContainer.insertAdjacentHTML("afterend", posteHTML);
    } else {
        console.error("L'élément #main n'a pas été trouvé.");
    }
}

const express = require('express');
const multer  = require('multer');
const cors = require('cors');
const app = express();

app.use(cors()); // Autorise le front-end à communiquer avec le serveur

// Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Dossier où seront sauvés les fichiers
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Nom unique
    }
});

const upload = multer({ storage: storage });

// Route pour recevoir le fichier
app.post('/upload', upload.single('monFichier'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier reçu.');
    }
    console.log("Fichier reçu :", req.file.filename);
    res.status(200).json({ message: "Fichier uploadé avec succès" });
});

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
