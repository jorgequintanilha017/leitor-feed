/* feedreader.js
 *
 * Arquivo com testes que serão executados no aplicativo
 */

/* Testes dentro de '(() => {})()' para garantir que sejam
 * executados quando o DOM estiver pronto
 */
(() => {
  /* Função para simular clicks */
  const eventClick = elem => {
    return new Promise(resolve => {
      const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true
      });
      elem.dispatchEvent(evt);
      resolve();
    });
  };

  /* Testes relacionados a variável allFeeds */
  describe("RSS Feeds", () => {
    /* Verifica se allFeeds foi definido e possue um valor */
    it("are defined", function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Verifa se todos os Feeds possuem uma url */
    it("should have an url", () => {
      /* Filtra os Feeds sem url */
      const feed = allFeeds.filter(feed => feed.url !== "");

      expect(feed).not.toEqual([]);
    });

    /* Analisa se todos os Feed possuem um nome */
    it("should have a name", () => {
      /* Filtra os Feeds sem nome */
      const name = allFeeds.filter(feed => feed.name !== "");

      expect(name).not.toEqual([]);
    });
  });

  /* TODO: Write a new test suite named "The menu" */
  describe("The menu", () => {
    const body = document.body;

    /* Verifica se o menu é invisível pro padrão */
    it("should have a hidden menu by default", () => {
      expect(body).toHaveClass("menu-hidden");
    });

    /* Teste para verificar a visibilidade do menu quando
     * ícone for clicado
     */
    it("should show the menu on click", () => {
      const elem = document.querySelector(".icon-list");

      /* Simula click no elemento de classe icon-list */
      eventClick(elem);
      /* Verifica se o Menu ficará visível ao clicar */
      expect(body).not.toHaveClass("menu-hidden");

      eventClick(elem);
      /* Verifica se o Menu ficará invisível ao ser clicado
       * pela segunda vez
       */
      expect(body).toHaveClass("menu-hidden");
    });
  });

  /* Testes para Entradas Iniciais */
  describe("Initial Entries", () => {
    /* Utilizando async/await para carrar o Feed */
    beforeEach(async () => {
      await loadFeed(2);
    });

    /* Teste para verificar se há pelo mesno um .entry após
     * finalização da função loadFeed()
     */
    it("should contain there is at least a single feed", () => {
      /* Verifca se a quantidades de links do Feed é maior que zero */
      const count = document.querySelectorAll(".feed > .entry-link").length;
      expect(count).toBeGreaterThan(0);
    });
  });

  /* Testes para seleção de novo Feed*/
  describe("New Feed Selection", () => {
    let firstLink;
    let secondLink;

    /* Utilizando async/await para carrar o feed
     * atribui o valor do primeiro Feed a firstLink
     * e carrega o segundo Feed
     */
    beforeEach(async () => {
      await loadFeed(0);
      firstLink = document.querySelectorAll(".entry-link");
      await loadFeed(1);
    });

    /* Verifica se o conteúdo é alterado após seleção de novo Feed */
    it("should update feed", () => {
      /* Atribui o valor do primeiro link do segundo Feed a secondLink */
      secondLink = document.querySelectorAll(".entry-link");

      expect(firstLink).not.toEqual(secondLink);
    });
  });
})();
