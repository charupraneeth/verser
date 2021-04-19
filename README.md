# Verser

## What is Verser?

Verser is a prototype payment app primarily based on transaction validation at both the sender's and reciver's end.

## Why Verser?

The traditional model of online payments only requires the bank account number or mobile number linked to the bank of the receiver to make payments and the receiver does not have any control over the incoming payments, this can cause unwanted trouble as undesired money is not always for good. This app tries to solve the exact problem and making transactions more controlled.

## Stack used

- Front-end
  - [Vue](https://v3.vuejs.org/)
  - [Materialize CSS](https://materializecss.com/)
- Back-end
  - [Firebase](https://firebase.google.com/)
  - [Netlify functions](https://functions.netlify.com/)

## Project setup

- After cloning the repo create a firebase app and select it as a web app, this would generate a config file something like this :

  ![firebase config image](https://gblobscdn.gitbook.com/assets%2F-LD0Q9Laf5be7GA-f2fQ%2F-LMCZzZUUayTB3DoPXew%2F-LMCaFaca3QlMPkm41GA%2F3.jpg?alt=media&token=06323e25-1f17-4145-8c23-9e35a96d070f)

- Copy the config variables and create a '.env' file in the root of the project based on the '.env.sample' present in the repo.

- For the firebase admin SDK download a private key by following the below instuctions

  - In the Firebase console, open Settings > Service Accounts.

  - Click Generate New Private Key, then confirm by clicking Generate Key.

  - To use the firebase admin SDK download a private key by following the below instructions

  - In the Firebase console, open Settings > Service Accounts.

  - Click Generate New Private Key, then confirm by clicking Generate Key.

  - Securely store the JSON file containing the key in the functions directory and rename it as service-account.json

### Install dependencies

```
npm install
```

### Start a local dev server with hot-reload

```
ntl dev
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Project idea references :

- [Prevent the innocent and unwitting from becoming money mules like the US does](https://www.change.org/p/actionfraud-prevent-the-innocent-and-unwitting-from-becoming-money-mules-like-the-us-does?redirect=false)

- [Be Aware of the Money Mule Scam](https://www.fs-trust.com/2021/02/10/be-aware-of-the-money-mule-scam)

- [Operation of bank accounts and money mules](https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=6136&Mode=0)
