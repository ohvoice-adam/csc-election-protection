import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CodeIcon, FileTextIcon, BarChartIcon } from 'lucide-react';
interface NotebookCellProps {
  title: string;
  type: 'code' | 'markdown' | 'visualization';
  children: React.ReactNode;
  collapsible?: boolean;
  initiallyCollapsed?: boolean;
}
const NotebookCell: React.FC<NotebookCellProps> = ({
  title,
  type,
  children,
  collapsible = false,
  initiallyCollapsed = false
}) => {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed);
  const getIcon = () => {
    switch (type) {
      case 'code':
        return <CodeIcon className="h-4 w-4 text-blue-500" />;
      case 'markdown':
        return <FileTextIcon className="h-4 w-4 text-purple-500" />;
      case 'visualization':
        return <BarChartIcon className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  const getBorderColor = () => {
    switch (type) {
      case 'code':
        return 'border-blue-200';
      case 'markdown':
        return 'border-purple-200';
      case 'visualization':
        return 'border-green-200';
      default:
        return 'border-gray-200';
    }
  };
  return <div className={`mb-6 border rounded-md ${getBorderColor()}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 rounded-t-md">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
        {collapsible && <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-md text-gray-500 hover:bg-gray-200">
            {collapsed ? <ChevronDownIcon size={16} /> : <ChevronUpIcon size={16} />}
          </button>}
      </div>
      {!collapsed && <div className="p-4">{children}</div>}
    </div>;
};
export default NotebookCell;