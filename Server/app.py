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


@app.route("/api/v1/save", methods=["POST"])
def saveImage():
    imgdata = base64.b64decode(request.data)
    with open(f"{datetime.datetime.now()}.png", "wb") as f:
        f.write(imgdata)
    return "ok"


if __name__ == "__main__":
    app.run("0.0.0.0", "5000", load_dotenv=True)