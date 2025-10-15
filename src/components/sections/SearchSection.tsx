import React, { useState, useRef, Component } from 'react';
import { SearchIcon, MicIcon, StopCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const SearchSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search by location, incident type, or ask a question...');
  const navigate = useNavigate();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  const toggleSpeechRecognition = () => {
    if (!isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  };
  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setSearchPlaceholder('Listening...');
      };
      recognitionRef.current.onresult = event => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setSearchPlaceholder('Search by location, incident type, or ask a question...');
      };
      recognitionRef.current.onerror = event => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setSearchPlaceholder('Search by location, incident type, or ask a question...');
      };
      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setSearchPlaceholder('Search by location, incident type, or ask a question...');
    }
  };
  return <section id="search" className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Search</h2>
      <p className="text-gray-600 mb-6">
        Search for voter incidents, polling place changes, and accessibility
        issues in your area. Try using natural language like "Show me
        accessibility issues in Richmond" or "Find polling places with long wait
        times".
      </p>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input type="text" className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base" placeholder={searchPlaceholder} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleSpeechRecognition} title={isListening ? 'Stop listening' : 'Search by voice'}>
              {isListening ? <StopCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" /> : <MicIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" aria-hidden="true" />}
            </button>
          </div>
          <button type="submit" className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto">
            <SearchIcon className="h-5 w-5 mr-2 sm:hidden" />
            <span>Search</span>
          </button>
        </div>
      </form>
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Recent Reports
        </h3>
        <ul className="divide-y divide-gray-200">
          <li className="py-3">
            <div className="flex items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-blue-600">
                  Polling Location Change
                </p>
                <p className="text-sm text-gray-500">
                  Ward 6, Precinct 4 - Updated 2 hours ago
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
            </div>
          </li>
          <li className="py-3">
            <div className="flex items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-blue-600">
                  Accessibility Issue
                </p>
                <p className="text-sm text-gray-500">
                  Ward 2, Precinct 7 - Updated 5 hours ago
                </p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Resolved
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>;
};
export default SearchSection;