setup-env:
	cd client && cp .env.template .env && cd ../server && cp .env.template .env && code .env && cd ..

run-client:
	cd client && npm i && npm run build && npm run preview

run-server:
	cd server/app &&  go mod tidy && go run .