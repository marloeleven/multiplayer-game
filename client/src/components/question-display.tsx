'use client';

interface QuestionDisplayProps {
  question: string;
}

export default function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8 text-center">
      <h2 className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wide">
        Solve this problem
      </h2>
      <p className="text-5xl font-bold text-blue-600 font-mono tracking-wider">
        {question}
      </p>
    </div>
  );
}
