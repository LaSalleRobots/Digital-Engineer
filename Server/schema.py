from graphene import ObjectType, String, Schema, Field, List, Interface

from queries import Query
from mutations import Mutations


schema = Schema(query=Query, mutation=Mutations)
