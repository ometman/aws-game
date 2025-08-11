import { Question } from '../types/game';

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the AWS global infrastructure composed of?",
    options: ["Regions & Availability Zones", "VPCs & Subnets", "EC2s & S3s", "IAM & CloudTrail"],
    correctAnswer: 0,
    difficulty: "Easy",
    points: 1,
    service: "Global Infrastructure",
    category: { id: 'cloud-concepts', name: 'Cloud Concepts', color: 'bg-blue-500', icon: '☁️' },
    explanation: "AWS global infrastructure consists of Regions and Availability Zones, providing geographic distribution and fault tolerance.",
    documentationLink: "https://aws.amazon.com/about-aws/global-infrastructure/"
  },
  {
    id: 2,
    question: "What does IAM stand for?",
    options: ["Identity Access Monitor", "Instance Access Management", "Identity and Access Management", "Internal Account Management"],
    correctAnswer: 2,
    difficulty: "Easy",
    points: 1,
    service: "IAM",
    category: { id: 'security', name: 'Security & Compliance', color: 'bg-red-500', icon: '🔒' },
    explanation: "IAM (Identity and Access Management) is AWS's service for managing users, groups, and permissions.",
    documentationLink: "https://aws.amazon.com/iam/"
  },
  {
    id: 3,
    question: "What AWS service is best for storing object data?",
    options: ["EBS", "EC2", "Lambda", "S3"],
    correctAnswer: 3,
    difficulty: "Easy",
    points: 1,
    service: "S3",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "Amazon S3 (Simple Storage Service) is designed for object storage with high durability and availability.",
    documentationLink: "https://aws.amazon.com/s3/"
  },
  {
    id: 4,
    question: "Which pricing model charges based on usage?",
    options: ["Reserved", "On-Demand", "Free Tier", "Dedicated"],
    correctAnswer: 1,
    difficulty: "Easy",
    points: 1,
    service: "Pricing",
    category: { id: 'billing', name: 'Billing & Pricing', color: 'bg-yellow-500', icon: '💰' },
    explanation: "On-Demand pricing charges you only for what you use, with no upfront costs or long-term commitments.",
    documentationLink: "https://aws.amazon.com/pricing/"
  },
  {
    id: 5,
    question: "What is the purpose of AWS CloudTrail?",
    options: ["Manage instances", "Record API activity", "Encrypt data", "Manage containers"],
    correctAnswer: 1,
    difficulty: "Medium",
    points: 2,
    service: "CloudTrail",
    category: { id: 'security', name: 'Security & Compliance', color: 'bg-red-500', icon: '🔒' },
    explanation: "CloudTrail records API calls and activities in your AWS account for auditing and compliance.",
    documentationLink: "https://aws.amazon.com/cloudtrail/"
  },
  {
    id: 6,
    question: "Which service helps with content delivery?",
    options: ["CloudWatch", "CloudFront", "CodeDeploy", "EC2"],
    correctAnswer: 1,
    difficulty: "Medium",
    points: 2,
    service: "CloudFront",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "CloudFront is AWS's content delivery network (CDN) that delivers content with low latency.",
    documentationLink: "https://aws.amazon.com/cloudfront/"
  },
  {
    id: 7,
    question: "What is AWS Lambda used for?",
    options: ["Object storage", "Container hosting", "Serverless computing", "Logging"],
    correctAnswer: 2,
    difficulty: "Medium",
    points: 2,
    service: "Lambda",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "Lambda is AWS's serverless computing service that runs code without provisioning servers.",
    documentationLink: "https://aws.amazon.com/lambda/"
  },
  {
    id: 8,
    question: "What is an Availability Zone?",
    options: ["A group of users", "A data center in a region", "A security group", "A pricing model"],
    correctAnswer: 1,
    difficulty: "Easy",
    points: 1,
    service: "Global Infrastructure",
    category: { id: 'cloud-concepts', name: 'Cloud Concepts', color: 'bg-blue-500', icon: '☁️' },
    explanation: "An Availability Zone is one or more discrete data centers with redundant power and networking.",
    documentationLink: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
  },
  {
    id: 9,
    question: "Which AWS support plan offers a TAM (Technical Account Manager)?",
    options: ["Basic", "Developer", "Enterprise", "Business"],
    correctAnswer: 2,
    difficulty: "Hard",
    points: 3,
    service: "Support",
    category: { id: 'billing', name: 'Billing & Pricing', color: 'bg-yellow-500', icon: '💰' },
    explanation: "Enterprise support includes a dedicated Technical Account Manager for personalized guidance.",
    documentationLink: "https://aws.amazon.com/premiumsupport/"
  },
  {
    id: 10,
    question: "Which AWS service lets you run relational databases?",
    options: ["S3", "Lambda", "RDS", "DynamoDB"],
    correctAnswer: 2,
    difficulty: "Medium",
    points: 2,
    service: "RDS",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "Amazon RDS (Relational Database Service) makes it easy to set up and manage relational databases.",
    documentationLink: "https://aws.amazon.com/rds/"
  },
  {
    id: 11,
    question: "What is the AWS Free Tier limit for Lambda invocations per month?",
    options: ["1 million", "100,000", "500,000", "Unlimited"],
    correctAnswer: 0,
    difficulty: "Hard",
    points: 3,
    service: "Lambda",
    category: { id: 'billing', name: 'Billing & Pricing', color: 'bg-yellow-500', icon: '💰' },
    explanation: "AWS Free Tier includes 1 million free Lambda requests per month.",
    documentationLink: "https://aws.amazon.com/free/"
  },
  {
    id: 12,
    question: "Which tool helps estimate monthly AWS costs?",
    options: ["TCO Calculator", "Cost Explorer", "Billing Console", "Pricing Calculator"],
    correctAnswer: 3,
    difficulty: "Medium",
    points: 2,
    service: "Pricing",
    category: { id: 'billing', name: 'Billing & Pricing', color: 'bg-yellow-500', icon: '💰' },
    explanation: "AWS Pricing Calculator helps you estimate costs for your AWS use cases.",
    documentationLink: "https://calculator.aws/"
  },
  {
    id: 13,
    question: "What is the shared responsibility model?",
    options: ["AWS handles all security", "Customer handles everything", "Both AWS and customer share roles", "Only third-party vendors are responsible"],
    correctAnswer: 2,
    difficulty: "Hard",
    points: 3,
    service: "Security",
    category: { id: 'security', name: 'Security & Compliance', color: 'bg-red-500', icon: '🔒' },
    explanation: "The shared responsibility model defines security responsibilities between AWS and the customer.",
    documentationLink: "https://aws.amazon.com/compliance/shared-responsibility-model/"
  },
  {
    id: 14,
    question: "Which service is used for DNS routing?",
    options: ["Route 66", "Route 53", "Direct Connect", "CloudRoute"],
    correctAnswer: 1,
    difficulty: "Medium",
    points: 2,
    service: "Route 53",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "Route 53 is AWS's scalable DNS web service for routing end users to applications.",
    documentationLink: "https://aws.amazon.com/route53/"
  },
  {
    id: 15,
    question: "What AWS service is used for monitoring and logging?",
    options: ["CloudTrail", "CloudWatch", "X-Ray", "Trusted Advisor"],
    correctAnswer: 1,
    difficulty: "Medium",
    points: 2,
    service: "CloudWatch",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "CloudWatch provides monitoring and observability for AWS resources and applications.",
    documentationLink: "https://aws.amazon.com/cloudwatch/"
  },
  {
    id: 16,
    question: "What is EC2 best described as?",
    options: ["Storage service", "Virtual server", "Serverless function", "Monitoring tool"],
    correctAnswer: 1,
    difficulty: "Easy",
    points: 1,
    service: "EC2",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud.",
    documentationLink: "https://aws.amazon.com/ec2/"
  },
  {
    id: 17,
    question: "What does S3 stand for?",
    options: ["Simple Secure Storage", "Server Storage Service", "Secure Scalable Storage", "Simple Storage Service"],
    correctAnswer: 3,
    difficulty: "Easy",
    points: 1,
    service: "S3",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "S3 stands for Simple Storage Service, AWS's object storage service.",
    documentationLink: "https://aws.amazon.com/s3/"
  },
  {
    id: 18,
    question: "Which service helps you automate infrastructure deployment?",
    options: ["CloudFormation", "EC2", "CloudTrail", "Elastic Beanstalk"],
    correctAnswer: 0,
    difficulty: "Hard",
    points: 3,
    service: "CloudFormation",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "CloudFormation provides infrastructure as code to automate resource provisioning.",
    documentationLink: "https://aws.amazon.com/cloudformation/"
  },
  {
    id: 19,
    question: "Which service allows hybrid connections to AWS?",
    options: ["VPN Gateway", "Direct Connect", "CloudFront", "IAM"],
    correctAnswer: 1,
    difficulty: "Hard",
    points: 3,
    service: "Direct Connect",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "Direct Connect provides dedicated network connections from your premises to AWS.",
    documentationLink: "https://aws.amazon.com/directconnect/"
  },
  {
    id: 20,
    question: "What service provides NoSQL database?",
    options: ["RDS", "Aurora", "DynamoDB", "Redshift"],
    correctAnswer: 2,
    difficulty: "Medium",
    points: 2,
    service: "DynamoDB",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "DynamoDB is AWS's fully managed NoSQL database service.",
    documentationLink: "https://aws.amazon.com/dynamodb/"
  },
  {
    id: 21,
    question: "What service allows orchestration of containers?",
    options: ["ECS", "Lambda", "EC2", "IAM"],
    correctAnswer: 0,
    difficulty: "Hard",
    points: 3,
    service: "ECS",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "ECS (Elastic Container Service) is a container orchestration service.",
    documentationLink: "https://aws.amazon.com/ecs/"
  },
  {
    id: 22,
    question: "AWS recommends what model for high availability?",
    options: ["One AZ setup", "Multi-AZ and Multi-Region", "On-premises backup", "Active-Passive"],
    correctAnswer: 1,
    difficulty: "Hard",
    points: 3,
    service: "Architecture",
    category: { id: 'architecture', name: 'Architecture', color: 'bg-purple-500', icon: '🏗️' },
    explanation: "Multi-AZ and Multi-Region deployments provide the highest availability and fault tolerance.",
    documentationLink: "https://aws.amazon.com/architecture/"
  },
  {
    id: 23,
    question: "What is the AWS Well-Architected Framework used for?",
    options: ["Designing secure applications", "Monitoring apps", "Choosing instance types", "Pricing calculations"],
    correctAnswer: 0,
    difficulty: "Hard",
    points: 3,
    service: "Architecture",
    category: { id: 'architecture', name: 'Architecture', color: 'bg-purple-500', icon: '🏗️' },
    explanation: "The Well-Architected Framework helps design secure, high-performing, resilient, and efficient infrastructure.",
    documentationLink: "https://aws.amazon.com/architecture/well-architected/"
  },
  {
    id: 24,
    question: "How does AWS charge for S3?",
    options: ["By storage and requests", "By CPU usage", "By number of users", "Monthly subscription"],
    correctAnswer: 0,
    difficulty: "Medium",
    points: 2,
    service: "S3",
    category: { id: 'billing', name: 'Billing & Pricing', color: 'bg-yellow-500', icon: '💰' },
    explanation: "S3 charges based on storage used, number of requests, and data transfer.",
    documentationLink: "https://aws.amazon.com/s3/pricing/"
  },
  {
    id: 25,
    question: "What service sends alerts and alarms?",
    options: ["CloudTrail", "IAM", "CloudWatch", "GuardDuty"],
    correctAnswer: 2,
    difficulty: "Medium",
    points: 2,
    service: "CloudWatch",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "CloudWatch can send alerts and alarms based on metrics and thresholds you define.",
    documentationLink: "https://aws.amazon.com/cloudwatch/"
  },
  {
    id: 26,
    question: "Which AWS service scans for vulnerabilities?",
    options: ["Shield", "Inspector", "CloudTrail", "X-Ray"],
    correctAnswer: 1,
    difficulty: "Hard",
    points: 3,
    service: "Inspector",
    category: { id: 'security', name: 'Security & Compliance', color: 'bg-red-500', icon: '🔒' },
    explanation: "Inspector automatically assesses applications for vulnerabilities and security issues.",
    documentationLink: "https://aws.amazon.com/inspector/"
  },
  {
    id: 27,
    question: "What's the purpose of AWS Trusted Advisor?",
    options: ["Audit and recommendations", "Store passwords", "Write policies", "Create VPCs"],
    correctAnswer: 0,
    difficulty: "Medium",
    points: 2,
    service: "Trusted Advisor",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "Trusted Advisor provides recommendations to help optimize your AWS infrastructure.",
    documentationLink: "https://aws.amazon.com/premiumsupport/technology/trusted-advisor/"
  },
  {
    id: 28,
    question: "What is a Region in AWS?",
    options: ["A physical data center", "A pricing plan", "A logical grouping of AZs", "A customer profile"],
    correctAnswer: 2,
    difficulty: "Easy",
    points: 1,
    service: "Global Infrastructure",
    category: { id: 'cloud-concepts', name: 'Cloud Concepts', color: 'bg-blue-500', icon: '☁️' },
    explanation: "A Region is a geographic area containing multiple Availability Zones.",
    documentationLink: "https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
  },
  {
    id: 29,
    question: "What is the AWS Management Console?",
    options: ["CLI tool", "Web interface", "Billing portal", "API access only"],
    correctAnswer: 1,
    difficulty: "Easy",
    points: 1,
    service: "Management Console",
    category: { id: 'technology', name: 'Technology', color: 'bg-green-500', icon: '⚙️' },
    explanation: "The AWS Management Console is a web-based interface for accessing AWS services.",
    documentationLink: "https://aws.amazon.com/console/"
  },
  {
    id: 30,
    question: "What is the best service for archiving large amounts of infrequently accessed data?",
    options: ["S3 Standard", "Glacier", "EBS", "RDS"],
    correctAnswer: 1,
    difficulty: "Medium",
    points: 2,
    service: "Glacier",
    category: { id: 'services', name: 'AWS Services', color: 'bg-orange-500', icon: '🚀' },
    explanation: "Glacier is designed for long-term archival and backup with very low costs.",
    documentationLink: "https://aws.amazon.com/glacier/"
  }
];

// Question randomization and filtering utilities
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category.id === category);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  if (difficulty === 'mixed') return questions;
  return questions.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
};

export const getRandomQuestions = (count: number, difficulty?: string, categories?: string[]): Question[] => {
  let filteredQuestions = questions;
  
  if (difficulty && difficulty !== 'mixed') {
    filteredQuestions = getQuestionsByDifficulty(difficulty);
  }
  
  if (categories && categories.length > 0) {
    filteredQuestions = filteredQuestions.filter(q => categories.includes(q.category.id));
  }
  
  const shuffled = shuffleArray(filteredQuestions);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};