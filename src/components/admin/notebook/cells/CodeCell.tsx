import React, { useState } from 'react';
import { PlayIcon } from 'lucide-react';
interface CodeCellProps {
  code: string;
}
const CodeCell: React.FC<CodeCellProps> = ({
  code
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1500);
  };
  return <div>
      <div className="flex justify-end mb-2">
        <button onClick={runCode} disabled={isRunning} className={`inline-flex items-center px-3 py-1 border rounded-md text-sm font-medium ${isRunning ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed' : 'bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-100'}`}>
          <PlayIcon size={14} className="mr-1" />
          {isRunning ? 'Running...' : 'Run'}
        </button>
      </div>
      <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-800">
        {code}
      </pre>
    </div>;
};
export default CodeCell;