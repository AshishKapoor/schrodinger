import databases
import sqlalchemy
from starlette.applications import Starlette
from starlette.config import Config
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

middleware = [
  Middleware(CORSMiddleware, allow_origins=["*"], allow_methods=['GET', 'POST']),
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
    sqlalchemy.Column("x", sqlalchemy.Integer),
    sqlalchemy.Column("y", sqlalchemy.Integer),
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
            "position": result["position"],
            "x": result["x"],
            "y": result["y"]
        }
        for result in results
    ]
    return JSONResponse(content)

async def add_post(request):
    data = await request.json()
    query = posts.insert().values(
       type=data["type"],
       title=data["title"],
       position=data["position"],
       x=data["x"],
       y=data["y"]
    )
    await database.execute(query)
    return JSONResponse({
        "type": data["type"],
        "title": data["title"],
        "position": data["position"],
        "x": data["x"],
        "y": data["y"]
    })

async def update_posts(request):
    payload = await request.json()
    try:
        stmt = posts.update().where(
            posts.c.type == request.path_params['type']
        ).values(
            x=payload['x'], y=payload['y']
        )
        await database.execute(stmt)
        return JSONResponse({
            "success": "Ok"
        })
    except:
        print('Error in def update_posts')

routes = [
    Route("/posts", endpoint=list_posts, methods=["GET"]),
    Route("/posts", endpoint=add_post, methods=["POST"]),
    Route("/posts/{type}", endpoint=update_posts, methods=["POST"]),
]

app = Starlette(
    routes=routes,
    middleware=middleware,
    on_startup=[database.connect],
    on_shutdown=[database.disconnect]
)
