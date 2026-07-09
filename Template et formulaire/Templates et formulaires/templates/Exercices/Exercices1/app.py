from flask import Flask , render_template

app = Flask(__name__)

@app.route("profil")
def profil():
    prenom = "Alice"
    age = 24
    ville = "Metz"
    connecte = True

    return render_template(
        "profil.html",
        prenom=prenom,
        age=age,
        ville=ville,
        connecte=connecte
    )

if __name__ == "__main__":
    app.run(debug=True)