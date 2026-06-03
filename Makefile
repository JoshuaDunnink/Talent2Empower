.PHONY: dev build preview deploy clean install

## Install all dependencies
install:
	npm install

## Start the development server
dev:
	npm run dev

## Build for production
build:
	npm run build

## Preview the production build locally
preview:
	npm run preview

## Deploy to Strato via FTP (requires .env)
deploy:
	./deploy.sh

## Remove build output
clean:
	rm -rf dist node_modules/.cache

## Format code
format:
	npm run format

## Check formatting
lint:
	npm run lint

## Full production pipeline: build + deploy
release: build deploy
