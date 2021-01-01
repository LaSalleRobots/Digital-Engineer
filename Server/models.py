from graphene import ObjectType, String, Schema, Field, List, Interface, Date

import pymongo
from bson.objectid import ObjectId

client = pymongo.MongoClient()
db = client["digital-engineer"]


class Author(ObjectType):
    _id = String(description="The author's ObjectID")
    name = String(description="The author's name")
    position = String(description="What the author's job is")
    notes = List(String, description="List of all the note's objectids")


class Note(ObjectType):
    _id = String()
    body = String(description="The content of the note")
    authors = List(Author, description="The authors of this note")
    name = String()
    photo = String()
    drawing = String()
    date = Date()

    def resolve_authors(root, info):
        return db["authors"].find({"notes": str(root["_id"])})[:]
