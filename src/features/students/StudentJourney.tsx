import { StudentHeader } from './components/StudentHeader';
import { StudentProgress } from './components/StudentProgress';
import { StudentSidebar } from './components/StudentSidebar';
import { useStudentJourney } from './hooks/useStudentJourney';
import { STUDENT_JOURNEY_STEPS } from './constants/steps';

// Add 'export' keyword to make the component available for import
export function StudentJourney() {
  const {
    currentStep,
    studentData,
    handleStepChange,
    updateStudentData
  } = useStudentJourney();

  const CurrentStepComponent = STUDENT_JOURNEY_STEPS[currentStep].component;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <StudentHeader
        title="Student Visa Journey"
        description="Complete each step to prepare your student visa application"
      />
      
      <StudentProgress
        currentStep={currentStep + 1}
        totalSteps={STUDENT_JOURNEY_STEPS.length}
        stepTitle={STUDENT_JOURNEY_STEPS[currentStep].title}
        nextStepTitle={STUDENT_JOURNEY_STEPS[currentStep + 1]?.title || 'Final Review'}
      />
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CurrentStepComponent
            data={studentData}
            onUpdate={updateStudentData}
            onNext={() => handleStepChange(currentStep + 1)}
          />
        </div>

        <StudentSidebar
          requirements={STUDENT_JOURNEY_STEPS[currentStep].requirements}
          visaData={studentData}
        />
      </div>
    </div>
  );
}