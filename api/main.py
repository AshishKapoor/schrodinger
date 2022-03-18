import databases
import sqlalchemy
from starlette.applications import Starlette
from starlette.config import Config
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

middleware = [
  Middleware(CORSMiddleware, allow_origins=["*"]),
]

# Configuration from environment variables or '.env' file.
config = Config('.env')
DATABASE_URL = config('DATABASE_URL')


# Database table definitions.
metadata = sqlalchemy.MetaData()

posts = sqlalchemy.Table(
    "posts",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("position", sqlalchemy.Integer),
)

database = databases.Database(DATABASE_URL)

# Main application code.
async def list_posts(request):
    query = posts.select()
    results = await database.fetch_all(query)
    content = [
        {
            "type": result["type"],
            "title": result["title"],
            "position": result["position"]
        }
        for result in results
    ]
    return JSONResponse(content)

async def add_post(request):
    data = await request.json()
    query = posts.insert().values(
       type=data["type"],
       title=data["title"],
       position=data["position"]
    )
    await database.execute(query)
    return JSONResponse({
        "type": data["type"],
        "title": data["title"],
        "position": data["position"]
    })

routes = [
    Route("/posts", endpoint=list_posts, methods=["GET"]),
    Route("/posts", endpoint=add_post, methods=["POST"]),
]

app = Starlette(
    routes=routes,
    middleware=middleware,
    on_startup=[database.connect],
    on_shutdown=[database.disconnect]
)
