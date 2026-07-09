from flask import Flask

app = Flask(__name__)

products = [
    {"id": 1, "name": "Clavier", "price": 49.99},
    {"id": 2, "name": "Souris", "price": 19.99},
    {"id": 3, "name": "Écran", "price": 149.99},
]

@app.route("/")
def home():
    return "Bienvenue sur le catalogue"

@app.route("/products")
def list_products():
    result = "<h1>Produits</h1>"

    for product in products:
        result += f"<p>{product['id']} - {product['name']} - {product['price']} €</p>"

    return result

@app.route("/products/<int:product_id>")
def product_detail(product_id):
    for product in products:
        if product["id"] == product_id:
            return f"{product['name']} coûte {product['price']} €"

    return "Produit introuvable", 404

if __name__ == "__main__":
    app.run(debug=True)