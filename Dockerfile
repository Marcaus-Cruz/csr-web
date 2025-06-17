FROM alpine:latest

WORKDIR /app

COPY pb/pocketbase /app/pocketbase
# COPY pb/pb_data /app/pb_data

RUN chmod +x /app/pocketbase

EXPOSE 10000

ENV CORS_ORIGINS=*
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:10000"]