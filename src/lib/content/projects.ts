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
            img: '/project-img/inventrack_project_banner.svg',
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
            name: 'InvenTrack - Inventory & Order Management System',
            url: 'https://inventory-system-theta-ten.vercel.app',
            repo: 'https://github.com/MaheshBabu-DevOps/inventory-system',
            img: '/project-img/new-project.jpg',
            year: currentYear,
            tags: ['FastAPI', 'React', 'PostgreSQL', 'Docker'],
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
    ],
};
