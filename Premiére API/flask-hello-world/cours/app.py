## 6. Première application Flask

from flask import Flask, request # on importe la classe Flask et l'objet request du module flask

from flask import Flask # on importe la classe Flask du module flask

app = Flask(__name__) # on crée une instance de la classe Flask

@app.route("/") # @app.route() est un décorateur qui associe une URL à une fonction
def home():
    return "<h1>Bienvenue sur notre application Flask !</h1>"

@app.route("/about")
def about():
    return "<h1>À propos</h1><p>Ceci est une page à propos de notre application Flask.</p>"

@app.route("/users/<username>")
def user_profile(username):
    if not username.isalnum():  # Vérifie si le nom d'utilisateur contient uniquement des caractères alphanumériques
        return "<h1>Erreur</h1><p>Nom d'utilisateur invalide. Veuillez utiliser uniquement des lettres et des chiffres.</p>", 404
    return f"<h1>Profil de {username}</h1><p>Bienvenue sur la page de profil de {username}.</p>"

@app.route("/search")
def search():
    query = request.args.get("q")  # Récupère le paramètre de requête "q" de l'URL
    if query:
        return f"<h1>Résultats de recherche pour : {query}</h1>"
    else:
        return "<h1>Recherche</h1><p>Aucun terme de recherche fourni.</p>"

if __name__ == "__main__": # si le script est exécuté directement, on lance l'application Flask
    app.run(debug=True)


