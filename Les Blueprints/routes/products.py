# Import de Blueprint depuis Flask
from flask import Blueprint, jsonify


# Création d'un Blueprint dédié à la gestion des produits
# "products" est le nom du blueprint
# __name__ permet à Flask de connaître le module courant
products_bp = Blueprint("products", __name__, url_prefix="/products")


# Liste temporaire des produits
# (Dans une vraie application, ces données viendraient d'une base de données)
products = [
    {
        "id": 1, "name": "Kebab",
        "price": 9.99
    },
    {
        "id": 2,"name": "Pizza Mozza",
        "price": 12.50
    },
    {
        "id": 3,"name": "Riz Crousty",
        "price": 9.99
    },
    {
        "id": 4,"name": "Flocons d'avoine",
        "price": 1.99
    },
]

# On crée notre route dans blueprint
@products_bp.get("/")
def list_products():
    return jsonify(products)


@products_bp.get("/<int:product_id>")
def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return jsonify(product)
    return jsonify({"error": "Produit introuvable"}), 404