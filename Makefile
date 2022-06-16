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

# -------------------------------- Builds and Installations -----------------------------

.PHONY: npm-prepare
npm-prepare: ## Check style and syntax with
	cd web && npm run prepare

# -------------------------------------- Project Execution -------------------------------
.PHONY: docker
docker:  ## Run python app in a docker container
	docker-compose up --build --force-recreate --renew-anon-volumes

# -------------------------------------- Code Style  -------------------------------------

.PHONY: check-python-code
check-python-code:
	isort --check .
	black --check .
	flake8

.PHONY: format-python-code
format-python-code:
	isort .
	black .
	flake8

.PHONY: validate-frontend
validate-frontend: ## Check style and syntax with
	cd web && npm run validate

include .envs/postgres

.PHONY: reset-db
reset-db:
	docker-compose run -e PGPASSWORD=${POSTGRES_PASSWORD} postgres dropdb -U ${POSTGRES_USER} -h ${POSTGRES_HOST} ${POSTGRES_DB}
	docker-compose run -e PGPASSWORD=${POSTGRES_PASSWORD} postgres createdb -U ${POSTGRES_USER} -h ${POSTGRES_HOST} ${POSTGRES_DB}
