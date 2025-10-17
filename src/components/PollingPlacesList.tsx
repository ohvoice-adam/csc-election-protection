import React from 'react';
// ... existing code ...
// Import the Link component from react-router-dom
import { Link } from 'react-router-dom'
// ... existing code ...
// Update the button to a Link component
;
<Link to={`/polling-place/${pollingPlace.id}`} className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
  View Details
  <ArrowRightIcon className="h-4 w-4 ml-1" />
</Link>;
// ... existing code ...