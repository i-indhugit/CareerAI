export interface Question {
  id: number;
  category: 'interests' | 'personality' | 'technical' | 'creative' | 'preferences';
  text: string;
  weights: {
    technology?: number;
    business?: number;
    creative?: number;
    education?: number;
    healthcare?: number;
    socialImpact?: number;
  };
}

export interface CareerProfile {
  id: string;
  title: string;
  category: 'Technology' | 'Business' | 'Creative' | 'Education' | 'Healthcare' | 'Social Impact';
  salary: string;
  growth: string;
  description: string;
  skills: string[];
  certifications: string[];
  learningPath: string[];
  strengths: string[];
  personalityType: string;
  // Key question IDs that heavily influence this specific career
  keyQuestionWeights: Record<number, number>;
}

export const questions: Question[] = [
  // Interests (1-10)
  {
    id: 1,
    category: 'interests',
    text: 'Do you enjoy solving complex problems?',
    weights: { technology: 2, business: 1, healthcare: 2, education: 1 }
  },
  {
    id: 2,
    category: 'interests',
    text: 'Do you enjoy helping people?',
    weights: { socialImpact: 3, education: 2, healthcare: 3, business: 1 }
  },
  {
    id: 3,
    category: 'interests',
    text: 'Do you enjoy creating visual content?',
    weights: { creative: 3, technology: 1 }
  },
  {
    id: 4,
    category: 'interests',
    text: 'Do you enjoy teaching others?',
    weights: { education: 3, socialImpact: 2, business: 1 }
  },
  {
    id: 5,
    category: 'interests',
    text: 'Do you enjoy researching new topics?',
    weights: { education: 2, healthcare: 2, technology: 2, business: 1 }
  },
  {
    id: 6,
    category: 'interests',
    text: 'Do you enjoy building software applications?',
    weights: { technology: 3 }
  },
  {
    id: 7,
    category: 'interests',
    text: 'Do you enjoy working with numbers and data?',
    weights: { technology: 2, business: 3, healthcare: 1 }
  },
  {
    id: 8,
    category: 'interests',
    text: 'Do you enjoy writing content?',
    weights: { creative: 3, education: 2, business: 1 }
  },
  {
    id: 9,
    category: 'interests',
    text: 'Do you enjoy designing products?',
    weights: { creative: 3, technology: 2, business: 1 }
  },
  {
    id: 10,
    category: 'interests',
    text: 'Do you enjoy organizing events?',
    weights: { business: 3, socialImpact: 2, education: 1 }
  },

  // Personality (11-20)
  {
    id: 11,
    category: 'personality',
    text: 'Do you prefer working independently?',
    weights: { technology: 1, creative: 2, healthcare: 1 } // negative impact on team leading
  },
  {
    id: 12,
    category: 'personality',
    text: 'Do you enjoy leading teams?',
    weights: { business: 3, socialImpact: 2, technology: 1 }
  },
  {
    id: 13,
    category: 'personality',
    text: 'Do you handle pressure well?',
    weights: { business: 2, technology: 2, healthcare: 3 }
  },
  {
    id: 14,
    category: 'personality',
    text: 'Do you enjoy public speaking?',
    weights: { education: 3, socialImpact: 2, business: 2 }
  },
  {
    id: 15,
    category: 'personality',
    text: 'Do you enjoy negotiating with others?',
    weights: { business: 3, socialImpact: 2 }
  },
  {
    id: 16,
    category: 'personality',
    text: 'Are you detail-oriented?',
    weights: { technology: 2, business: 2, healthcare: 3, creative: 1 }
  },
  {
    id: 17,
    category: 'personality',
    text: 'Are you comfortable with uncertainty?',
    weights: { business: 2, technology: 2 } // Startups
  },
  {
    id: 18,
    category: 'personality',
    text: 'Do you enjoy taking initiative?',
    weights: { business: 3, technology: 2, creative: 2 }
  },
  {
    id: 19,
    category: 'personality',
    text: 'Do you enjoy collaborating with diverse teams?',
    weights: { socialImpact: 2, education: 2, business: 2, technology: 1 }
  },
  {
    id: 20,
    category: 'personality',
    text: 'Do you adapt quickly to change?',
    weights: { technology: 2, business: 2, creative: 1 }
  },

  // Technical Skills (21-30)
  {
    id: 21,
    category: 'technical',
    text: 'Are you interested in programming?',
    weights: { technology: 3, creative: 1 }
  },
  {
    id: 22,
    category: 'technical',
    text: 'Do you enjoy working with databases?',
    weights: { technology: 3, business: 1 }
  },
  {
    id: 23,
    category: 'technical',
    text: 'Do you enjoy analyzing data?',
    weights: { technology: 2, business: 3, healthcare: 1 }
  },
  {
    id: 24,
    category: 'technical',
    text: 'Are you interested in artificial intelligence?',
    weights: { technology: 3, business: 1 }
  },
  {
    id: 25,
    category: 'technical',
    text: 'Do you enjoy cybersecurity concepts?',
    weights: { technology: 3 }
  },
  {
    id: 26,
    category: 'technical',
    text: 'Do you enjoy cloud technologies?',
    weights: { technology: 3 }
  },
  {
    id: 27,
    category: 'technical',
    text: 'Do you enjoy automation tools?',
    weights: { technology: 3, business: 1 }
  },
  {
    id: 28,
    category: 'technical',
    text: 'Are you interested in web development?',
    weights: { technology: 3, creative: 2 }
  },
  {
    id: 29,
    category: 'technical',
    text: 'Do you enjoy mobile app development?',
    weights: { technology: 3, creative: 1 }
  },
  {
    id: 30,
    category: 'technical',
    text: 'Do you enjoy system design?',
    weights: { technology: 3, business: 1 }
  },

  // Creative Skills (31-40)
  {
    id: 31,
    category: 'creative',
    text: 'Do you enjoy graphic design?',
    weights: { creative: 3 }
  },
  {
    id: 32,
    category: 'creative',
    text: 'Do you enjoy video editing?',
    weights: { creative: 3 }
  },
  {
    id: 33,
    category: 'creative',
    text: 'Do you enjoy content creation?',
    weights: { creative: 3, education: 1 }
  },
  {
    id: 34,
    category: 'creative',
    text: 'Do you enjoy branding and marketing?',
    weights: { creative: 2, business: 3 }
  },
  {
    id: 35,
    category: 'creative',
    text: 'Do you enjoy UI/UX design?',
    weights: { creative: 3, technology: 2 }
  },
  {
    id: 36,
    category: 'creative',
    text: 'Do you enjoy storytelling?',
    weights: { creative: 3, education: 2 }
  },
  {
    id: 37,
    category: 'creative',
    text: 'Do you enjoy photography?',
    weights: { creative: 3 }
  },
  {
    id: 38,
    category: 'creative',
    text: 'Do you enjoy animation?',
    weights: { creative: 3 }
  },
  {
    id: 39,
    category: 'creative',
    text: 'Do you enjoy creating social media content?',
    weights: { creative: 3, business: 1 }
  },
  {
    id: 40,
    category: 'creative',
    text: 'Do you enjoy product design?',
    weights: { creative: 3, technology: 2 }
  },

  // Work Preferences (41-50)
  {
    id: 41,
    category: 'preferences',
    text: 'Would you prefer remote work?',
    weights: { technology: 2, creative: 1 }
  },
  {
    id: 42,
    category: 'preferences',
    text: 'Do you enjoy client interaction?',
    weights: { business: 3, socialImpact: 2, education: 1 }
  },
  {
    id: 43,
    category: 'preferences',
    text: 'Do you prefer structured environments?',
    weights: { business: 2, healthcare: 2 } // neg for creative
  },
  {
    id: 44,
    category: 'preferences',
    text: 'Do you enjoy startup culture?',
    weights: { technology: 2, business: 2, creative: 1 }
  },
  {
    id: 45,
    category: 'preferences',
    text: 'Do you enjoy project-based work?',
    weights: { technology: 2, creative: 2, business: 1 }
  },
  {
    id: 46,
    category: 'preferences',
    text: 'Do you enjoy fast-paced environments?',
    weights: { business: 2, technology: 2, creative: 1 }
  },
  {
    id: 47,
    category: 'preferences',
    text: 'Do you prefer analytical tasks?',
    weights: { technology: 2, business: 2, healthcare: 2 }
  },
  {
    id: 48,
    category: 'preferences',
    text: 'Do you prefer creative tasks?',
    weights: { creative: 3, education: 1 }
  },
  {
    id: 49,
    category: 'preferences',
    text: 'Do you enjoy mentoring others?',
    weights: { education: 3, socialImpact: 3, business: 1 }
  },
  {
    id: 50,
    category: 'preferences',
    text: 'Do you enjoy strategic planning?',
    weights: { business: 3, technology: 1, socialImpact: 1 }
  }
];

