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
            'Implemented agentic CI pipelines using the Jenkins MCP Plugin with Claude AI for automated issue detection, code fixes, and pull request generation, reducing manual debugging effort.',
            'Built GitHub Actions workflows to automate Docker image builds and pushes to AWS ECR for production deployments across multiple repositories.',
            'Managed AWS cloud infrastructure including EC2, ECR, EKS, and S3 for application deployments, with monitoring via CloudWatch, Prometheus, and Grafana.',
            'Provisioned and maintained Kubernetes clusters with namespaces, network policies, secrets, persistent volumes, and autoscaling for high availability.',
            'Annotated large image datasets using LabelMe and CVAT for object detection, segmentation, and leveraged Kubernetes to automate annotation workflows, reducing manual effort by 70% and improving data quality.',
            'Optimized Docker image sizes by 50% and enforced security best practices including .env secrets management and container access controls.',
        ],
        softwareSkills: [
            // Agile / Project Management
            { name: 'Jira', icon: 'logos:jira' },
            { name: 'Tuleap', icon: '/tuleap.svg' },
            // Code
            { name: 'Git', icon: 'logos:git-icon' },
            { name: 'GitHub', icon: 'uil:github' },
            // Build
            { name: 'Jenkins', icon: 'devicon:jenkins' },
            { name: 'GitHub Actions', icon: 'logos:github-actions' },
            // Test / Security
            { name: 'CodeAnt AI', icon: 'carbon:ai' },
            // Package
            { name: 'Docker', icon: 'logos:docker-icon' },
            { name: 'Helm', icon: 'devicon:helm' },
            // Deploy / Orchestrate
            { name: 'Kubernetes', icon: 'logos:kubernetes' },
            { name: 'Rancher', icon: 'devicon:rancher' },
            { name: 'Terraform', icon: 'logos:terraform-icon' },
            // Cloud
            { name: 'AWS', icon: 'skill-icons:aws-dark' },
            // Monitor
            { name: 'Prometheus', icon: 'logos:prometheus' },
            { name: 'Grafana', icon: 'logos:grafana' },
            // Infrastructure / Platform
            { name: 'NGINX', icon: 'logos:nginx' },
            { name: 'Ubuntu', icon: 'logos:ubuntu' },
            { name: 'Red Hat', icon: 'logos:redhat' },
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
