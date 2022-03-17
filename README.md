# Schrodinger
![cats](https://user-images.githubusercontent.com/5203107/158726355-2ca8868b-3dae-45fd-a845-85a464d6c206.gif)

## UI
A cats gallery app.

1. Picked up NextJS since the application isn’t currently behind any authentication system yet.
2. Using SWR instead of react-query because it goes well with NextJS. Otherwise, I’d have picked up react-query to cache my fetch queries.
3. About the UI, I got the main feature in the middle of the page with basic CSS and a nearly dumb logic.
4. Made use of NextJS's cool server to get the fixture json data over network.
5. Made use of react grid layout for the drag and drop feature in a 3 x 2 grid with 5 cards.
6. Made use of react modal for the overlay feature.

### TODO: -

1. Find some fancy loader (Skeleton UI) or something quick to represent the loading state.

## API
Using fastAPI

1. Got a simple get all cats resource ready.

### TODO: -

1. Create a PostgreSQL / SQLite table that can hold the data instead of the static json file.
2. Build a REST API that can fetch the data from this cats table and add data to this table. (Take a look at [starlette](https://github.com/tiangolo/uvicorn-gunicorn-starlette-docker)).
