infra-up:
	cd ./infra && docker compose up -d

infra-down:
	cd ./infra && docker compose down

scraper-service-up:
	cd ./scraper-service && npm run build:start

monitor-up:
	cd ./monitor && npm run dev
