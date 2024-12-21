import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 3001;

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // Remplacez par votre utilisateur MySQL
  password: 'mohcin',   // Remplacez par votre mot de passe MySQL
  database: 'my_activities_db',
  port:3307
});

// Connexion à MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Configuration de CORS et des fichiers statiques
app.use(cors());
app.use(express.static('public'));  // Pour servir les fichiers statiques comme les images

// Route pour récupérer les activités depuis la base de données
app.get('/activities', (req, res) => {
  db.query('SELECT * FROM activities', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des données:', err);
      res.status(500).send('Erreur du serveur');
    } else {
      res.json(results);  // Envoi des données au frontend
    }
  });
});

// Lancer le serveur sur le port 3000
app.listen(port, () => {
  console.log(`Le serveur tourne sur http://localhost:${port}`);
});
