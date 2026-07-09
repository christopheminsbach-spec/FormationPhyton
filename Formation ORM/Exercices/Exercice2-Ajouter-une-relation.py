#1. Définir les modèles

from sqlalchemy import (
    create_engine,
    String,
    Text,
    ForeignKey,
    select
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
    Session
)


class Base(DeclarativeBase):
    pass


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )
    description: Mapped[str | None] = mapped_column(Text)

    # Relation inverse
    products: Mapped[list["Product"]] = relationship(
        back_populates="category"
    )


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    price: Mapped[float]

    # Clé étrangère
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id")
    )

    # Relation vers Category
    category: Mapped[Category] = relationship(
        back_populates="products"
    )

#2. Créer les tables

engine = create_engine("sqlite:///shop.db")

Base.metadata.create_all(engine)

#3. Créer une catégorie et deux produits

with Session(engine) as session:

    informatique = Category(
        name="Informatique",
        description="Ordinateurs et accessoires"
    )

    produit1 = Product(
        name="PC Portable",
        price=999.99,
        category=informatique
    )

    produit2 = Product(
        name="Clavier mécanique",
        price=89.90,
        category=informatique
    )

    session.add(informatique)
    session.add_all([produit1, produit2])

    session.commit()

# 4. Afficher les produits d'une catégorie

with Session(engine) as session:

    categorie = session.scalar(
        select(Category)
        .where(Category.name == "Informatique")
    )

    print(f"Catégorie : {categorie.name}")

    for produit in categorie.products:
        print(
            f"- {produit.name} ({produit.price} €)"
        )