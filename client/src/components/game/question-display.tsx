'use client';
import { cn } from '@/lib/utils';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const OPERATION_MAP = {
  '+': '+',
  '-': '-',
  '*': '\\times',
  '/': '\\longdiv',
} as const;

type Operation = keyof typeof OPERATION_MAP;

interface HTMLDivElementExtended extends HTMLDivElement {
  scrollIntoViewIfNeeded: () => void;
}

function ProblemDisplay({ question }: { question: string }) {
  const [num1, operation, num2] = question.split(' ') as [
    string,
    Operation,
    string,
  ];

  const ope = OPERATION_MAP[operation];

  if (operation === '/') {
    return (
      <MathJax>{`
          \\begin{array}{r}
            ${num2} \\enclose{longdiv}{${num1}} \\\\
            \\hline
          \\end{array}
        `}</MathJax>
    );
  }

  return (
    <MathJax>{`
          \\begin{array}{r}
            ${num1} \\\\
            ${ope} ${num2} \\\\
            \\hline
          \\end{array}
        `}</MathJax>
  );
}

interface QuestionDisplayProps {
  question: string;
  className?: string;
}

export function QuestionDisplay({ question, className }: QuestionDisplayProps) {
  const onMount = (el: HTMLDivElementExtended) => {
    if (el) {
      setTimeout(() => {
        el.scrollIntoViewIfNeeded
          ? el.scrollIntoViewIfNeeded()
          : el.scrollIntoView();
      }, 500);
    }
  };

  return (
    <div
      className={cn(
        'bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-8 text-center',
        className,
      )}
      ref={onMount}
    >
      <h2 className="text-gray-600 text-sm font-semibold mb-4 uppercase tracking-wide">
        Solve this problem
      </h2>
      <p className="text-5xl font-bold text-blue-600 font-mono tracking-wider">
        <MathJaxContext>
          <ProblemDisplay question={question} />
        </MathJaxContext>
      </p>
    </div>
  );
}
