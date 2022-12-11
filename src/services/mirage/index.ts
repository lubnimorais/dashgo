import { createServer, Factory, Model } from 'miragejs';
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
      this.get('/users');
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
