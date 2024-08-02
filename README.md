# Appleute Assignment

## Problem Statement

Develop an app module that allows developers to integrate stripe with custom methods for ease of use. The module should have basic stripe functionality. The module should have options to save all configurations required for stripe and should not be hardcoded in the module.


## How to run

### Client

- Install all the Required Dependencies

```
npm i
```
- Add these variables to the .env.local 

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = (shared in email)

NEXT_PUBLIC_BACKEND_URL = http://localhost:8080
```

- Run the application 

```
npm run dev
```

### Server

- Install all the Required Dependencies

```
npm i
```

- Add these variables to the .env.local 

```
STRIPE_SECRET_KEY = (shared in email)
STRIPE_WEBHOOK_SECRET = (shared in email)
REDIS_URI = (shared in email)
```


- Run the application 

```
npm start
```


