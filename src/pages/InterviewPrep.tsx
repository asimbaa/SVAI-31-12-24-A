import { useState } from 'react';
import { mockQuestions, mockScenarios } from '../data/interviewData';
import InterviewCard from '../components/InterviewCard';

export default function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScenario, setSelectedScenario] = useState(mockScenarios[0]);

  const filteredQuestions = selectedCategory === 'all'
    ? mockQuestions
    : mockQuestions.filter(q => q.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Interview Preparation</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Practice Scenarios</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mockScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedScenario.id === scenario.id
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent hover:border-gray-200'
              }`}
              onClick={() => setSelectedScenario(scenario)}
            >
              <h3 className="font-medium mb-2">{scenario.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{scenario.description}</p>
              <p className="text-sm text-primary">Duration: {scenario.duration}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <label className="text-sm font-medium text-gray-700">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md bg-white"
          >
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="technical">Technical</option>
            <option value="cultural">Cultural</option>
            <option value="language">Language</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredQuestions.map((question) => (
            <InterviewCard key={question.id} question={question} />
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Interview Tips</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3" />
            <p className="text-gray-700">Research common visa interview questions and prepare your answers</p>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3" />
            <p className="text-gray-700">Practice speaking clearly and confidently in English</p>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3" />
            <p className="text-gray-700">Be honest and consistent with your answers</p>
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3" />
            <p className="text-gray-700">Prepare relevant documents and keep them organized</p>
          </li>
        </ul>
      </div>
    </div>
  );
}