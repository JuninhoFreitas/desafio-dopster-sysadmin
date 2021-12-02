<h1 align="center">Welcome to email-generator-api 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Api desenvolvida para o desafio da dopster + papo de sysadmin com o intuito de gerar emails temporarios

## Install

```sh
yarn install
```

## Usage

```sh
yarn dev
```

# Endpoints
## Account
Criar Conta de email
```
url: /account
method: POST
header: {"Content-Type":"application/json"},
body: {
  "email": "exemploemail",
  "password": "newpassword"
}

Response:
{
  "@context": "\/contexts\/Account",
  "@id": "\/accounts\/61a8ef37d72e4a18f91d8de5",
  "@type": "Account",
  "id": "61a8ef37d72e4a18f91d8de5",
  "address": "exemploemail@leadwizzer.com",
  "quota": 40000000,
  "used": 0,
  "isDisabled": false,
  "isDeleted": false,
  "createdAt": "2021-12-02T16:07:19+00:00",
  "updatedAt": "2021-12-02T16:07:19+00:00"
}

```
Criar Multiplas Contas de email
```
url: /account/:QUANTIDADE
method: POST
header: {"Content-Type":"application/json"},
body: {
  "email": "exemploemail",
  "password": "newpassword"
}

Response:
[
{
  "@context": "\/contexts\/Account",
  "@id": "\/accounts\/61a8ef37d72e4a18f91d8de5",
  "@type": "Account",
  "id": "61a8ef37d72e4a18f91d8de5",
  "address": "exemploemail@leadwizzer.com",
  "quota": 40000000,
  "used": 0,
  "isDisabled": false,
  "isDeleted": false,
  "createdAt": "2021-12-02T16:07:19+00:00",
  "updatedAt": "2021-12-02T16:07:19+00:00"
},
{...}
]

```

Deletar conta de email
```
url: /account/:IdDaConta
method: DELETE
header: {"Content-Type":"application/json"},

Response:
OK

```

# Token
Receber token JWT
```
url: /token
method: POST
header: {"accept":"application/json","Content-Type":"application/json"},
body: 
{
  "email": "exemploeamil@dot.com",
  "password": "newpass"
}

Response:
{
  "token": "xyz",
  "id": "aaaaaa222222aaaaa"
}

```
## Author

👤 **Juninho Freitas**

* Website: dev-addict.com
* Github: [@JuninhoFreitas](https://github.com/JuninhoFreitas)
* LinkedIn: [@junior-o-freitas](https://linkedin.com/in/junior-o-freitas)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
