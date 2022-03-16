from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  "http://localhost",
  "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def root():
    return {"status": "Ok"}

@app.get("/cats/")
async def get_all_cats():
    return [
  { "type": "bank-draft", "title": "Bank Draft", "position": 0 },
  { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1 },
  { "type": "invoice", "title": "Invoice", "position": 2 },
  { "type": "bank-draft-2", "title": "Bank Draft 2", "position": 3 },
  { "type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4 },
]
