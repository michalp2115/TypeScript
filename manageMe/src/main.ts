import './style.css'
import { getById, renderProject, renderProjectList, setUpProject } from './project.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <form id="search_project">
    <input placeholder='search project' type="text" id="project_search"/>
    <button id="search_project_button" type="submit">Search</button>
  </form>
  <br/>
  <form id="input_project_form">
    <input placeholder='project id' type="text" id="project_id"Project id />
    <input placeholder='project name' type="text" id="project_name"Project name />
    <input placeholder='project description' type="text" id="project_description"Project description />
    <button id="setUpProject" type="submit">Add project</button>
  </form>
  </div>
`
renderProjectList();
getById((searchProject) => {
  if (searchProject) {
    renderProject(searchProject);
  } else {
    renderProjectList();
  }
});

setUpProject(document.querySelector<HTMLButtonElement>('#setUpProject')!)

