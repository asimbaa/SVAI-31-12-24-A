import { useState } from 'react';
import { applicationSteps } from '../data/applicationSteps';
import StepProgress from '../components/StepProgress';
import { visaTypes } from '../data/visaTypes';

export default function ApplicationGuide() {
  const [selectedVisa, setSelectedVisa] = useState("189");
  const [currentStep, setCurrentStep] = useState(0);

  const steps = applicationSteps[selectedVisa] || [];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Visa Application Guide</h1>
      <p className="text-white/80 mb-8">
        Follow our step-by-step guide to complete your visa application process.
        Each step includes detailed instructions and helpful tips.
      </p>

      <div className="mb-8">
        <label htmlFor="visa-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Visa Type
        </label>
        <select
          id="visa-select"
          value={selectedVisa}
          onChange={(e) => setSelectedVisa(e.target.value)}
          className="w-full md:w-64 p-2 border border-white/10 rounded-md bg-black/20 text-white"
        >
          {visaTypes.map((visa) => (
            <option key={visa.code} value={visa.code}>
              {visa.name} (subclass {visa.code})
            </option>
          ))}
        </select>
      </div>

      <StepProgress
        currentStep={currentStep}
        totalSteps={steps.length}
        onStepClick={setCurrentStep}
      />

      {steps[currentStep] && (
        <div className="bg-black/40 backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-white">{steps[currentStep].title}</h2>
            <p className="text-white/80">{steps[currentStep].description}</p>
            <div className="mt-2 text-sm text-white/60">
              Estimated time: {steps[currentStep].estimatedTime}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Tasks</h3>
              <div className="space-y-4">
                {steps[currentStep].tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 border border-white/10 rounded-lg bg-black/20"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2 text-white">
                        {task.name}
                        {task.important && (
                          <span className="text-xs px-2 py-1 bg-red-500/20 text-red-200 rounded">
                            Important
                          </span>
                        )}
                      </h4>
                      <p className="text-white/80 text-sm mt-1">{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                {steps[currentStep].tips.map((tip, index) => (
                  <li key={index} className="text-white/80">{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 text-primary border border-primary rounded hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Step
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        </div>
      )}
    </div>
  );
}