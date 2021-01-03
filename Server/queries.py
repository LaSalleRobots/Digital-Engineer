from graphene import ObjectType, String, Schema, Field, List, Interface

import pymongo
from bson.objectid import ObjectId

from models import *

client = pymongo.MongoClient()
db = client["digital-engineer"]


class Query(ObjectType):
    author = Field(
        List(Author),
        name=String(),
        id=String(),
        position=String(),
        description="Find authors",
    )

    def resolve_author(parent, info, name=None, id=None, position=None):
        if name:
            return db["authors"].find({"$text": {"$search": name}})
        if id:
            return db["authors"].find({"_id": ObjectId(id)})
        if position:
            return db["authors"].find({"$text": {"$search": position}})

    note = Field(Note, name=String(), author=String())

    def resolve_note(parent, info, name=None, author=None):
        if author:
            a = db["authors"].find_one({"$text": {"$search": author}})
            return db["notes"].find_one({"authors": a["_id"]})
        if name:
            return db["notes"].find_one({"name": name})

    notes = Field(List(Note))

    def resolve_notes(parent, info):
        return db["notes"].find({})

    feed = Field(List(Note))

    def resolve_feed(parent, info):
        return db["notes"].find({}).sort("date", pymongo.DESCENDING)

