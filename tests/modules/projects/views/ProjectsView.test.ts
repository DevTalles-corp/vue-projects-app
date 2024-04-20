import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('<ProjectsView />', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: fakeProjects,
    });
  });

  test('should be render with projects', () => {
    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(4);

    tableRows.forEach((row, index) => {
      const project = fakeProjects[index];
      const cell = row.findAll('td');
      expect(cell.at(0)?.text()).toBe(project.name);
      expect(cell.at(1)?.text()).toBe(project.tasks.length.toString());
    });
  });

  test('should call addProject method on modal', () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newProjectName = 'New Project';

    inputModal.vm.$emit('value', newProjectName);

    expect(store.addProject).toHaveBeenCalled();
    expect(store.addProject).toHaveBeenCalledWith(newProjectName);
  });
});
