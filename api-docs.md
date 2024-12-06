# API Documentation

Our API is documented using OpenAPI 3.0 specification. You can find the full specification in `openapi.yaml`.

## Example Usage

You can import the OpenAPI specification into tools like Swagger UI, Postman, or other API development tools. For quick testing, you can also use curl:

### Gmail API Examples

List emails:

```bash
curl -X GET 'http://localhost:3000/api/gmail?limit=5&offset=0'
```

Get specific email:

```bash
curl -X GET 'http://localhost:3000/api/gmail/msg123'
```

### Calendar API Examples

List events:

```bash
curl -X GET 'http://localhost:3000/api/calendar?limit=5&offset=0'
```

Get specific event:

```bash
curl -X GET 'http://localhost:3000/api/calendar/evt123'
```

## Tools Integration

You can use this API specification with:

- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- Any other OpenAPI-compatible tool

Simply import the `openapi.yaml` file into your preferred tool to get started.
