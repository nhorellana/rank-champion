export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  proposedSolution: string;
  team: string[];
  category: string;
  tags: string[];
  submissionDate: string;
}

export interface Score {
  projectId: string;
  judgeId: string;
  categoryA: number;
  categoryB: number;
  categoryC: number;
  categoryD: number;
  lastUpdated: string;
}

export interface Judge {
  id: string;
  name: string;
  expertise: string;
  avatar?: string;
}

export interface ProjectScore {
  projectId: string;
  averageA: number;
  averageB: number;
  averageC: number;
  averageD: number;
  totalAverage: number;
  rank: number;
}