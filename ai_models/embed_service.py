from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from sentence_transformers import SentenceTransformer
import uvicorn

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2")

class BatchRequest(BaseModel):
    texts: List[str]

@app.post("/embed-batch")
def embed_batch(req: BatchRequest):
    embeddings = model.encode(req.texts, show_progress_bar=False)
    return {"embeddings": embeddings.tolist()}

if __name__ == "__main__":
    uvicorn.run("embed_service:app", host="0.0.0.0", port=5000, reload=False)





