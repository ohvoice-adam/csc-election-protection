import React, { useEffect, useState } from 'react';
import { SendIcon, AlertTriangleIcon, SearchIcon, CameraIcon, CheckIcon, XIcon } from 'lucide-react';
// Sample polling locations for dropdown
const pollingLocations = [{
  id: 1,
  name: 'Fairfax High School',
  address: '3501 Lion Run, Fairfax, VA 22030'
}, {
  id: 2,
  name: 'Arlington Community Center',
  address: '5115 Arlington Blvd, Arlington, VA 22204'
}, {
  id: 3,
  name: 'Alexandria City Hall',
  address: '301 King St, Alexandria, VA 22314'
}, {
  id: 4,
  name: 'Loudoun County High School',
  address: '415 Dry Mill Rd SW, Leesburg, VA 20175'
}, {
  id: 5,
  name: 'Prince William Library',
  address: '9750 Liberia Ave, Manassas, VA 20110'
}, {
  id: 6,
  name: 'Henrico Recreation Center',
  address: '8301 Hungary Spring Rd, Henrico, VA 23228'
}, {
  id: 7,
  name: 'Chesterfield Elementary School',
  address: '9601 Krause Rd, Chesterfield, VA 23832'
}, {
  id: 8,
  name: 'Richmond Convention Center',
  address: '403 N 3rd St, Richmond, VA 23219'
}, {
  id: 9,
  name: 'Virginia Beach Civic Center',
  address: '2100 Parks Ave, Virginia Beach, VA 23451'
}, {
  id: 10,
  name: 'Norfolk State University',
  address: '700 Park Ave, Norfolk, VA 23504'
}];
const StatusCheckForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pollingLocationId: '',
    accessibilityStatus: '',
    parkingStatus: '',
    generalConditions: '',
    waitTime: '',
    notes: '',
    verificationCode: ''
  });
  const [accessibilityOptions, setAccessibilityOptions] = useState({
    rampPresent: false,
    doorWideEnough: false,
    pathClear: false,
    adaCompliantBooth: false
  });
  const [parkingOptions, setParkingOptions] = useState({
    sufficientParking: false,
    handicapParking: false,
    closeDropOff: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(pollingLocations);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    id: number;
    name: string;
    address: string;
  } | null>(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  // Filter locations based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations(pollingLocations);
      return;
    }
    const filtered = pollingLocations.filter(location => location.name.toLowerCase().includes(searchTerm.toLowerCase()) || location.address.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredLocations(filtered);
  }, [searchTerm]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleAccessibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked
    } = e.target;
    setAccessibilityOptions({
      ...accessibilityOptions,
      [name]: checked
    });
  };
  const handleParkingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked
    } = e.target;
    setParkingOptions({
      ...parkingOptions,
      [name]: checked
    });
  };
  const handleLocationSelect = (location: {
    id: number;
    name: string;
    address: string;
  }) => {
    setSelectedLocation(location);
    setFormData({
      ...formData,
      pollingLocationId: location.id.toString()
    });
    setSearchTerm(location.name);
    setShowLocationDropdown(false);
  };
  const handleSearchFocus = () => {
    setShowLocationDropdown(true);
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoUploaded(true);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert('Please select a polling location from the dropdown');
      return;
    }
    if (!photoUploaded) {
      alert('Please upload a photo of the polling location');
      return;
    }
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, we'll accept any verification code that's 6 digits
      if (/^\d{6}$/.test(formData.verificationCode)) {
        setSubmitted(true);
        setVerificationError('');
      } else {
        setVerificationError('Please enter a valid 6-digit verification code');
      }
      setIsVerifying(false);
    }, 1000);
  };
  return <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Polling Location Status Check
      </h2>
      <p className="text-gray-600 mb-6">
        For Election Protection Volunteers arriving at a polling location.
        Please complete this form to report on the current conditions.
      </p>
      {submitted ? <div className="p-4 rounded-md bg-green-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Status check submitted successfully
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Thank you for your report. This information helps us monitor
                  polling location conditions.
                </p>
                <p className="mt-2">
                  Reference number:{' '}
                  <strong>
                    SC-{Math.floor(100000 + Math.random() * 900000)}
                  </strong>
                </p>
              </div>
              <div className="mt-4">
                <button type="button" onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                pollingLocationId: '',
                accessibilityStatus: '',
                parkingStatus: '',
                generalConditions: '',
                waitTime: '',
                notes: '',
                verificationCode: ''
              });
              setAccessibilityOptions({
                rampPresent: false,
                doorWideEnough: false,
                pathClear: false,
                adaCompliantBooth: false
              });
              setParkingOptions({
                sufficientParking: false,
                handicapParking: false,
                closeDropOff: false
              });
              setSelectedLocation(null);
              setSearchTerm('');
              setPhotoUploaded(false);
              setPhotoPreview(null);
            }} className="text-sm font-medium text-green-700 hover:text-green-600">
                  Submit another status check
                </button>
              </div>
            </div>
          </div>
        </div> : <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input type="text" name="name" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input type="tel" name="phone" id="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.phone} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" name="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="pollingLocation" className="block text-sm font-medium text-gray-700">
              Polling Location
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" id="pollingLocation" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search for polling location..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onFocus={handleSearchFocus} required />
              {showLocationDropdown && <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto max-h-60 focus:outline-none sm:text-sm">
                  {filteredLocations.length === 0 ? <div className="text-gray-500 px-4 py-2">
                      No locations found
                    </div> : filteredLocations.map(location => <div key={location.id} className="cursor-pointer hover:bg-gray-100 px-4 py-2" onClick={() => handleLocationSelect(location)}>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-xs text-gray-500">
                          {location.address}
                        </div>
                      </div>)}
                </div>}
            </div>
            {selectedLocation && <p className="mt-1 text-sm text-gray-500">
                Selected: {selectedLocation.name}, {selectedLocation.address}
              </p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accessibility Check
            </label>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="rampPresent" name="rampPresent" type="checkbox" checked={accessibilityOptions.rampPresent} onChange={handleAccessibilityChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="rampPresent" className="font-medium text-gray-700">
                    Wheelchair ramp present and usable
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="doorWideEnough" name="doorWideEnough" type="checkbox" checked={accessibilityOptions.doorWideEnough} onChange={handleAccessibilityChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="doorWideEnough" className="font-medium text-gray-700">
                    Entrance doors wide enough for wheelchairs
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="pathClear" name="pathClear" type="checkbox" checked={accessibilityOptions.pathClear} onChange={handleAccessibilityChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="pathClear" className="font-medium text-gray-700">
                    Path to entrance clear of obstacles
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="adaCompliantBooth" name="adaCompliantBooth" type="checkbox" checked={accessibilityOptions.adaCompliantBooth} onChange={handleAccessibilityChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="adaCompliantBooth" className="font-medium text-gray-700">
                    ADA-compliant voting booth available
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parking Availability
            </label>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="sufficientParking" name="sufficientParking" type="checkbox" checked={parkingOptions.sufficientParking} onChange={handleParkingChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sufficientParking" className="font-medium text-gray-700">
                    Sufficient parking available
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="handicapParking" name="handicapParking" type="checkbox" checked={parkingOptions.handicapParking} onChange={handleParkingChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="handicapParking" className="font-medium text-gray-700">
                    Handicap parking spots available
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="closeDropOff" name="closeDropOff" type="checkbox" checked={parkingOptions.closeDropOff} onChange={handleParkingChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="closeDropOff" className="font-medium text-gray-700">
                    Close drop-off point for voters with disabilities
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="waitTime" className="block text-sm font-medium text-gray-700">
              Current Wait Time
            </label>
            <select name="waitTime" id="waitTime" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.waitTime} onChange={handleChange} required>
              <option value="">Select wait time</option>
              <option value="No Wait">No Wait (Less than 10 minutes)</option>
              <option value="Short Wait">Short Wait (10-30 minutes)</option>
              <option value="Moderate Wait">
                Moderate Wait (30-60 minutes)
              </option>
              <option value="Long Wait">Long Wait (1-2 hours)</option>
              <option value="Very Long Wait">Very Long Wait (2+ hours)</option>
            </select>
          </div>
          <div>
            <label htmlFor="generalConditions" className="block text-sm font-medium text-gray-700">
              General Polling Place Conditions
            </label>
            <textarea name="generalConditions" id="generalConditions" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.generalConditions} onChange={handleChange} required placeholder="Describe the general condition of the polling place..."></textarea>
          </div>
          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Photo of Polling Location (Required)
            </label>
            <div className="mt-1 flex items-center">
              <div className="flex-shrink-0">
                {photoPreview ? <div className="relative h-24 w-24 rounded-md overflow-hidden">
                    <img className="h-full w-full object-cover" src={photoPreview} alt="Preview" />
                  </div> : <div className="h-24 w-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <CameraIcon className="h-8 w-8 text-gray-400" />
                  </div>}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload a photo</span>
                    <input id="photo-upload" name="photo-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} required />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {photoUploaded && <div className="mt-1 flex items-center text-sm text-green-600">
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Photo uploaded
                  </div>}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Notes (Optional)
            </label>
            <textarea name="notes" id="notes" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={formData.notes} onChange={handleChange} placeholder="Any additional information that might be relevant..."></textarea>
          </div>
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
              Verification Code
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="verificationCode" id="verificationCode" className={`block w-full border ${verificationError ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} value={formData.verificationCode} onChange={handleChange} required pattern="\d{6}" title="6-digit verification code" placeholder="Enter 6-digit code" />
              {verificationError && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <AlertTriangleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                </div>}
            </div>
            {verificationError && <p className="mt-2 text-sm text-red-600">{verificationError}</p>}
            <p className="mt-1 text-xs text-gray-500">
              For demo purposes, enter any 6-digit number
            </p>
          </div>
          <div>
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isVerifying}>
              {isVerifying ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </> : <>
                  <SendIcon className="h-4 w-4 mr-2" />
                  Submit Status Check
                </>}
            </button>
          </div>
        </form>}
    </section>;
};
export default StatusCheckForm;