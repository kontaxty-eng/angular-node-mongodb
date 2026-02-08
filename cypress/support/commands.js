// Custom commands for Cypress
Cypress.Commands.add('login', () => {
  // Add login logic if needed
});

// Command to clear all tasks
Cypress.Commands.add('clearTasks', () => {
  cy.request('DELETE', 'http://localhost:3000/tasks/all');
});
