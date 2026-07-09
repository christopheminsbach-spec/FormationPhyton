from flask import Flask, request # on importe la classe Flask et l'objet request du module flask

app = Flask(__name__) # on crée une instance de la classe Flask

@app.route("/")
def home():
    return "<h1>Bienvenue sur mon application Flask !</h1>"

@app.route("/about")
def about():
    return "<h1> Cette application est une premiére démo Flask </h1>"

@app.route("/contact")
def contact():
    return "<a href='mailto:contact@example.com'>Contact : contact@example.com</a>"

if __name__ == "__main__": # si le script est exécuté directement, on lance l'application Flask
    app.run(debug=True)