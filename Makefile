-include ./User.mk
-include ../User.mk
-include ~/User.mk

bold=$(tput bold)
endbold=$(tput sgr0)

.PHONY: all
all:test

.PHONY: test
test: ## run unit tests
	npm test -- --watchAll=false

.PHONY: cover
cover: ## run code coverage
	npm run coverage -- --watchAll=false

.PHONY: run
run: ## run in development mode
	npm start

.PHONY: clean
clean: ## clean dependencies and build
	rm -rf node_modules
	rm -rf build

.PHONY: build
build: ## install dependencies
	npm i

.PHONY: deploy
deploy: ## deploy to github page
	echo 'TODO: copy build somewhere github page is hosted'

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

