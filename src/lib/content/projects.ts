import { ProjectsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper';

// Every card links to a real public repo on github.com/MaheshBabu-DevOps.
// `url` (card click) and `repo` (GitHub icon) point to the same repo on purpose.
export const projectsSection: ProjectsSectionType = {
    title: 'my projects',
    projects: [
        {
            id: getId(),
            name: 'Dockerized Multi-Stage Web App with CI',
            url: 'https://github.com/MaheshBabu-DevOps/dockerized-multistage-webapp',
            repo: 'https://github.com/MaheshBabu-DevOps/dockerized-multistage-webapp',
            img: '/project-img/dockerized-multistage-webapp.svg',
            year: 2026,
            tags: ['Docker', 'Compose', 'GitHub Actions', 'Nginx'],
        },
        {
            id: getId(),
            name: 'Offline ROS2 CI/CD Automation (Air-gapped)',
            url: 'https://github.com/MaheshBabu-DevOps/Docker-Based-Offline-ROS2-CI-CD-Automation-Project-using-Tuleap-and-Jenkins',
            repo: 'https://github.com/MaheshBabu-DevOps/Docker-Based-Offline-ROS2-CI-CD-Automation-Project-using-Tuleap-and-Jenkins',
            img: '/project-img/offline-ros2-cicd.svg',
            year: 2025,
            tags: ['Jenkins', 'Docker', 'Tuleap', 'NGINX'],
        },
        {
            id: getId(),
            name: 'Spring Boot DevOps Pipeline on AWS',
            url: 'https://github.com/MaheshBabu-DevOps/springboot-banking-webapp',
            repo: 'https://github.com/MaheshBabu-DevOps/springboot-banking-webapp',
            img: '/project-img/springboot-aws-devops.svg',
            year: 2025,
            tags: ['Terraform', 'AWS', 'Jenkins', 'Docker'],
        },
        {
            id: getId(),
            name: 'Zomato DevSecOps Pipeline on Kubernetes',
            url: 'https://github.com/MaheshBabu-DevOps/Zomato-DevSecOps-Pipeline-Project',
            repo: 'https://github.com/MaheshBabu-DevOps/Zomato-DevSecOps-Pipeline-Project',
            img: '/project-img/zomato-devsecops-k8s.svg',
            year: 2025,
            tags: ['Jenkins', 'Trivy', 'Kubernetes', 'Grafana'],
        },
        {
            id: getId(),
            name: 'Netflix Clone DevSecOps CI/CD Pipeline',
            url: 'https://github.com/MaheshBabu-DevOps/Netflix-DevSecOps-CI-CD-Pipeline',
            repo: 'https://github.com/MaheshBabu-DevOps/Netflix-DevSecOps-CI-CD-Pipeline',
            img: '/project-img/netflix-devsecops.svg',
            year: 2025,
            tags: ['Jenkins', 'SonarQube', 'Trivy', 'Kubernetes'],
        },
    ],
};
