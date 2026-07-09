from sqlalchemy import create_engine, String, Text, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session


# Classe de base
class Base(DeclarativeBase):
    pass


# Modèle Category
class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    def __repr__(self):
        return f"Category(id={self.id}, name='{self.name}')"


# Création de la base SQLite
engine = create_engine("sqlite:///categories.db", echo=False)

# Création de la table
Base.metadata.create_all(engine)


# Insertion des données
with Session(engine) as session:
    categories = [
        Category(
            name="Informatique",
            description="Ordinateurs, composants et accessoires"
        ),
        Category(
            name="Livres",
            description="Romans, BD et livres techniques"
        ),
        Category(
            name="Sport",
            description="Matériel et vêtements de sport"
        )
    ]

    session.add_all(categories)
    session.commit()


# Affichage par ordre alphabétique
with Session(engine) as session:
    stmt = select(Category).order_by(Category.name)

    for category in session.scalars(stmt):
        print(
            f"ID: {category.id} | "
            f"Nom: {category.name} | "
            f"Description: {category.description}"
        )