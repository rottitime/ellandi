.ONESHELL:

SHELL := /bin/bash
DATE_ID := $(shell date +"%y.%m.%d")
# Get package name from pwd
PACKAGE_NAME := $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))
.DEFAULT_GOAL := help

# UPDATE ME
DOCKER_IMAGE = "$(USER)/$(shell basename $(CURDIR))"

define PRINT_HELP_PYSCRIPT
import re, sys

class Style:
    BLACK = '\033[30m'
    BLUE = '\033[34m'
    BOLD = '\033[1m'
    CYAN = '\033[36m'
    GREEN = '\033[32m'
    MAGENTA = '\033[35m'
    RED = '\033[31m'
    WHITE = '\033[37m'
    YELLOW = '\033[33m'
    ENDC = '\033[0m'

print(f"{Style.BOLD}Please use `make <target>` where <target> is one of{Style.ENDC}")
for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if line.startswith("# -------"):
		print(f"\n{Style.RED}{line}{Style.ENDC}")
	if match:
		target, help_msg = match.groups()
		if not target.startswith('--'):
			print(f"{Style.BOLD+Style.GREEN}{target:20}{Style.ENDC} - {help_msg}")
endef

export PRINT_HELP_PYSCRIPT
# See: https://docs.python.org/3/using/cmdline.html#envvar-PYTHONWARNINGS
export PYTHONWARNINGS=ignore
BROWSER := $(PYTHON) -c "$$BROWSER_PYSCRIPT"


.PHONY: help
help:
	@$(PYTHON) -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

include envs/api

# -------------------------------- Builds and Installations -----------------------------

.PHONY: npm-prepare
npm-prepare: ## Check style and syntax with
	cd web && npm run prepare

# -------------------------------------- Project Execution -------------------------------
.PHONY: docker
docker:  ## Run python app in a docker container
	docker-compose up --build --force-recreate --renew-anon-volumes --remove-orphans

define _update_requirements
	docker-compose run requirements bash -c "pip install -U pip setuptools && pip install -U -r /app/$(1)/$(2).txt && pip freeze > /app/$(1)/$(2).lock"
endef

.PHONY: update-api-requirements
update-api-requirements:
	$(call _update_requirements,api,requirements)
	$(call _update_requirements,api,requirements-dev)

.PHONY: update-recommender-requirements
update-recommender-requirements:
	$(call _update_requirements,recommender,requirements)
	$(call _update_requirements,recommender,requirements-dev)

.PHONY: update-organogram-requirements
update-organogram-requirements:
	$(call _update_requirements,organogram,requirements)
	$(call _update_requirements,organogram,requirements-dev)

# -------------------------------------- Code Style  -------------------------------------

.PHONY: check-python-code
check-python-code:
	isort --check .
	black --check .
	flake8

.PHONY: test-api
test-api:
	docker-compose down
	docker-compose build tests-api ellandi-test-db && docker-compose run --rm tests-api || docker-compose down
	docker-compose down

.PHONY: test-organogram
test-organogram:
	docker-compose down
	docker-compose build tests-organogram ellandi-test-db && docker-compose run --rm tests-organogram || docker-compose down
	docker-compose down

.PHONY: check-migrations
check-migrations:
	docker-compose build api organogram
	docker-compose run api python manage.py migrate
	docker-compose run api python manage.py makemigrations --check
	docker-compose run organogram python manage.py migrate
	docker-compose run organogram python manage.py makemigrations --check

.PHONY: format-python-code
format-python-code:
	isort .
	black .
	flake8

.PHONY: validate-frontend
validate-frontend: ## Check style and syntax with
	cd web && npm run test:all

.PHONY: reset-db
reset-db:
	docker-compose up --detach ${POSTGRES_HOST}
	docker-compose run ${POSTGRES_HOST} dropdb -U ${POSTGRES_USER} -h ${POSTGRES_HOST} ${POSTGRES_DB}
	docker-compose run ${POSTGRES_HOST} createdb -U ${POSTGRES_USER} -h ${POSTGRES_HOST} ${POSTGRES_DB}
	docker-compose kill

.PHONY: psql
psql:
	docker-compose run ${POSTGRES_HOST} psql -U ${POSTGRES_USER} -h ${POSTGRES_HOST} ${POSTGRES_DB}

.PHONY: integration ## Run playwright tests
integration:
	docker-compose -f docker-compose.yml -f docker-compose-integration.yml up --build --force-recreate integration

.PHONY: setup
setup:
	docker-compose build nginx api organogram
	docker-compose run api python manage.py migrate
	docker-compose run api python manage.py add_courses -n 128
	docker-compose run api python manage.py add_users -n 128
	docker-compose run organogram python manage.py create_minio_bucket

.PHONY: loadtests ## Run loadtests
loadtests:
	docker-compose -f docker-compose.yml up --build --force-recreate loadtests
