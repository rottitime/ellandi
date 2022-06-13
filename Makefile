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


.PHONY: all
help:
	@$(PYTHON) -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

# -------------------------------- Builds and Installations -----------------------------

install-dev: ## install from requirements file
	python -m pip install -r api/requirements-dev.txt

install-req: ## install from requirements file
	python -m pip install -r api/requirements.txt

npm-prepare: ## Check style and syntax with
	cd web && npm install && npm run prepare

# -------------------------------------- Project Execution -------------------------------
.PHONY: docker
docker:  ## Run python app in a docker container
	docker-compose up --build --force-recreate --renew-anon-volumes

# -------------------------------------- Code Style  -------------------------------------

check-python-code:
	isort --check .
	black --check .
	flake8

format-python-code:
	isort .
	black .
	flake8

validate-frontend: ## Check style and syntax with
	cd web && npm run validate
