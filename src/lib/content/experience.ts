import { ExperienceSectionType } from '@/lib/types/sections'

export const experienceSection: ExperienceSectionType = {
    title: "where i've worked",
    experiences: [
        {
            company: 'Ati Motors',
            companyUrl: 'https://atimotors.com/',
            role: 'AWS DevOps Engineer',
            started: 'Sep 2025',
            upto: 'Present',
            tasks: [
                'Implemented an agentic CI pipeline using the Jenkins MCP Plugin with Claude AI automating issue detection, code fixes, branch creation, and PR generation on test failures, reducing manual debugging effort by 60%.',
                'Implemented GitHub Actions workflows across Fleet Manager and Deployment Manager repositories to automate Docker image builds on a local build server for development and pushes to AWS ECR for production.',
                'Managed Schneider Electric production bots via AWS EKS and Rancher, monitoring Fleet Manager application and updating SSL certificates for secure HTTPS communication.',
                'Provisioned and maintained Kubernetes clusters with namespaces, network policies, secrets, persistent volumes, and autoscaling to ensure high availability and security.',
                'Configured Jenkins pipelines with configurable parameters and managed Jenkins nodes to enable developers to remotely build and deploy containers on robots via the Jenkins UI.',
                'Optimized Docker image sizes by 50%, migrated Docker Compose secrets to .env files for improved security, and enforced password authentication on docker exec to restrict unauthorized container access.',
                'Supported AWS cloud infrastructure including EC2, ECR, EKS, and S3, and monitored system performance using CloudWatch and Prometheus/Grafana.',
                'Managed GitHub repositories including branching strategies, pull requests, code reviews, and submodule management using Git workflows.',
            ],
        },
        {
            company: 'Raygain Technologies',
            companyUrl: 'https://raygain.com/',
            role: 'DevOps & Computer Vision Engineer',
            client: 'DRDO/CAIR',
            clientUrl: 'http://www.drdo.gov.in/drdo/en/offerings/vacancies/cair-bengaluru-invites-applications-bright-and-young-students-pursuing-bebtech',
            started: 'Aug 2023',
            upto: 'Aug 2025',
            tasks: [
                'Designed and maintained Jenkins pipelines to automate end-to-end build, test, and deployment of ROS2 applications in offline containerized environments.',
                'Annotated images using LabelMe and CVAT for object detection, segmentation, and classification; deployed ML models on Kubernetes to automate annotation, reducing manual intervention by 70%.',
                'Implemented Prometheus to monitor ROS2 nodes, topics, and system metrics, and configured Grafana dashboards for early issue detection.',
                'Configured NGINX as a reverse proxy with HTTPS for Tuleap and Jenkins using self-signed and internal CA certificates in offline environments.',
                'Utilized Tuleap Community Edition for project tracking and agile practices, integrated with Jenkins for automated CI/CD workflows.',
                'Configured internal email notifications by integrating Tuleap and Jenkins with a centralized Zentyal/SOGo mail server for pipeline status alerts.',
            ],
        },
        {
            company: 'Ravina Technologies',
            companyUrl: 'https://ravinatechnologies.com/',
            role: 'DevOps Engineer - Intern (Contract)',
            started: 'July 2021',
            upto: 'July 2022',
            tasks: [
                'Supported CI/CD pipeline automation using Jenkins and Git workflows.',
                'Managed Linux package installations and updates to maintain stable development and production environments.',
                'Managed user accounts on Linux including Active Directory groups and permission assignments for server access.',
                'Created custom IAM users and groups via AWS console to manage access control.',
                'Assisted in deploying and monitoring applications on AWS and Kubernetes.',
                'Monitored system and application health using Prometheus and Grafana, and assisted in troubleshooting issues.',
            ],
        },
    ],
};