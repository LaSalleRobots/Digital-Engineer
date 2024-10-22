import datetime
from datetime import date

import graphene
from graphene import String, Mutation, Field, Boolean, InputObjectType, Date

import pymongo
from bson.objectid import ObjectId

from models import *

client = pymongo.MongoClient()
db = client["digital-engineer"]

from models import *


class CreateAuthor(Mutation):
    class Arguments:
        name = String(required=True)
        position = String(required=True)

    ok = Boolean()

    def mutate(root, info, name, position):
        res = db["authors"].insert_one({"name": name, "position": position})
        return CreateAuthor(ok=True)


class InputNoteType(InputObjectType):
    body = String(required=True)
    name = String(required=True)
    date = Date()
    photo = String(description="Base64 encoded png")
    drawing = String(description="Base64 encoded drawing")


class CreateNote(Mutation):
    class Arguments:
        note_data = InputNoteType(required=True)
        author = String(required=True, description="Author's Name")

    ok = Boolean()

    def mutate(root, info, note_data, author):
        noteObj = {
            "name": note_data["name"],
            "body": note_data["body"],
            "date": datetime.datetime.now(),
        }
        if note_data.get("photo"):
            noteObj["photo"] = note_data.get("photo")
        if note_data.get("drawing"):
            noteObj["drawing"] = note_data.get("drawing")
        note = db["notes"].insert_one(noteObj)
        a = db["authors"].find_one_and_update(
            {"$text": {"$search": author}}, {"$push": {"notes": str(note.inserted_id)}}
        )
        print(a)
        return CreateNote(ok=True)


class Mutations(graphene.ObjectType):
    author = CreateAuthor.Field()
    note = CreateNote.Field()