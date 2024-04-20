import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      noProjects,
      addProject,
      addTaskToProject,
      projectList,
      projects,
      projectsWithCompletion,
      toggleTask,
    } = useProjectsStore();

    expect(noProjects).toBe(true);
    expect(projectList).toEqual([]);
    expect(projects).toEqual([]);
    expect(projectsWithCompletion).toEqual([]);

    expect(addProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(toggleTask).toBeInstanceOf(Function);
  });

  test('add a project - action', () => {
    const store = useProjectsStore();
    const newProjectName = 'New project';

    store.addProject(newProjectName);

    expect(store.projects.length).toBe(1);
    expect(store.projects[0]).toEqual({
      id: expect.any(String),
      name: newProjectName,
      tasks: [],
    });
  });

  test('should load from localStorage', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const store = useProjectsStore();
    const [project1] = store.projects;

    expect(project1).toEqual({
      id: '1',
      name: 'Project 1',
      tasks: expect.any(Array),
    });

    expect(store.projects.length).toBe(4);
  });

  test('add a task to a project', () => {
    const store = useProjectsStore();
    store.addProject('New Project');
    const project = store.projects.at(0)!;
    const taskName = 'New Task';

    store.addTaskToProject(project.id, taskName);

    expect(project.tasks.length).toBe(1);
    expect(project.tasks.at(0)!).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: undefined,
    });
  });

  test('toggles a task', () => {
    const store = useProjectsStore();
    store.addProject('New Project');
    const project = store.projects.at(0)!;
    const taskName = 'New Task';

    store.addTaskToProject(project.id, taskName);

    const task = project.tasks.at(0)!;

    store.toggleTask(project.id, task.id);

    expect(task).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });

    expect(task.completedAt).toBeInstanceOf(Date);
  });

  test('should return the projects with completion', () => {
    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = fakeProjects;
    });

    // console.log(store.projectsWithCompletion);
    expect(store.projectsWithCompletion).toEqual([
      { id: '1', name: 'Project 1', taskCount: 4, completion: 25 },
      { id: '2', name: 'Project 2', taskCount: 0, completion: 0 },
      { id: '3', name: 'Project 3', taskCount: 2, completion: 50 },
      { id: '4', name: 'Project 4', taskCount: 3, completion: 33 },
    ]);
  });
});
