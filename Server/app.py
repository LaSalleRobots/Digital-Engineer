import flask
from flask import Flask, request
from flask_graphql import GraphQLView
import base64
import datetime

from schema import schema

app = Flask(__name__)

app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

if __name__ == "__main__":
    import pymongo

    client = pymongo.MongoClient()
    db = client["digital-engineer"]
    try:
        db["authors"].create_index(
            [("name", pymongo.TEXT), ("position", pymongo.TEXT)],
            weights={"name": 5, "position": 1},
        )
    except Exception as e:
        print(e)
        pass
    try:
        db["notes"].create_index(
            [("name", pymongo.TEXT), ("body", pymongo.TEXT)],
            weights={"name": 5, "body": 1},
        )
    except Exception as e:
        print(e)
        pass
    app.run("0.0.0.0", "5000", load_dotenv=True)
