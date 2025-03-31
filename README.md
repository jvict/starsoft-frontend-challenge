## Rodando o Projeto com Docker

1. **Pré-requisitos**:
   - Instale o [Docker](https://www.docker.com/).
   - Instale o [Docker Compose](https://docs.docker.com/compose/).

2. **Passos para iniciar a aplicação**:
   - Construa a imagem do Docker:
     ```bash
     docker-compose build
     ```
   - Inicie o contêiner:
     ```bash
     docker-compose up
     ```
   - Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

3. **Comandos Adicionais**:
   - Para parar o contêiner:
     ```bash
     docker-compose down
     ```

   - Para reconstruir a imagem:
     ```bash
     docker-compose build --no-cache
     ```