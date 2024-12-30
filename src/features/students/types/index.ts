export interface JourneyStep {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  requirements: Requirement[];
}

export interface Requirement {
  id: string;
  title: string;
  met: boolean;
  required: boolean;
}

export interface StudentData {
  course: string;
  duration: string;
  institution: string;
  documents: string[];
  completedSteps: string[];
}