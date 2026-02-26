.PHONY: help install dev build start typecheck docker-up docker-down docker-logs docker-build clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ─── Development ───────────────────────────────────────────────

install: ## Install dependencies
	npm install

dev: ## Start dev server with hot-reload
	npm run dev

build: ## Compile TypeScript to dist/
	npm run build

start: ## Start production server (requires build first)
	npm start

# ─── Quality ───────────────────────────────────────────────────

typecheck: ## Run TypeScript type-check (no emit)
	npx tsc --noEmit
	@echo "✓ Type-check passed"

# ─── Docker ────────────────────────────────────────────────────

docker-up: ## Build and start backend container
	docker compose up --build -d

docker-down: ## Stop backend container
	docker compose down

docker-logs: ## Follow container logs
	docker compose logs -f

docker-build: ## Build Docker image only
	docker compose build

docker-restart: ## Restart backend container
	docker compose restart

# ─── Cleanup ───────────────────────────────────────────────────

clean: ## Remove dist/ and node_modules/
	rm -rf dist node_modules
	@echo "✓ Cleaned"

clean-docker: ## Remove container, image, and volumes
	docker compose down --rmi local --volumes --remove-orphans
