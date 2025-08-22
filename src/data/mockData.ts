import { Project, Judge, Score } from '@/types/contest';

export const mockJudges: Judge[] = [
  { id: 'j1', name: 'Dr. Sarah Chen', expertise: 'AI & Machine Learning', avatar: '👩‍💼' },
  { id: 'j2', name: 'Mark Rodriguez', expertise: 'Sustainability Tech', avatar: '👨‍💼' },
  { id: 'j3', name: 'Prof. Lisa Wang', expertise: 'Healthcare Innovation', avatar: '👩‍⚕️' },
  { id: 'j4', name: 'David Kumar', expertise: 'Fintech & Blockchain', avatar: '👨‍💻' },
  { id: 'j5', name: 'Dr. Emily Foster', expertise: 'IoT & Smart Cities', avatar: '👩‍🔬' },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'EcoTrack AI',
    description: 'AI-powered carbon footprint tracking for enterprises',
    problem: 'Companies struggle to accurately measure and reduce their carbon footprint',
    proposedSolution: 'Machine learning algorithms that analyze energy consumption patterns and provide actionable insights for sustainability improvements',
    team: ['Alice Johnson', 'Bob Smith', 'Carol Lee'],
    category: 'Sustainability',
    tags: ['AI', 'Environment', 'Analytics'],
    submissionDate: '2024-01-15'
  },
  {
    id: 'p2',
    title: 'HealthGuard',
    description: 'Real-time health monitoring through wearable devices',
    problem: 'Early detection of health issues remains challenging for remote patients',
    proposedSolution: 'IoT wearables with ML algorithms that predict health risks and alert medical professionals in real-time',
    team: ['Dr. Jennifer Wilson', 'Tom Anderson', 'Maria Garcia'],
    category: 'Healthcare',
    tags: ['IoT', 'Healthcare', 'Wearables'],
    submissionDate: '2024-01-16'
  },
  {
    id: 'p3',
    title: 'SmartFarm Pro',
    description: 'Precision agriculture using drone technology and IoT sensors',
    problem: 'Traditional farming methods are inefficient and environmentally harmful',
    proposedSolution: 'Autonomous drones with multispectral cameras and soil sensors for precise crop management and optimization',
    team: ['Robert Taylor', 'Susan Martinez', 'James Thompson'],
    category: 'Agriculture',
    tags: ['Drones', 'IoT', 'Agriculture'],
    submissionDate: '2024-01-17'
  },
  {
    id: 'p4',
    title: 'CyberShield',
    description: 'Advanced threat detection using quantum-resistant encryption',
    problem: 'Current cybersecurity measures are vulnerable to quantum computing attacks',
    proposedSolution: 'Next-generation encryption protocols combined with AI-powered threat detection for enterprise security',
    team: ['Alex Chen', 'Rachel Kim', 'Michael Brown'],
    category: 'Cybersecurity',
    tags: ['Security', 'Encryption', 'AI'],
    submissionDate: '2024-01-18'
  },
  {
    id: 'p5',
    title: 'EduVR Platform',
    description: 'Immersive virtual reality education platform',
    problem: 'Remote learning lacks engagement and hands-on experience',
    proposedSolution: 'VR platform that creates immersive educational experiences for complex subjects like science and history',
    team: ['Lisa Davis', 'Kevin Wong', 'Sarah Johnson'],
    category: 'Education',
    tags: ['VR', 'Education', 'Immersive'],
    submissionDate: '2024-01-19'
  },
  {
    id: 'p6',
    title: 'GreenEnergy Grid',
    description: 'Smart grid optimization for renewable energy distribution',
    problem: 'Renewable energy distribution is inefficient due to unpredictable generation patterns',
    proposedSolution: 'AI-optimized smart grid that predicts energy demand and optimizes renewable energy distribution',
    team: ['Daniel Park', 'Emma Wilson', 'Chris Lee'],
    category: 'Energy',
    tags: ['Smart Grid', 'Renewable', 'AI'],
    submissionDate: '2024-01-20'
  },
  {
    id: 'p7',
    title: 'MedAssist AI',
    description: 'AI-powered diagnostic assistant for healthcare professionals',
    problem: 'Medical diagnosis can be time-consuming and prone to human error',
    proposedSolution: 'Machine learning model trained on medical imaging and patient data to assist doctors in faster, more accurate diagnoses',
    team: ['Dr. Patricia Moore', 'Andrew Kim', 'Nicole Zhang'],
    category: 'Healthcare',
    tags: ['AI', 'Medical', 'Diagnostics'],
    submissionDate: '2024-01-21'
  },
  {
    id: 'p8',
    title: 'FinSecure Blockchain',
    description: 'Decentralized financial security platform',
    problem: 'Traditional banking systems are vulnerable to fraud and lack transparency',
    proposedSolution: 'Blockchain-based platform with smart contracts for secure, transparent financial transactions',
    team: ['John Miller', 'Anna Rodriguez', 'Peter Chen'],
    category: 'Fintech',
    tags: ['Blockchain', 'Security', 'Finance'],
    submissionDate: '2024-01-22'
  },
  {
    id: 'p9',
    title: 'AquaPure Systems',
    description: 'Advanced water purification using nanotechnology',
    problem: 'Access to clean drinking water remains a global challenge',
    proposedSolution: 'Nanotechnology-based water filtration system that removes contaminants at the molecular level',
    team: ['Maria Santos', 'Thomas Liu', 'Jennifer Adams'],
    category: 'Water Tech',
    tags: ['Nanotechnology', 'Water', 'Purification'],
    submissionDate: '2024-01-23'
  },
  {
    id: 'p10',
    title: 'UrbanFlow AI',
    description: 'Traffic optimization system for smart cities',
    problem: 'Urban traffic congestion leads to pollution and time waste',
    proposedSolution: 'AI-powered traffic management system that optimizes traffic flow in real-time using IoT sensors and predictive analytics',
    team: ['Robert Zhang', 'Lisa Thompson', 'Carlos Mendez'],
    category: 'Smart Cities',
    tags: ['AI', 'Traffic', 'IoT'],
    submissionDate: '2024-01-24'
  },
  {
    id: 'p11',
    title: 'SpaceComm Network',
    description: 'Satellite-based internet for remote areas',
    problem: 'Rural and remote areas lack reliable internet connectivity',
    proposedSolution: 'Low-orbit satellite constellation providing high-speed internet access to underserved regions',
    team: ['Dr. Steven Clark', 'Amy Wang', 'Jacob Torres'],
    category: 'Aerospace',
    tags: ['Satellite', 'Connectivity', 'Space'],
    submissionDate: '2024-01-25'
  },
  {
    id: 'p12',
    title: 'BioWaste Converter',
    description: 'Converting organic waste to renewable energy',
    problem: 'Organic waste management is inefficient and environmentally harmful',
    proposedSolution: 'Biogas generation system that converts organic waste into clean energy using advanced fermentation technology',
    team: ['Helen Cooper', 'Mark Johnson', 'Diana Kim'],
    category: 'Renewable Energy',
    tags: ['Biogas', 'Waste', 'Renewable'],
    submissionDate: '2024-01-26'
  },
  {
    id: 'p13',
    title: 'NeuroRestore',
    description: 'Brain-computer interface for rehabilitation',
    problem: 'Stroke and injury patients struggle with motor function recovery',
    proposedSolution: 'BCI technology that helps patients retrain neural pathways for improved motor function recovery',
    team: ['Dr. Richard Gold', 'Sophia Martinez', 'Eric Chen'],
    category: 'Neurotechnology',
    tags: ['BCI', 'Rehabilitation', 'Neuroscience'],
    submissionDate: '2024-01-27'
  },
  {
    id: 'p14',
    title: 'ClimatePredict Pro',
    description: 'Advanced climate modeling and prediction system',
    problem: 'Current climate models lack precision for local weather predictions',
    proposedSolution: 'Machine learning enhanced climate models that provide hyper-local weather predictions for agriculture and disaster preparedness',
    team: ['Dr. Michelle Lee', 'Paul Rodriguez', 'Karen Wang'],
    category: 'Climate Tech',
    tags: ['Climate', 'ML', 'Prediction'],
    submissionDate: '2024-01-28'
  },
  {
    id: 'p15',
    title: 'RoboCare Assistant',
    description: 'AI-powered elderly care companion robot',
    problem: 'Aging population needs more personalized care and companionship',
    proposedSolution: 'Humanoid robot with advanced AI that provides companionship, medication reminders, and emergency assistance for elderly individuals',
    team: ['Grace Liu', 'Tony Anderson', 'Elena Petrov'],
    category: 'Robotics',
    tags: ['Robotics', 'AI', 'Elderly Care'],
    submissionDate: '2024-01-29'
  }
];

// Generate initial random scores for all projects from all judges
export const mockScores: Score[] = [];

mockProjects.forEach(project => {
  mockJudges.forEach(judge => {
    mockScores.push({
      projectId: project.id,
      judgeId: judge.id,
      categoryA: Math.floor(Math.random() * 10) + 1,
      categoryB: Math.floor(Math.random() * 10) + 1,
      categoryC: Math.floor(Math.random() * 10) + 1,
      categoryD: Math.floor(Math.random() * 10) + 1,
      comment: Math.random() > 0.5 ? "Este es un proyecto muy interesante con gran potencial." : undefined,
      melaJuego: Math.random() > 0.8, // 20% chance
      lastUpdated: new Date().toISOString()
    });
  });
});