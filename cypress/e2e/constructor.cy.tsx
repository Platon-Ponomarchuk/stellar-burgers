import cypress from 'cypress';
import * as order from '../fixtures/order.json';

const bun = '[data-cy-testid="bun"]';
const main = '[data-cy-testid="main"]';
const sauce = '[data-cy-testid="sauce"]';
const bunConstructor = '[data-cy-testid="bun-constructor"]';
const mainConstructor = '[data-cy-testid="ingredient-constructor"]';
const modals = '[data-cy-testid="modal"]';

describe('Проверка конструктора', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('postOrder');
    cy.visit('/');
  });

  this.afterAll(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('[#1] Проверка на отрисовку компонента', function () {
    cy.get(bun).should('exist');
    cy.get(main).should('exist');
    cy.get(sauce).should('exist');
  });

  it('[#2] Проверка добавления/удаления ингредиента и булки в конструктор', function () {
    const bunStore = cy.get(bun).first().children();
    const mainStore = cy.get(main).first().children();
    const mainStoreSecond = cy.get(main).first().next().children();

    bunStore.last().click();
    mainStore.last().click();
    mainStoreSecond.last().click();

    cy.get(bunConstructor).contains('Краторная булка N-200i');
    cy.get(mainConstructor).contains('Биокотлета из марсианской Магнолии');
    cy.get(mainConstructor).contains('Филе Люминесцентного тетраодонтимформа');

    cy.get('[data-cy-testid=ingredient-constructor-without-button]')
      .children()
      .children()
      .children()
      .last()
      .click();

    cy.get(mainConstructor)
      .not('Филе Люминесцентного тетраодонтимформа')
      .contains('Биокотлета из марсианской Магнолии');
  });

  describe('Проверка модального окна', function () {
    it('[#3] Проверка открытия модального окна', function () {
      cy.get(modals).should('not.exist');
      cy.get(bun).first().click();
      cy.get(modals).should('exist');
    });

    it('[#4] Проверка закрытия модального окна по кнопке', function () {
      cy.get(bun).first().click();
      cy.get('[data-cy-testid="modal-close-button"]').click();
      cy.get(modals).should('not.exist');
    });

    it('[#5] Проверка закрытия модального окна по оверлею', function () {
      cy.get(bun).first().click();
      cy.get('[data-cy-testid="modal-close-overlay"]').click({ force: true });
      cy.get(modals).should('not.exist');
    });
  });

  describe('Проверка оформления заказа', function () {
    this.beforeEach(function () {
      cy.setCookie('accessToken', 'token');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
      cy.wait('@getUser');
    });

    it('[#6] Проверка открытия модального окна при нажатии на "Оформить заказ"', function () {
      const bunStore = cy.get(bun).first().children();
      const mainStore = cy.get(main).first().children();
      const mainStoreSecond = cy.get(main).first().next().children();

      bunStore.last().click();
      mainStore.last().click();
      mainStoreSecond.last().click();

      cy.get("[data-cy-testid='order']").contains('Оформить заказ').click();
      cy.get(modals).should('exist');
      cy.get(modals).contains(order.order.number.toString());
    });

    describe('Проверка закрытия модального окна', function () {
      this.beforeEach(function () {
        const bunStore = cy.get(bun).first().children();
        bunStore.last().click();

        cy.get("[data-cy-testid='order']").contains('Оформить заказ').click();
      });

      it('[#7] Проверка закрытия модального окна по кнопке', function () {
        cy.get('[data-cy-testid="modal-close-button"]').click();
        cy.get(modals).should('not.exist');
      });

      it('[#8] Проверка закрытия модального окна по оверлею', function () {
        cy.get('[data-cy-testid="modal-close-overlay"]').click({ force: true });
        cy.get(modals).should('not.exist');
      });
    });

    describe('Проверка очистки конструктора', function () {
      it('[#9] Проверка очистки конструктора', function () {
        const bunStore = cy.get(bun).first().children();
        bunStore.last().click();

        cy.get("[data-cy-testid='order']").contains('Оформить заказ').click();
        cy.get('[data-cy-testid="modal-close-button"]').click();

        // Так как bunConstructor и mainConstructor - это уже добавленные в корзину ингредиенты, значит при пустом конструкторе в DOM они не существуют
        cy.get(bunConstructor).should('not.exist');
        cy.get(mainConstructor).should('not.exist');
      });
    });
  });
});
