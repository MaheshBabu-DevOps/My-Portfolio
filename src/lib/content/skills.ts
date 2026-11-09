import { SkillsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper'


export const skillsSection: SkillsSectionType = {
    title: 'what i do',
    skills: [
    {
        id: getId(),
        title: 'DevOps & Cloud',
        // animation lottie file: https://lottiefiles.com/
        lottie: {
            light: '/lotties/cloudinfra.json',
            dark: '/lotties/cloudinfra.json',
        },
        points: [
            'Designed an Active-Active High Availability architecture on AWS (EC2, ALB, EFS, RDS, DocumentDB, ElastiCache) with multi-AZ failover in under 30 seconds.',
            'Built Jenkins and GitHub Actions CI/CD pipelines that automate Docker image builds, version tagging, and publishing to Harbor and AWS ECR.',
            'Implemented a two-tier AI-powered PR review pipeline using Claude AI, combining static code analysis and semantic reviews before merge.',
            'Managed production Kubernetes workloads on AWS EKS through Rancher, covering deployments, scaling, secrets, and SSL certificate renewals.',
            'Eliminated hardcoded credentials by migrating secrets to HashiCorp Vault, improving rotation and access control.',
            'Monitored infrastructure, databases, and CI/CD pipelines with Prometheus and Grafana; managed PostgreSQL, MongoDB, and Redis including backup and restore.',
            'Annotated image datasets with LabelMe and CVAT and deployed ML models on Kubernetes to automate annotation workflows.',
        ],
        softwareSkills: [
            // Project Management & Collaboration
            { name: 'Jira', icon: 'logos:jira' },
            { name: 'Tuleap', icon: '/tuleap.svg' },
            { name: 'Slack', icon: 'logos:slack-icon' },
            // Version Control
            { name: 'Git', icon: 'logos:git-icon' },
            { name: 'GitHub', icon: 'uil:github' },
            // CI/CD
            { name: 'Jenkins', icon: 'devicon:jenkins' },
            { name: 'GitHub Actions', icon: 'logos:github-actions' },
            // Containerization & Registry
            { name: 'Docker', icon: 'logos:docker-icon' },
            { name: 'Harbor', icon: 'devicon:harbor' },
            { name: 'Portainer', icon: 'devicon:portainer' },
            // Orchestration
            { name: 'Kubernetes', icon: 'logos:kubernetes' },
            { name: 'Rancher', icon: 'devicon:rancher' },
            // Cloud
            { name: 'AWS', icon: 'skill-icons:aws-dark' },
            // Security
            { name: 'Trivy', icon: 'simple-icons:trivy' },
            { name: 'CodeAnt AI', icon: 'carbon:ai' },
            { name: 'HashiCorp Vault', icon: 'logos:vault-icon' },
            // Monitoring
            { name: 'Prometheus', icon: 'logos:prometheus' },
            { name: 'Grafana', icon: 'logos:grafana' },
            // Infrastructure / Automation
            { name: 'NGINX', icon: 'logos:nginx' },
            { name: 'Ansible', icon: 'logos:ansible' },
            // Databases & Caching
            { name: 'PostgreSQL', icon: 'logos:postgresql' },
            { name: 'MongoDB', icon: 'logos:mongodb-icon' },
            { name: 'Redis', icon: 'logos:redis' },
            // Operating Systems
            { name: 'Ubuntu', icon: 'logos:ubuntu' },
            { name: 'Red Hat', icon: 'logos:redhat' },
            { name: 'Windows', icon: 'logos:microsoft-windows-icon' },
            // AI Tools
            { name: 'Claude AI', icon: 'logos:claude-icon' },
            { name: 'Cursor', icon: 'logos:cursor' },
        ],
    },
    {
        id: getId(),
        title: 'Programming Languages',
        lottie: {
            light: '/lotties/curl-code.json',
            dark: '/lotties/curl-code2.json',
        },
        points: [
            'Experienced in Python for DevOps automation, infrastructure scripting, system monitoring, and internal tooling.',
            'Experienced in writing Bash shell scripts for CI/CD pipelines, server configuration, log management, and Linux task automation.',
            'Skilled in writing YAML configurations for Kubernetes manifests, Docker Compose files, and GitHub Actions workflows.',
        ],
        softwareSkills: [
            { name: 'Python', icon: 'logos:python' },
            { name: 'YAML', icon: 'vscode-icons:file-type-yaml' },
            { name: 'Bash', icon: 'skill-icons:bash-dark' },
        ],
    },
    ],
};
