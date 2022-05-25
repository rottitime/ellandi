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


# If you want a specific Python interpreter define it as an envvar
# $ export PYTHON_ENV=
ifdef PYTHON_ENV
	PYTHON := $(PYTHON_ENV)
else
	PYTHON := python3
endif

#################################### Functions ###########################################
# Function to check if package is installed else install it.
define install-pkg-if-not-exist
	@for pkg in ${1}; do \
		if ! command -v "$${pkg}" >/dev/null 2>&1; then \
			echo "installing $${pkg}"; \
			$(PYTHON) -m pip install $${pkg}; \
		fi;\
	done
endef

# Function to create python virtualenv if it doesn't exist
define create-venv
	$(call install-pkg-if-not-exist,virtualenv)

	@if [ ! -d ".$(PACKAGE_NAME)_venv" ]; then \
		$(PYTHON) -m virtualenv "venv" -p $(PYTHON) -q; \
		echo "\"venv\": Created successfully!"; \
	fi;
	@echo "Source virtual environment before tinkering"
	@echo "Manually run: \`source venv/bin/activate\`"
endef

define add-gitignore
	PKGS=venv,python,JupyterNotebooks,SublimeText,VisualStudioCode,vagrant
	curl -sL https://www.gitignore.io/api/$${PKGS} > .gitignore
endef

.PHONY: all
help:
	@$(PYTHON) -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

# ------------------------------------ Boilerplate Code ----------------------------------
boilerplate:  ## Add simple 'README.md' and .gitignore
	@echo "# $(PACKAGE_NAME)" | sed 's/_/ /g' >> README.md
	@$(call add-gitignore)

# # -------------------------------- Builds and Installations -----------------------------

venv:  ## Create virtualenv environment on local directory.
	@$(create-venv)

install-dev: ## install from requirements file
	python -m pip install -r api/requirements-dev.txt

install-req: ## install from requirements file
	python -m pip install -r api/requirements.txt

# # -------------------------------------- Project Execution -------------------------------
run-in-docker:  ## Run python app in a docker container
	docker-compose up --build


# # -------------------------------------- Clean Up  --------------------------------------
.PHONY: clean


# # -------------------------------------- Code Style  -------------------------------------

lint-backend: ## Check style with `flake8` and `mypy`
	$(call install-pkg-if-not-exist,flake8)

	@$(PYTHON) -m flake8 api/
# # find . -name "*.py" | xargs pre-commit run -c .configs/.pre-commit-config.yaml flake8 --files
# # @$(PYTHON) -m mypy
# # @yamllint .

checkmake:  ## Check Makefile style with `checkmake`
	docker run --rm -v $(CURDIR):/data cytopia/checkmake Makefile

formatter-backend: ## Format style with `black` and sort imports with `isort`
	@isort -m 3 -tc -rc .
	@black .
# 	find . -name "*.py" | xargs pre-commit run -c .configs/.pre-commit-config.yaml isort --files

# # ---------------------------------------- Tests -----------------------------------------
.PHONY: test
test: ## Run tests quickly with pytest
# $(call install-pkg-if-not-exist,pytest)

	@$(PYTHON) -m pytest -sv
