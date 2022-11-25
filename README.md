# Ellandi

To build this app, install Docker Desktop then run:

    docker-compose up --build

Migrations will applied automatically

Then you can access `http://localhost:8000` to view the api, and `http://localhost:3000` to view the web frontend

If you want to access the api's admin interface you need to run:

    docker-compose run api python manage.py createsuperuser

Then you can access `http://localhost:8000/admin` to login to the admin interface

To load some dummy data for testing locally (data on users, related skills/languages/skills to develop):
`docker-compose run api python manage.py loaddata fake_data/fakeusers.json`

## Local installation

To run the backend locally, or to run tests or linting:

    brew install postgresql
    python3 -m pip install -r api/requirements-dev.txt

To run the frontend locally:

    cd web && npm install
    npm run prod

## Schema / Swagger

The schema is available at: http://localhost:8000/api/schema/ and the Swagger docs can be viewed at: http://localhost:8000/api/schema/swagger-ui/

---

## Frontend local development

First run an instance of the api

```
docker compose up nginx api
```

Create a `web/.env.local` file

```
NEXT_PUBLIC_API_URL=http://localhost/api
```

You can now run your local frontend development instance

```
cd web
npm run dev
```

### Full test checks

The below runs a full check of lints, typescript and unit tests against the frontend codebase

```
cd web
npm run test:all
```

### Mock data (optional)

You can also generate a setup of mockdata on the api

```
make setup
```

and create a superadmin

```
docker-compose run api python manage.py createsuperuser
```

---

## Playwright browser tests

Pre-requisites:

```bash
pip install -r integration/requirements.txt
```

To run playwright test against web frontend on localhost
Run [Local installation](https://github.com/i-dot-ai/ellandi/blob/fb1278372ec052c859f591035f6538d6ac4c7f64/README.md#L17)
or
[Docker installation](https://github.com/i-dot-ai/ellandi/blob/fb1278372ec052c859f591035f6538d6ac4c7f64/README.md#L1)
to spin up a frontend instance.

Then

```bash
make playwright-localhost
```

To auto generate a `playwright` script in `python` run

```bash
playwright codegen http://localhost:3000
```

---

## Deploying to Gov.UK Paas environments

Before deploying to a new environment in Gov.UK paas you need to create some DBs and and S3 buckte.

log in to the correct CF environment:

```
cf login -a api.london.cloud.service.gov.uk -u <username i.e email>'
```

choose the correct env or switch to it.

```
cf target -s <env>
```

Create the dbs needed for ellandi and organogram

```
cf create-service postgres tiny-unencrypted-13|medium-13 ellandi-postgres-<env>
cf create-service postgres tiny-unencrypted-13|medium-13 organogram-postgres-<env>

```

Create the `organogram` S3 bucket

```
cf create-service aws-s3-bucket default i-dot-ai-organogram-<env> -c '{"public_bucket":false}'
```

Create new manifest `.yml` files for the environment if they don't exist in the
`manifests/<env>/` folder
