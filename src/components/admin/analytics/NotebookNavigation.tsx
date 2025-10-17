import React from 'react';
import { MapIcon } from 'lucide-react';
interface NotebookNavigationProps {
  activeRegion: string;
  setActiveRegion: (region: string) => void;
  darkMode: boolean;
}
const NotebookNavigation: React.FC<NotebookNavigationProps> = ({
  activeRegion,
  setActiveRegion,
  darkMode
}) => {
  const regions = [{
    id: 'statewide',
    label: 'Statewide View'
  }];
  return <div className={`flex overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {regions.map(region => <button key={region.id} onClick={() => setActiveRegion(region.id)} className={`
            flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors
            ${activeRegion === region.id ? `${darkMode ? 'border-blue-500 text-blue-400 bg-gray-900' : 'border-blue-600 text-blue-600 bg-white'} border-b-2` : `${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} border-transparent border-b-2`}
          `}>
          <MapIcon className="w-4 h-4 mr-2" />
          {region.label}
        </button>)}
    </div>;
};
export default NotebookNavigation;