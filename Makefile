infra-up:
	cd ./infra && docker compose up -d

infra-down:
	cd ./infra && docker compose down