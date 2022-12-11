import { createServer, Model } from 'miragejs';

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

    routes() {
      this.namespace = 'api';
      /**
       * vai fazer com que toda chamada para o mirage
       * demore 750ms para acontecer. Vai ficar com esse delay
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
    },
  });

  return server;
}

export { makeServer };