export const careerProfiles: CareerProfile[] = [
  // 1. Technology Careers (10)
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Technology',
    salary: '$115,000 - $160,000',
    growth: '+22% (Much Faster)',
    description: 'Design, write, and debug code for robust, scalable applications that solve modern digital challenges.',
    skills: ['JavaScript/TypeScript', 'React & Node.js', 'System Design', 'Algorithms & Data Structures'],
    certifications: ['AWS Certified Developer', 'Google Professional Cloud Developer', 'Microsoft Azure Developer'],
    learningPath: ['Master basic programming principles in JS or Python', 'Build 3 complex responsive web apps', 'Study SQL & database modeling', 'Learn data structures, Git, and deployment hooks'],
    strengths: ['Logical Thinker', 'Systems Architecting', 'Creative Problem Solver'],
    personalityType: 'Analytical, autonomous, and focused on logical consistency.',
    keyQuestionWeights: { 6: 2, 21: 2, 28: 1, 30: 1 }
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    category: 'Technology',
    salary: '$120,000 - $165,000',
    growth: '+21% (Much Faster)',
    description: 'Construct data pipeline architectures, manage database schemas, and optimize ETL pipelines for big data analytics.',
    skills: ['SQL & NoSQL Databases', 'Python/Scala', 'Apache Spark / Kafka', 'Data Warehousing (Snowflake/Redshift)'],
    certifications: ['Google Professional Data Engineer', 'AWS Certified Data - Specialty', 'Databricks Certified Associate'],
    learningPath: ['Build expert SQL querying skills', 'Learn Python and data manipulation libraries', 'Study cloud data lake structures', 'Build data scraping and pipeline projects'],
    strengths: ['Data Structuring', 'Performance Optimization', 'Methodical Logic'],
    personalityType: 'Structure-oriented, data-driven, and highly organized.',
    keyQuestionWeights: { 7: 2, 22: 2, 23: 1, 47: 1 }
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Technology',
    salary: '$75,000 - $105,000',
    growth: '+25% (Much Faster)',
    description: 'Interpret datasets, generate charts/dashboards, and translate numerical trends into actionable business insights.',
    skills: ['SQL', 'Python (Pandas)', 'Tableau / Power BI', 'Statistical Modeling'],
    certifications: ['Google Data Analytics Certificate', 'Microsoft Power BI Data Analyst', 'CompTIA Data+'],
    learningPath: ['Learn advanced spreadsheet analysis', 'Master SQL queries and joins', 'Learn a dashboard tool like Tableau', 'Build a portfolio analyzing real-world public datasets'],
    strengths: ['Pattern Identification', 'Visual Reporting', 'Meticulous Attention to Detail'],
    personalityType: 'Observant, precise, and communication-focused.',
    keyQuestionWeights: { 7: 2, 23: 2, 16: 1, 47: 1 }
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Technology',
    salary: '$125,000 - $175,000',
    growth: '+36% (Explosive Growth)',
    description: 'Create predictive models, implement machine learning algorithms, and conduct scientific research on deep datasets.',
    skills: ['Python/R', 'Machine Learning (Scikit-Learn)', 'Probability & Statistics', 'Deep Learning Basics'],
    certifications: ['IBM Data Science Professional', 'TensorFlow Developer Certificate', 'SAS Certified Data Scientist'],
    learningPath: ['Build solid mathematical & statistics foundations', 'Learn Python scientific stack (NumPy, SciPy, Pandas)', 'Study core ML algorithms', 'Conduct exploratory research projects'],
    strengths: ['Scientific Research', 'Advanced Mathematics', 'Hypothesis Formulation'],
    personalityType: 'Curious, highly analytical, and open to uncertainty.',
    keyQuestionWeights: { 5: 2, 7: 1, 23: 2, 24: 1 }
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'Technology',
    salary: '$140,000 - $190,000',
    growth: '+40% (Explosive Growth)',
    description: 'Build, deploy, and scale machine learning models in production, optimizing systems for inference speed and accuracy.',
    skills: ['Python / C++', 'PyTorch / TensorFlow', 'MLOps (Kubeflow, MLflow)', 'Cloud Deployment'],
    certifications: ['AWS Certified Machine Learning', 'Google Professional ML Engineer', 'NVIDIA Deep Learning Institute'],
    learningPath: ['Learn programming and software engineering patterns', 'Study mathematical equations of neural networks', 'Build ML models using PyTorch', 'Learn Docker and how to deploy ML APIs'],
    strengths: ['Neural Network Architecting', 'Math Modeling', 'Performance Tuning'],
    personalityType: 'Farsighted, analytical, and highly technical.',
    keyQuestionWeights: { 1: 1, 21: 1, 24: 2, 30: 1 }
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Technology',
    salary: '$135,000 - $185,000',
    growth: '+45% (Explosive Growth)',
    description: 'Integrate Large Language Models (LLMs), design custom AI agents, and build generative AI integrations for applications.',
    skills: ['LLM APIs (OpenAI, Anthropic)', 'LangChain & LlamaIndex', 'Vector Databases (Pinecone, Chroma)', 'Prompt Engineering'],
    certifications: ['Microsoft Azure AI Engineer', 'AWS Certified AI Practitioner', 'Google Generative AI Course Cert'],
    learningPath: ['Learn Python web development (FastAPI)', 'Understand API parameters and rate limits', 'Build apps that combine LLM calls and databases', 'Study Retrieval-Augmented Generation (RAG)'],
    strengths: ['Rapid Prototyping', 'Prompt Orchestration', 'Tech Integration'],
    personalityType: 'Adaptable, innovative, and eager to experiment.',
    keyQuestionWeights: { 6: 1, 21: 1, 24: 2, 27: 1 }
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Technology',
    salary: '$110,000 - $155,000',
    growth: '+19% (Faster)',
    description: 'Manage, deploy, and secure cloud environments across AWS, Azure, or GCP, ensuring high availability and cost efficiency.',
    skills: ['Linux & Networking', 'Terraform (IaC)', 'AWS / GCP / Azure', 'Docker & Kubernetes'],
    certifications: ['AWS Certified Solutions Architect', 'Google Associate Cloud Engineer', 'HashiCorp Certified Terraform'],
    learningPath: ['Learn computer networking and command line scripting', 'Deploy basic virtual machines in AWS/GCP', 'Master infrastructure as code (IaC)', 'Automate cloud setups with scripts'],
    strengths: ['Cloud Network Layouts', 'Cost Analysis', 'Infrastructure Design'],
    personalityType: 'Reliable, methodical, and calm under operational failures.',
    keyQuestionWeights: { 26: 2, 30: 1, 27: 1, 13: 1 }
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Technology',
    salary: '$95,000 - $140,000',
    growth: '+31% (Much Faster)',
    description: 'Protect organization infrastructure from cyber hazards, inspect logs, run audits, and design defense perimeters.',
    skills: ['Network Security Protocols', 'Penetration Testing', 'SIEM Tools (Splunk)', 'Risk Assessments'],
    certifications: ['CompTIA Security+', 'Certified Information Systems Security Professional (CISSP)', 'CEH (Certified Ethical Hacker)'],
    learningPath: ['Learn operating system internals (Linux/Windows)', 'Study network packets and protocols', 'Build lab networks and run security scans', 'Read security compliance frameworks'],
    strengths: ['Security Audit Scans', 'Vulnerability Spotting', 'Ethical Guarding'],
    personalityType: 'Vigilant, detail-oriented, and highly analytical.',
    keyQuestionWeights: { 25: 2, 16: 1, 13: 1, 5: 1 }
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Technology',
    salary: '$120,000 - $170,000',
    growth: '+24% (Much Faster)',
    description: 'Bridge software writing and system deployment. Design build systems, continuous integrations (CI/CD), and server scale engines.',
    skills: ['CI/CD (GitHub Actions, Jenkins)', 'Kubernetes & Docker', 'Bash / Python Scripting', 'Monitoring (Prometheus, Grafana)'],
    certifications: ['AWS DevOps Engineer Professional', 'Certified Kubernetes Administrator (CKA)', 'Docker Certified Associate'],
    learningPath: ['Build custom shell automation scripts', 'Set up GitHub workflows that automatically test projects', 'Study containerization with Docker', 'Deploy clusters using Kubernetes'],
    strengths: ['CI/CD Orchestration', 'Automated Testing Design', 'Operational Reliability'],
    personalityType: 'Calm under fire, efficiency-driven, and logical.',
    keyQuestionWeights: { 27: 2, 26: 1, 30: 1, 13: 1 }
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    category: 'Technology',
    salary: '$100,000 - $145,000',
    growth: '+23% (Much Faster)',
    description: 'Build complete applications, designing both responsive frontend layouts and robust backend servers and databases.',
    skills: ['React / Next.js', 'Node.js / Express', 'Databases (PostgreSQL, MongoDB)', 'REST APIs & GraphQL'],
    certifications: ['AWS Certified Developer - Associate', 'Meta Front-End/Back-End Developer Certificate', 'MongoDB Certified Developer'],
    learningPath: ['Learn HTML, CSS, and modern JavaScript', 'Build dynamic frontends using React', 'Design databases and backend servers using Node/Express', 'Deploy complete full stack apps on Vercel/Render'],
    strengths: ['Dynamic Feature Building', 'Component Reusability', 'Database Connection Logic'],
    personalityType: 'Resourceful, visually capable, and product-focused.',
    keyQuestionWeights: { 6: 1, 21: 1, 28: 2, 22: 1 }
  },

  // 2. Business Careers (6)
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business',
    salary: '$80,000 - $115,000',
    growth: '+11% (Faster)',
    description: 'Evaluate corporate structures, model commercial pipelines, identify bottlenecks, and advise technical adjustments.',
    skills: ['Business Process Modeling', 'SQL & Spreadsheets', 'Requirement Engineering', 'Agile Methodologies'],
    certifications: ['Certified Business Analysis Professional (CBAP)', 'PMI-PBA Certification', 'Agile Scrum Master'],
    learningPath: ['Learn business administration terms', 'Master advanced spreadsheet tools and reports', 'Study business model canvases', 'Practice detailing technical specifications for software developers'],
    strengths: ['Corporate Modeling', 'Verbal Presentation', 'Bottleneck Identification'],
    personalityType: 'Diplomatic, detail-oriented, and business-focused.',
    keyQuestionWeights: { 7: 1, 23: 1, 42: 1, 16: 1 }
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Business',
    salary: '$110,000 - $160,000',
    growth: '+15% (Much Faster)',
    description: 'Own the roadmap of a product, alignment of tech/business interests, feature prioritization, and customer validation.',
    skills: ['Product Roadmap Design', 'A/B Testing & Metrics', 'Agile / Scrum', 'User Research'],
    certifications: ['Product School Certification (PMC)', 'Scrum Alliance Certified Product Owner (CSPO)', 'Pragmatic Institute Cert'],
    learningPath: ['Participate in design sprint workshops', 'Learn key product analytics metrics (Churn, LTV)', 'Practice writing detailed feature specification documents', 'Collaborate with engineering labs on small products'],
    strengths: ['Vision Development', 'Feature Prioritization', 'Interdisciplinary Coordination'],
    personalityType: 'Strategic, outgoing, and highly collaborative.',
    keyQuestionWeights: { 9: 1, 12: 1, 50: 2, 44: 1 }
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    category: 'Business',
    salary: '$85,000 - $130,000',
    growth: '+7% (Average)',
    description: 'Organize milestones, manage resource budgets, coordinate sprint timelines, and keep teams aligned on targets.',
    skills: ['Sprint Scheduling', 'Resource Allocation', 'Risk Management', 'Jira / Asana'],
    certifications: ['Project Management Professional (PMP)', 'Certified Associate in Project Management (CAPM)', 'Certified ScrumMaster (CSM)'],
    learningPath: ['Study project management methodologies (Agile, Waterfall)', 'Practice tracking budgets and charts', 'Earn a foundational CAPM credential', 'Manage small teams on project delivery timelines'],
    strengths: ['Milestone Coordination', 'Team Harmonization', 'Timeline Enforcement'],
    personalityType: 'Highly structured, reliable, and communication-driven.',
    keyQuestionWeights: { 10: 1, 12: 1, 43: 1, 45: 1 }
  },
  {
    id: 'operations-manager',
    title: 'Operations Manager',
    category: 'Business',
    salary: '$90,000 - $135,000',
    growth: '+9% (Faster)',
    description: 'Govern day-to-day corporate operations, optimize operational budgets, coordinate logistics, and increase workspace efficiencies.',
    skills: ['Supply Chain Logistics', 'Budget Optimization', 'Process Standardization', 'Operations Analytics'],
    certifications: ['Lean Six Sigma Green Belt', 'Certified Operations Manager (COM)', 'Certified Supply Chain Professional (CSCP)'],
    learningPath: ['Study operations research and logistics concepts', 'Master Lean and Six Sigma frameworks', 'Build cost analysis spreadsheets', 'Coordinate small business processes or office ops'],
    strengths: ['Resource Efficiency', 'Process Standardization', 'Operational Supervision'],
    personalityType: 'Decisive, stress-resilient, and action-oriented.',
    keyQuestionWeights: { 10: 1, 12: 1, 13: 1, 46: 1 }
  },
  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    category: 'Business',
    salary: '$85,000 - $120,000',
    growth: '+8% (Average)',
    description: 'Track corporate finances, assess investments, formulate forecasting models, and recommend capital actions.',
    skills: ['Financial Modeling', 'Excel Macros & VBA', 'Corporate Accounting', 'Investment Valuation'],
    certifications: ['Chartered Financial Analyst (CFA)', 'Certified Corporate Financial Analyst (FMVA)', 'Series 7 License'],
    learningPath: ['Understand corporate accounting statements', 'Build complex financial valuation models', 'Learn analytical tools and charts', 'Study market and investment trends'],
    strengths: ['Financial Forecasting', 'Market Valuation', 'Quantitative Reporting'],
    personalityType: 'Precise, analytical, and highly structured.',
    keyQuestionWeights: { 7: 2, 47: 2, 16: 1 }
  },
  {
    id: 'hr-specialist',
    title: 'Human Resources Specialist',
    category: 'Business',
    salary: '$65,000 - $95,000',
    growth: '+8% (Average)',
    description: 'Manage recruitment pipelines, resolve internal workspace issues, oversee employee benefits, and guide culture.',
    skills: ['Talent Sourcing', 'Conflict Resolution', 'Employee Relations', 'HRIS Databases'],
    certifications: ['SHRM Certified Professional (SHRM-CP)', 'Professional in Human Resources (PHR)', 'aPHR Cert'],
    learningPath: ['Study workplace laws and regulations', 'Understand HR databases and pipeline setups', 'Practice interpersonal conflict mediation patterns', 'Participate in recruitment and onboarding structures'],
    strengths: ['Interpersonal Mediation', 'Active Listening', 'Organizational Culture Guarding'],
    personalityType: 'Empathetic, collaborative, and people-focused.',
    keyQuestionWeights: { 2: 1, 15: 1, 19: 1, 49: 1 }
  },

  // 3. Creative Careers (6)
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    category: 'Creative',
    salary: '$85,000 - $125,000',
    growth: '+16% (Much Faster)',
    description: 'Research user behavior, draft interface wireframes, establish layout designs, and construct interactive prototypes.',
    skills: ['Figma / Adobe XD', 'Wireframing & Prototyping', 'User Research', 'Design Systems & UI Kits'],
    certifications: ['Google UX Design Certificate', 'Interaction Design Foundation Cert', 'NN/g UX Certification'],
    learningPath: ['Study typography, color theory, and layout scales', 'Master Figma shortcuts and components', 'Build a portfolio with 3 case studies analyzing user pain points', 'Learn responsive CSS layout rules'],
    strengths: ['Empathy-Driven Design', 'Creative Visual Layouts', 'Interactive Prototyping'],
    personalityType: 'Empathetic, visual, and focused on layout efficiency.',
    keyQuestionWeights: { 35: 2, 40: 1, 9: 1, 3: 1 }
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    category: 'Creative',
    salary: '$55,000 - $80,000',
    growth: '+3% (Slow)',
    description: 'Establish branding layouts, generate digital illustrations, compile layouts for marketing assets, and govern company visual styling.',
    skills: ['Adobe Illustrator / Photoshop', 'Vector Illustration', 'Typography & Layouts', 'Brand Assets Design'],
    certifications: ['Adobe Certified Professional', 'Shillington Design Cert', 'Google UX/Design Courses'],
    learningPath: ['Master vector tool operations', 'Practice typography spacing and grid systems', 'Design commercial layouts and posters', 'Compile a rich visual portfolio website'],
    strengths: ['Visual Composition', 'Aesthetic Detail Parsing', 'Creative Concept Mocking'],
    personalityType: 'Aesthetic-driven, creative, and visually focused.',
    keyQuestionWeights: { 31: 2, 3: 2, 48: 1 }
  },
  {
    id: 'content-writer',
    title: 'Content Writer',
    category: 'Creative',
    salary: '$60,000 - $90,000',
    growth: '+9% (Faster)',
    description: 'Write engaging copy, draft blog posts, establish technical documentation, and write marketing email scripts.',
    skills: ['Copywriting & SEO', 'Content Strategy', 'Editing & Proofreading', 'Technical Writing'],
    certifications: ['HubSpot Content Marketing Certificate', 'Google SEO Certification', 'Copyblogger Certified Member'],
    learningPath: ['Write short articles daily on various topics', 'Master SEO optimization and keyphrase mapping', 'Study technical copywriting formulas (AIDA)', 'Publish articles on public blogs'],
    strengths: ['Written Expression', 'Audience Empathy', 'Clear Complex Concept Explaining'],
    personalityType: 'Articulate, reflective, and independent.',
    keyQuestionWeights: { 8: 2, 36: 1, 33: 1 }
  },
  {
    id: 'digital-marketer',
    title: 'Digital Marketer',
    category: 'Creative',
    salary: '$70,000 - $105,000',
    growth: '+10% (Faster)',
    description: 'Plan online ads, deploy campaigns, inspect customer search behaviors, and expand product brand awareness.',
    skills: ['Google Ads & Meta Ads', 'Google Analytics (GA4)', 'SEO / SEM', 'Email Marketing Automation'],
    certifications: ['Google Analytics Individual Qualification', 'Meta Certified Digital Marketing Associate', 'HubSpot Inbound Marketing'],
    learningPath: ['Learn search engine marketing concepts', 'Study customer analytics and click metrics', 'Run small budgets on advertising campaigns', 'Automate email notification sequences'],
    strengths: ['Campaign ROI Tracking', 'Audience Targeting', 'Market Messaging'],
    personalityType: 'Goal-oriented, analytical, and highly communicative.',
    keyQuestionWeights: { 34: 2, 39: 1, 23: 1 }
  },
  {
    id: 'brand-strategist',
    title: 'Brand Strategist',
    category: 'Creative',
    salary: '$85,000 - $130,000',
    growth: '+12% (Faster)',
    description: 'Analyze market positions, formulate branding guides, define tone of voice, and guide advertising design parameters.',
    skills: ['Brand Identity Design', 'Market Positioning Analysis', 'Consumer Psychology', 'Creative Brief Writing'],
    certifications: ['Section4 Certified Brand Strategist', 'Mini MBA in Brand Management', 'Brand Strategy Academy Cert'],
    learningPath: ['Study case studies of major brand re-designs', 'Learn behavioral economics basics', 'Practice writing comprehensive creative briefs', 'Formulate branding guidelines for small scale products'],
    strengths: ['Macro Vision', 'Narrative Branding Synthesis', 'Strategic Business Alignment'],
    personalityType: 'Insightful, strategic, and persuasive.',
    keyQuestionWeights: { 34: 1, 36: 1, 50: 2 }
  },
  {
    id: 'video-editor',
    title: 'Video Editor',
    category: 'Creative',
    salary: '$60,000 - $90,000',
    growth: '+12% (Faster)',
    description: 'Assemble audio/video timelines, color grade footage, align soundtracks, and render promotional assets.',
    skills: ['Adobe Premiere Pro / DaVinci Resolve', 'Color Grading', 'Sound Design & Mixing', 'Motion Graphics (After Effects)'],
    certifications: ['Adobe Certified Professional in Video Design', 'DaVinci Resolve Certification', 'Apple Certified Pro'],
    learningPath: ['Master non-linear editing timelines', 'Learn color theory for video matching', 'Study pacing and storytelling styles', 'Create short promo clips and social reels for a portfolio'],
    strengths: ['Visual Pacing Coordination', 'Audio-Visual Syncing', 'Creative Storytelling Integration'],
    personalityType: 'Imaginative, detail-driven, and focused.',
    keyQuestionWeights: { 32: 2, 33: 1, 36: 1 }
  },

  // 4. Education Careers (4)
  {
    id: 'teacher',
    title: 'Teacher',
    category: 'Education',
    salary: '$55,000 - $80,000',
    growth: '+4% (Slow)',
    description: 'Educate students, formulate lesson plans, grade assignments, and foster educational growth inside classroom facilities.',
    skills: ['Curriculum Delivery', 'Classroom Supervision', 'Student Mentoring', 'Parent Coordination'],
    certifications: ['State Teaching License / Certification', 'TEFL/TESOL Certification', 'Special Education Endorsement'],
    learningPath: ['Complete a university degree in education', 'Fulfill student-teaching internship quotas', 'Pass local teacher licensing exams', 'Practice design of lesson plans and assessments'],
    strengths: ['Pedagogical Instruction', 'Empathetic Communication', 'Classroom Organization'],
    personalityType: 'Encouraging, structured, and patient.',
    keyQuestionWeights: { 4: 2, 2: 1, 14: 1 }
  },
  {
    id: 'trainer',
    title: 'Corporate Trainer',
    category: 'Education',
    salary: '$70,000 - $100,000',
    growth: '+8% (Average)',
    description: 'Instruct employees, formulate corporate training manuals, run workshops, and scale organizational workflows.',
    skills: ['Public Presentation', 'Workshop Design', 'Performance Assessment', 'LMS Platforms'],
    certifications: ['Certified Professional in Talent Development (CPTD)', 'ATD Master Trainer', 'Instructional Design Certificate'],
    learningPath: ['Acquire expertise in a specific industry topic', 'Master public speaking techniques', 'Build workshop assets and presentations', 'Evaluate post-training team performance'],
    strengths: ['Interactive Presentation', 'Operational Workflow Tuning', 'Professional Mentorship'],
    personalityType: 'Expressive, professional, and performance-oriented.',
    keyQuestionWeights: { 4: 1, 14: 2, 49: 1 }
  },
  {
    id: 'academic-researcher',
    title: 'Academic Researcher',
    category: 'Education',
    salary: '$65,000 - $110,000',
    growth: '+6% (Average)',
    description: 'Conduct scientific investigations, write research papers, analyze data, and publish studies in academic databases.',
    skills: ['Scientific Research Methodology', 'Academic Manuscript Writing', 'Data Analysis (R/Python)', 'Grant Proposal Drafting'],
    certifications: ['PhD or Master\'s Degree', 'Human Subjects Research (CITI)', 'Responsible Conduct of Research Cert'],
    learningPath: ['Earn a postgraduate research degree', 'Co-author research papers with mentors', 'Learn advanced statistical modeling', 'Draft grant proposals and present findings at conferences'],
    strengths: ['Deep Systematic Analysis', 'Scholarly Writing', 'Intellectual Persistence'],
    personalityType: 'Curious, independent, and analytically rigorous.',
    keyQuestionWeights: { 5: 2, 11: 1, 47: 1 }
  },
  {
    id: 'instructional-designer',
    title: 'Instructional Designer',
    category: 'Education',
    salary: '$75,000 - $105,000',
    growth: '+10% (Faster)',
    description: 'Design educational coursework materials, configure online learning systems (LMS), and coordinate digital curriculums.',
    skills: ['Curriculum Mapping', 'E-Learning Authoring (Storyline/Captivate)', 'LMS Administration', 'UI/UX Design Basics'],
    certifications: ['Instructional Design Certification', 'E-Learning Instructional Design Certificate', 'ATD Instructional Designer Cert'],
    learningPath: ['Learn curriculum planning models (ADDIE)', 'Master e-learning tools like Articulate Storyline', 'Study user interaction rules for digital learning websites', 'Build online module prototypes'],
    strengths: ['Educational Course Mapping', 'Interactive Module Structuring', 'Digital Platform Optimization'],
    personalityType: 'Innovative, analytical, and education-focused.',
    keyQuestionWeights: { 4: 1, 35: 1, 33: 1, 40: 1 }
  },

  // 5. Healthcare Careers (2)
  {
    id: 'healthcare-admin',
    title: 'Healthcare Administrator',
    category: 'Healthcare',
    salary: '$90,000 - $140,000',
    growth: '+28% (Much Faster)',
    description: 'Supervise operations of medical clinics/hospitals, organize record databases, and oversee regulatory compliance.',
    skills: ['Medical Operations Management', 'Healthcare Billing & Codes', 'Regulatory Compliance', 'Health Information Systems'],
    certifications: ['Certified Healthcare Administrative Professional (cHAP)', 'FACHE Credential', 'MHA Degree'],
    learningPath: ['Study health organization structures', 'Master medical compliance rules (HIPAA)', 'Learn operational database management tools', 'Supervise administrative setups in local clinics'],
    strengths: ['Healthcare Compliance Control', 'Database Management', 'Corporate Coordination'],
    personalityType: 'Systematic, reliable, and structure-driven.',
    keyQuestionWeights: { 2: 1, 43: 2, 10: 1 }
  },
  {
    id: 'medical-researcher',
    title: 'Medical Researcher',
    category: 'Healthcare',
    salary: '$80,000 - $125,000',
    growth: '+17% (Much Faster)',
    description: 'Investigate human pathogens, run medical laboratory trials, analyze clinical data, and write reports on pathology cures.',
    skills: ['Laboratory Assays', 'Biostatistics', 'Pathology Analysis', 'Clinical Trial Design'],
    certifications: ['Master\'s or PhD in Biomedical Sciences', 'Certified Clinical Research Coordinator (CCRC)', 'GCP Certification'],
    learningPath: ['Master cellular biology lab skills', 'Learn data analysis tools and metrics', 'Study good clinical practice guidelines', 'Co-author clinical trial analysis papers'],
    strengths: ['Scientific Research Logic', 'Clinical Auditing', 'Safety Oversight'],
    personalityType: 'Intellectually rigorous, meticulous, and patient.',
    keyQuestionWeights: { 5: 2, 2: 1, 47: 1 }
  },

  // 6. Social Impact Careers (3)
  {
    id: 'ngo-manager',
    title: 'NGO Program Manager',
    category: 'Social Impact',
    salary: '$60,000 - $85,000',
    growth: '+12% (Faster)',
    description: 'Coordinate social impact projects, align charity stakeholders, write grant request documents, and evaluate program outcomes.',
    skills: ['NGO Grant Writing', 'Social Program Audit', 'Donor Relations Management', 'Budgeting & Finance'],
    certifications: ['Project Management for Development (PMD Pro)', 'Certified Fund Raising Executive (CFRE)', 'NGO Leadership Cert'],
    learningPath: ['Study non-profit management principles', 'Draft grant proposals and study compliance', 'Practice social impact valuation models', 'Lead volunteer networks or program deliveries'],
    strengths: ['Donor Alignment Sourcing', 'Social Impact Evaluation', 'Empathetic Team Direction'],
    personalityType: 'Empathetic, leadership-oriented, and vision-driven.',
    keyQuestionWeights: { 2: 1, 12: 1, 50: 1, 45: 1 }
  },
  {
    id: 'community-dev',
    title: 'Community Development Specialist',
    category: 'Social Impact',
    salary: '$55,000 - $80,000',
    growth: '+10% (Faster)',
    description: 'Engage local neighborhoods, run town-hall forums, organize community aid, and represent civic needs.',
    skills: ['Public Outreach Campaigning', 'Stakeholder Facilitation', 'Social Services Sourcing', 'Conflict Mediation'],
    certifications: ['Certified Community Developer (CCD)', 'Mediation & Facilitation Cert', 'Social Work License'],
    learningPath: ['Study urban sociology and policy analysis', 'Participate in civic forums and outreach', 'Practice mediation and public negotiation setups', 'Manage public service campaign budgets'],
    strengths: ['Civic Mobilization', 'Empathetic Public Sourcing', 'Social Service Mediation'],
    personalityType: 'Persuasive, highly collaborative, and socially responsive.',
    keyQuestionWeights: { 2: 1, 14: 1, 19: 1 }
  },
  {
    id: 'social-worker',
    title: 'Social Worker',
    category: 'Social Impact',
    salary: '$50,000 - $75,000',
    growth: '+12% (Faster)',
    description: 'Advocate for vulnerable families, coordinate mental health assistance, manage case files, and counsel clients.',
    skills: ['Case Management System', 'Psychosocial Counseling', 'Crisis Management', 'Community Resource Sourcing'],
    certifications: ['Licensed Clinical Social Worker (LCSW)', 'Master of Social Work (MSW) Degree', 'Crisis Intervention Cert'],
    learningPath: ['Earn a university social work degree', 'Fulfill case-work internship logs in clinics', 'Pass state social work licensing exams', 'Practice psychosocial counseling methods'],
    strengths: ['Crisis Guidance', 'Empathetic Case Management', 'Human Rights Advocacy'],
    personalityType: 'Highly empathetic, resilient, and patient.',
    keyQuestionWeights: { 2: 2, 49: 1, 42: 1 }
  }
];
