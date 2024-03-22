import { localStorageAPI } from "./localStorageAPI";

export function setUpProject(element: HTMLButtonElement) {
  element.addEventListener('click', () => {
    const projectIdInput = document.querySelector<HTMLInputElement>('#project_id');
    const projectNameInput = document.querySelector<HTMLInputElement>('#project_name');
    const projectDescriptionInput = document.querySelector<HTMLInputElement>('#project_description');

    if (projectIdInput && projectNameInput && projectDescriptionInput) {
      const projectId = projectIdInput.value.trim();
      const projectName = projectNameInput.value.trim();
      const projectDescription = projectDescriptionInput.value.trim();

      if (projectId !== "" && projectName !== "" && projectDescription !== "") {
        const projectItem: projectType = {
          id: projectId,
          name: projectName,
          description: projectDescription
        };

        localStorageAPI.add(projectId, projectItem);
      } else {
        console.error('All fields are required');
      }
    } else {
      console.error('Error');
    }
  });
}


export function getById(callback: (project: projectType | null) => void): void {
  const projectIdInput = document.querySelector<HTMLInputElement>('#project_search');

  if (projectIdInput != null) {
    document.querySelector<HTMLFormElement>('#search_project')!.addEventListener('submit', function (event) {
      event.preventDefault();
      const foundProject = localStorageAPI.getById(projectIdInput.value);
      const previousResult = document.querySelector('.projects');
      if (previousResult) {
        previousResult.remove();
      }

      console.log(foundProject);
      callback(foundProject ? foundProject : null);
    });
  } else {
    callback(null);
  }
}

export function renderProjectList() {
  const projects = localStorageAPI.getAllItems();
  console.log(projects);
  const projectListContainer = document.createElement('div');
  projectListContainer.classList.add('projects');

  let currentColumn: HTMLDivElement | null = null;

  projects.forEach((project, index) => {
    if (index % 2 === 0) {
      currentColumn = document.createElement('div');
      projectListContainer.appendChild(currentColumn);
    }

    if (currentColumn) {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project-list');
      const deleteButton = document.createElement('button');
      deleteButton.type = 'submit';
      deleteButton.innerText = 'X';
      deleteButton.classList.add('delete-project-button')
      deleteButton.addEventListener('click', function () {
        deleteProject(project.id);
      });
      const span = document.createElement('span');
      span.innerHTML = `ID: ${project.id}, Name: ${project.name}, Description: ${project.description}`;
      projectElement.appendChild(span);
      projectElement.appendChild(deleteButton);
      currentColumn.appendChild(projectElement);
    }
  });

  const appContainer = document.querySelector<HTMLDivElement>('#app');
  if (appContainer) {
    appContainer.appendChild(projectListContainer);
  }
}

export function renderProject(project: projectType) {
  const searchForm = document.querySelector<HTMLFormElement>('#search_project');
  if (searchForm) {
    const projectListContainer = document.createElement('div');
    projectListContainer.classList.add('projects');

    const projectElement = document.createElement('div');
    projectElement.classList.add('project-list');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'submit';
    deleteButton.innerText = 'X';
    deleteButton.classList.add('delete-project-button')
    deleteButton.addEventListener('click', function () {
      deleteProject(project.id);
    });
    const span = document.createElement('span');
    span.innerHTML = `ID: ${project.id}, Name: ${project.name}, Description: ${project.description}`;
    projectElement.appendChild(span);
    projectElement.appendChild(deleteButton);
    projectListContainer.appendChild(projectElement);

    searchForm.insertAdjacentElement('afterend', projectListContainer);
  }
}

function deleteProject(key: string) {
  localStorageAPI.delete(key);
  location.reload();
}

