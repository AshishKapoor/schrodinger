FROM python:3.9

WORKDIR /api

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

COPY ./requirements.txt /api/requirements.txt
COPY ./local.db /api/local.db
COPY ./.env /api/.env

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

COPY ./ /api/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]