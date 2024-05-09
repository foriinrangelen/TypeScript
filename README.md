# TypeScript

1. npm init -y
2. npm i -D parcel typescript
```json
{
  "name": "typescript-tutorial",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "parcel ./index.hmtl",
    "build": "parcel build ./index.html" 
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.12.0",
    "typescript": "^5.4.5"
  }
}

```
### tsconfig
```json
{
  "compilerOptions": {
    "target":"ES2015",
    "module": "ESNext",
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "strict": true
  },
  "include": [
   "src/**/*.ts"
  ],
  "exclude":[
   "node_modules"
  ]
}
```
