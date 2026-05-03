import { ProjectsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper';

const currentYear: number = new Date().getFullYear()

export const projectsSection: ProjectsSectionType = {
    title: 'my projects',

    projects: [
        {
            id: getId(),
            name: 'Kubernetes Helm Microservices Platform',
            url: 'https://maheshbabu-devops.github.io/Kubernetes-Helm-Microservices/',
            repo: 'https://github.com/MaheshBabu-DevOps/Kubernetes-Helm-Microservices',
            img: '/project-img/new-project.jpg',
            year: currentYear,
            tags: ['Kubernetes', 'Helm', 'Docker', 'Prometheus'],
        },
        {
            id: getId(),
            name: 'Terraform AWS Production Infrastructure',
            url: 'https://maheshbabu-devops.github.io/Terraform-AWS-Production-Infra/',
            repo: 'https://github.com/MaheshBabu-DevOps/Terraform-AWS-Production-Infra',
            img: '/project-img/new-project.jpg',
            year: currentYear,
            tags: ['Terraform', 'AWS', 'GitHub Actions', 'IaC'],
        },
        {
            id: getId(),
            name: 'More Projects Coming Soon',
            url: 'coming-soon',
            repo: 'https://github.com/MaheshBabu-DevOps',
            img: '/project-img/new-project.jpg',
            year: currentYear,
            tags: ['DevOps', 'AWS', 'Kubernetes'],
        },
    // Add your projects below:
    // {
    //     id: getId(),
    //     name: 'Project Name',
    //     url: 'https://live-demo-link.com/',
    //     repo: 'https://github.com/MaheshBabu-DevOps/repo-name',
    //     img: '/project-img/your-image.png',
    //     year: 2024,
    //     tags: ['Jenkins', 'Docker', 'AWS'],
    // },
    ],
};