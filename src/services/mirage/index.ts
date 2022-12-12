import { createServer, Factory, Model, Response } from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

// PARTIAL - serve para fazer com que nem todos os campo seja necessário ser informado

function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    /**
     * As factores são forma para conseguirmos gerar dados em massa
     * Precisa ser o mesmo nome do Model
     */
    factories: {
      user: Factory.extend({
        name(indice: number) {
          return `User ${indice + 1}`;
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        created_at() {
          return faker.date.recent(10);
        },
      }),
    },

    /**
     * para criar qualquer tipo de dados, assim que o servidor do mirage for inicializado
     */
    seeds(s) {
      s.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';
      /**
       * vai fazer com que toda chamada para o mirage
       * demore 750ms para acontecer. Vai ficar com esse delay
       * importante quando queremos testar os carregamentos dos spinners, loadings
       */
      this.timing = 750;

      /**
        Dessa forma, o miragejs entende automaticamente que quando chamar essa rota
        retornar todos os usuários
      */
      // this.get('/users');

      // para a paginação
      this.get('/users', function (schema, request) {
        // page: a página que quero exibir no momento
        // per_page: quantos registros quero mostrar por página
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(
          pageStart,
          pageEnd,
        );

        return new Response(200, { 'x-total-count': String(total) }, { users });
      });

      this.get('/users/:id');

      /**
        Dessa forma, o miragejs entende automaticamente que quando chamar essa rota
        vai criar a estrutura necessária para criar um usuário
      */
      this.post('/users');

      /**
       * fazemos isso por causa da API ROUTE do Next.
       * Porque por padrão o Next aceita que passamos na pasta pages uma pasta chamada api
       * onde o caminho das rotas também é api.
       * Por isso fazemos isso para resetar o namespace
       */
      this.namespace = '';
      /**
       * vai fazer com que toda chamada que sejam enviadas para o endereço api
       * passem pelo mirage e se elas não forem detectadas pelas rotas do mirage
       * elas passem adiante para rota original delas
       */
      this.passthrough();
    },
  });

  return server;
}

export { makeServer };
