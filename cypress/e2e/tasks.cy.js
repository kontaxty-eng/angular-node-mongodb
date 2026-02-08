describe('Tasks Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the tasks page', () => {
    cy.url().should('include', '/tasks');
  });

  it('should create a new task', () => {
    // Fill in the task form
    cy.get('input[formcontrolname="title"]').type('Test Task from Cypress');
    cy.get('textarea[formcontrolname="description"]').type('This is a test task created by Cypress');
    cy.get('mat-select[formcontrolname="completed"]').click();
    cy.get('mat-option').contains('To do').click();

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify task was created
    cy.contains('Test Task from Cypress').should('be.visible');
  });

  it('should display task details in modal', () => {
    // First create a task
    cy.get('input[formcontrolname="title"]').type('Task for Modal Test');
    cy.get('textarea[formcontrolname="description"]').type('Testing modal functionality');
    cy.get('mat-select[formcontrolname="completed"]').click();
    cy.get('mat-option').contains('To do').click();
    cy.get('button[type="submit"]').click();

    // Click show button
    cy.contains('mat-card', 'Task for Modal Test').within(() => {
      cy.contains('button', 'Show').click();
    });

    // Verify modal is displayed
    cy.get('mat-dialog-container').should('be.visible');
    cy.get('mat-dialog-container').contains('Task for Modal Test');
    cy.get('mat-dialog-container').contains('Testing modal functionality');
  });

  it('should edit an existing task', () => {
    // Create a task first
    cy.get('input[formcontrolname="title"]').type('Task to Edit');
    cy.get('textarea[formcontrolname="description"]').type('Original description');
    cy.get('mat-select[formcontrolname="completed"]').click();
    cy.get('mat-option').contains('To do').click();
    cy.get('button[type="submit"]').click();

    // Click edit button
    cy.contains('mat-card', 'Task to Edit').within(() => {
      cy.contains('button', 'Edit').click();
    });

    // Verify form is populated
    cy.get('input[formcontrolname="title"]').should('have.value', 'Task to Edit');

    // Update the task
    cy.get('input[formcontrolname="title"]').clear().type('Updated Task Title');
    cy.get('textarea[formcontrolname="description"]').clear().type('Updated description');
    cy.get('button[type="submit"]').click();

    // Verify task was updated
    cy.contains('Updated Task Title').should('be.visible');
    cy.contains('Updated description').should('be.visible');
  });

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('button[type="submit"]').click();

    // Tasks list should not change (no new empty task)
    cy.get('mat-card').should('have.length', 0);
  });

  it('should filter tasks by status', () => {
    // Create a completed task
    cy.get('input[formcontrolname="title"]').type('Completed Task');
    cy.get('textarea[formcontrolname="description"]').type('This task is done');
    cy.get('mat-select[formcontrolname="completed"]').click();
    cy.get('mat-option').contains('Completed').click();
    cy.get('button[type="submit"]').click();

    // Create a todo task
    cy.get('input[formcontrolname="title"]').type('Todo Task');
    cy.get('textarea[formcontrolname="description"]').type('This task is not done');
    cy.get('mat-select[formcontrolname="completed"]').click();
    cy.get('mat-option').contains('To do').click();
    cy.get('button[type="submit"]').click();

    // Verify both tasks are visible
    cy.contains('Completed Task').should('be.visible');
    cy.contains('Todo Task').should('be.visible');
  });
});
