import { createRouter, createWebHistory } from 'vue-router';
import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: ProjectsLayout,
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue'),
        },
        {
          path: 'project/:id',
          props: true,
          name: 'project',
          component: () => import('@/modules/projects/views/ProjectView.vue'),
        },
      ],
    },
  ],
});

export default router;
