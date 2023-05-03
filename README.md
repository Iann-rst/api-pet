# API para a adoção de animais, a FindAFriend API

## Regras da aplicação

- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [ ] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível realizar login como uma ORG;

## Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;

## Contexto da aplicação

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Segue o link para o layout da aplicação que utilizaria essa API.

> [layout da aplicação](<https://www.figma.com/file/sIjvM84tYyv0NyJzdyvEbJ/Find-A-Friend-(APP)?node-id=1-2&t=pJli3ch6IUoM44mo-0>)

## Propriedades dos registros

### ORG

- id;
- email;
- password;
- name;
- CEP;
- address;
- whatsapp;
- city;

### Pets

- id;
- name;
- description;
- age (cub, adolescente, elderly);
- size (small, medium, big);
- lvl_independence (low, medium, high);
- type (cat, dog);
- org_id;
