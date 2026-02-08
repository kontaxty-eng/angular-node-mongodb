describe('API Integration Tests', () => {
  const apiUrl = 'http://localhost:3000';

  it('should fetch tasks from the backend', () => {
    cy.request('GET', `${apiUrl}/tasks`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('should create a task via API', () => {
    const newTask = {
      title: 'API Test Task',
      description: 'Created via Cypress API test',
      completed: false,
    };

    cy.request('POST', `${apiUrl}/tasks`, newTask).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('title', 'API Test Task');
      expect(response.body).to.have.property('id');
    });
  });

  it('should update a task via API', () => {
    // First create a task
    const newTask = {
      title: 'Task to Update',
      description: 'Will be updated',
      completed: false,
    };

    cy.request('POST', `${apiUrl}/tasks`, newTask).then((createResponse) => {
      const taskId = createResponse.body.id;

      // Update the task
      const updatedTask = {
        title: 'Updated Task',
        description: 'Has been updated',
        completed: true,
      };

      cy.request('PUT', `${apiUrl}/tasks/${taskId}`, updatedTask).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body).to.have.property('title', 'Updated Task');
        expect(updateResponse.body).to.have.property('completed', true);
      });
    });
  });

  it('should check backend health', () => {
    cy.request('GET', `${apiUrl}/api/health`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('status', 'ok');
    });
  });
});
