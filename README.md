# TDD - Sistema de Reservas

Projeto em TypeScript criado para praticar TDD em um dominio de reservas de propriedades, inspirado em plataformas como Airbnb.

A aplicacao modela usuarios, propriedades, reservas, periodos de datas e politicas de cancelamento/reembolso. O foco principal esta em escrever testes automatizados para validar as regras de negocio antes de evoluir a implementacao.

## Tecnologias

- TypeScript
- Jest
- SWC/Jest
- Node.js

## Regras de negocio implementadas

- Criacao e validacao de usuarios.
- Criacao e validacao de propriedades.
- Validacao de capacidade maxima de hospedes.
- Calculo de noites a partir de um intervalo de datas.
- Verificacao de conflito entre periodos de reserva.
- Calculo do valor total da reserva.
- Aplicacao de desconto para estadias de 7 noites ou mais.
- Bloqueio de reservas quando a propriedade nao esta disponivel.
- Cancelamento de reservas.
- Calculo de reembolso conforme proximidade do check-in:
  - Mais de 7 dias: reembolso total.
  - Entre 1 e 7 dias: reembolso parcial.
  - Menos de 1 dia: sem reembolso.

## Estrutura do projeto

```text
src/
  application/          Casos de uso e testes da camada de aplicacao
  Booking/              Entidade de reserva e seus testes
  Property/             Entidade de propriedade e seus testes
  cancelation/          Regras de reembolso e factory de politicas
  infrastructure/       Implementacoes fake para testes
  repositories/         Contratos de repositorios
  user/                 Entidade de usuario e seus testes
  validator/            Validacoes de dominio
  value_objects/        Objetos de valor, como DateRange
```

## Testes

O projeto usa Jest para validar as regras do dominio e da camada de aplicacao.

Principais arquivos de teste:

- `src/user/user.test.ts`
- `src/Property/property.test.ts`
- `src/Booking/Booking.test.ts`
- `src/value_objects/date_range.test.ts`
- `src/application/user_service.test.ts`
- `src/application/property_service.test.ts`

Atualmente, existem 29 testes passando. O arquivo `src/application/property_service.test.ts` ainda esta iniciado apenas com a estrutura do `describe`, entao o Jest sinaliza essa suite como pendente por nao conter nenhum teste.

## Como instalar

```bash
npm install
```

## Como executar os testes

```bash
npm test
```

Caso o ambiente tenha problemas ao criar workers do Jest, rode em modo serial:

```bash
npx jest --runInBand
```

## Camada de aplicacao

A camada `src/application` concentra os servicos que orquestram o uso das entidades e repositorios.

No `UserService`, os testes usam um `FakeUserRepository` para simular a persistencia sem depender de banco de dados real. Foram cobertos cenarios como:

- Buscar usuario por ID invalido.
- Buscar usuario por ID valido.
- Salvar um novo usuario no repositorio fake e consulta-lo novamente.

## Objetivo do projeto

Este projeto serve como exercicio pratico de TDD, separacao de responsabilidades e modelagem de regras de negocio. A ideia e manter as regras principais protegidas por testes automatizados, facilitando evolucoes futuras com mais seguranca.
