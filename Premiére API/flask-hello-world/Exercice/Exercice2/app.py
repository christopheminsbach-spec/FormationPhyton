from flask import Flask, request # on importe la classe Flask et l'objet request du module flask

app = Flask(__name__) # on crée une instance de la classe Flask

hello = [
    {"id": 1, "firstname": "Alice"},
    {"id":2, "firstname": "Nicolas"},
    {"id":3, "firstname": "Sarah"}
]

age = [
    {"id": 1, "username": "Alice", "age": 25},
    {"id": 2 , "username": "Nicolas", "age": 30},
    {"id": 3 , "username": "Sarah", "age": 28}
]

@app.route("/hello/<firstname>")
def hello(firstname):
    return f"<h1>Bonjour {firstname} !</h1>"

@app.route("/users/<username>/age/<int:age>")
def users(username, age):
    return f"<h1>Utilisateur: {username}, Âge: {age}</h1>"

if __name__ == "__main__": # si le script est exécuté directement, on lance l'application Flask
    app.run(debug=True)


    """
    Tests à effectuer

Lancez l'application :

python app.py

Puis ouvrez votre navigateur et testez :

URL	Résultat attendu
http://127.0.0.1:5000/hello/alice	Bonjour alice
http://127.0.0.1:5000/hello/nicolas	Bonjour nicolas
http://127.0.0.1:5000/hello/sarah	Bonjour sarah
http://127.0.0.1:5000/users/alice/age/25	alice a 25 ans
http://127.0.0.1:5000/users/paul/age/42	paul a 42 ans
Test avec un âge non numérique

Essayez par exemple :

http://127.0.0.1:5000/users/alice/age/abc

Résultat :

Flask ne trouve pas de route correspondante, car <int:age> accepte uniquement des nombres entiers.
Le serveur renvoie une erreur 404 Not Found. C'est le comportement attendu.
    
    """