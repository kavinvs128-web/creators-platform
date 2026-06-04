# Postman Collection Guide

## Setup

1. Install Postman desktop app
2. Import:
   - Creator-Platform-API.postman_collection.json
   - Local-Development.postman_environment.json
3. Select "Local Development" environment

## Run Server

```bash
npm run dev
```

## Request Order

1. Health Check
2. Register User
3. Login User
4. Create Post
5. Update Post
6. Delete Post

## Variables

- {{baseURL}} → http://localhost:5000
- {{authToken}} → JWT token automatically saved after login

## Authentication

All protected routes use:

Authorization: Bearer {{authToken}}

## Tests

Requests include Postman test scripts for:
- Status code validation
- Response structure validation
- Authentication verification