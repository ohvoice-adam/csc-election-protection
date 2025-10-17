import { PollingPlace } from '../pages/PollingPlacesPage';
export interface ExtendedPollingPlace extends PollingPlace {
  hasRemovedPrecinct?: boolean;
  removedPrecincts?: Array<{
    id: string;
    name: string;
  }>;
}
export const extendedPollingPlacesData: ExtendedPollingPlace[] = [{
  id: '1',
  name: 'Fairfax High School',
  address: '3501 Lion Run, Fairfax, VA 22030',
  county: 'Fairfax',
  zipCode: '22030',
  lat: 38.846,
  lng: -77.306,
  precincts: [{
    id: 'F01',
    name: 'Fairfax Precinct 1',
    recentlyChanged: false
  }, {
    id: 'F02',
    name: 'Fairfax Precinct 2',
    recentlyChanged: true
  }, {
    id: 'F03',
    name: 'Fairfax Precinct 3',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RF01',
    name: 'Fairfax Old Precinct 4'
  }]
}, {
  id: '2',
  name: 'Arlington Community Center',
  address: '5115 Arlington Blvd, Arlington, VA 22204',
  county: 'Arlington',
  zipCode: '22204',
  lat: 38.88,
  lng: -77.106,
  precincts: [{
    id: 'A01',
    name: 'Arlington Precinct 1',
    recentlyChanged: false
  }, {
    id: 'A02',
    name: 'Arlington Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '3',
  name: 'Alexandria City Hall',
  address: '301 King St, Alexandria, VA 22314',
  county: 'Alexandria',
  zipCode: '22314',
  lat: 38.804,
  lng: -77.047,
  precincts: [{
    id: 'AX01',
    name: 'Alexandria Precinct 1',
    recentlyChanged: true
  }, {
    id: 'AX02',
    name: 'Alexandria Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RAX01',
    name: 'Alexandria Old Town Precinct'
  }]
}, {
  id: '4',
  name: 'Loudoun County High School',
  address: '415 Dry Mill Rd SW, Leesburg, VA 20175',
  county: 'Loudoun',
  zipCode: '20175',
  lat: 39.116,
  lng: -77.564,
  precincts: [{
    id: 'L01',
    name: 'Loudoun Precinct 1',
    recentlyChanged: false
  }, {
    id: 'L02',
    name: 'Loudoun Precinct 2',
    recentlyChanged: false
  }, {
    id: 'L03',
    name: 'Loudoun Precinct 3',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '5',
  name: 'Prince William Library',
  address: '9750 Liberia Ave, Manassas, VA 20110',
  county: 'Prince William',
  zipCode: '20110',
  lat: 38.751,
  lng: -77.475,
  precincts: [{
    id: 'PW01',
    name: 'Prince William Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PW02',
    name: 'Prince William Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RPW01',
    name: 'Prince William Eastern Precinct'
  }]
}, {
  id: '6',
  name: 'Henrico Recreation Center',
  address: '8301 Hungary Spring Rd, Henrico, VA 23228',
  county: 'Henrico',
  zipCode: '23228',
  lat: 37.54,
  lng: -77.469,
  precincts: [{
    id: 'H01',
    name: 'Henrico Precinct 1',
    recentlyChanged: false
  }, {
    id: 'H02',
    name: 'Henrico Precinct 2',
    recentlyChanged: true
  }, {
    id: 'H03',
    name: 'Henrico Precinct 3',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '7',
  name: 'Chesterfield Elementary School',
  address: '9601 Krause Rd, Chesterfield, VA 23832',
  county: 'Chesterfield',
  zipCode: '23832',
  lat: 37.376,
  lng: -77.578,
  precincts: [{
    id: 'C01',
    name: 'Chesterfield Precinct 1',
    recentlyChanged: true
  }, {
    id: 'C02',
    name: 'Chesterfield Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RC01',
    name: 'Chesterfield Southern Precinct'
  }]
}, {
  id: '8',
  name: 'Richmond Convention Center',
  address: '403 N 3rd St, Richmond, VA 23219',
  county: 'Richmond City',
  zipCode: '23219',
  lat: 37.541,
  lng: -77.436,
  precincts: [{
    id: 'R01',
    name: 'Richmond Precinct 1',
    recentlyChanged: false
  }, {
    id: 'R02',
    name: 'Richmond Precinct 2',
    recentlyChanged: true
  }, {
    id: 'R03',
    name: 'Richmond Precinct 3',
    recentlyChanged: false
  }, {
    id: 'R04',
    name: 'Richmond Precinct 4',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '9',
  name: 'Virginia Beach Civic Center',
  address: '2100 Parks Ave, Virginia Beach, VA 23451',
  county: 'Virginia Beach',
  zipCode: '23451',
  lat: 36.852,
  lng: -75.977,
  precincts: [{
    id: 'VB01',
    name: 'Virginia Beach Precinct 1',
    recentlyChanged: false
  }, {
    id: 'VB02',
    name: 'Virginia Beach Precinct 2',
    recentlyChanged: false
  }, {
    id: 'VB03',
    name: 'Virginia Beach Precinct 3',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RVB01',
    name: 'Virginia Beach Oceanfront Precinct'
  }]
}, {
  id: '10',
  name: 'Norfolk State University',
  address: '700 Park Ave, Norfolk, VA 23504',
  county: 'Norfolk',
  zipCode: '23504',
  lat: 36.849,
  lng: -76.261,
  precincts: [{
    id: 'N01',
    name: 'Norfolk Precinct 1',
    recentlyChanged: true
  }, {
    id: 'N02',
    name: 'Norfolk Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '11',
  name: 'Chesapeake Central Library',
  address: '298 Cedar Rd, Chesapeake, VA 23322',
  county: 'Chesapeake',
  zipCode: '23322',
  lat: 36.721,
  lng: -76.241,
  precincts: [{
    id: 'CH01',
    name: 'Chesapeake Precinct 1',
    recentlyChanged: false
  }, {
    id: 'CH02',
    name: 'Chesapeake Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RCH01',
    name: 'Chesapeake Eastern Branch Precinct'
  }]
}, {
  id: '12',
  name: 'Newport News High School',
  address: '4200 Marshall Ave, Newport News, VA 23607',
  county: 'Newport News',
  zipCode: '23607',
  lat: 36.981,
  lng: -76.428,
  precincts: [{
    id: 'NN01',
    name: 'Newport News Precinct 1',
    recentlyChanged: true
  }, {
    id: 'NN02',
    name: 'Newport News Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '13',
  name: 'Hampton University',
  address: '100 E Queen St, Hampton, VA 23668',
  county: 'Hampton',
  zipCode: '23668',
  lat: 37.021,
  lng: -76.335,
  precincts: [{
    id: 'HP01',
    name: 'Hampton Precinct 1',
    recentlyChanged: false
  }, {
    id: 'HP02',
    name: 'Hampton Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RHP01',
    name: 'Hampton Downtown Precinct'
  }]
}, {
  id: '14',
  name: 'Suffolk Community Center',
  address: '110 N 8th St, Suffolk, VA 23434',
  county: 'Suffolk',
  zipCode: '23434',
  lat: 36.731,
  lng: -76.583,
  precincts: [{
    id: 'SU01',
    name: 'Suffolk Precinct 1',
    recentlyChanged: true
  }, {
    id: 'SU02',
    name: 'Suffolk Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '15',
  name: 'Portsmouth City Hall',
  address: '801 Crawford St, Portsmouth, VA 23704',
  county: 'Portsmouth',
  zipCode: '23704',
  lat: 36.835,
  lng: -76.298,
  precincts: [{
    id: 'PO01',
    name: 'Portsmouth Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PO02',
    name: 'Portsmouth Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RPO01',
    name: 'Portsmouth Naval Yard Precinct'
  }]
}, {
  id: '16',
  name: 'Roanoke City Library',
  address: '706 S Jefferson St, Roanoke, VA 24016',
  county: 'Roanoke City',
  zipCode: '24016',
  lat: 37.271,
  lng: -79.942,
  precincts: [{
    id: 'RC01',
    name: 'Roanoke City Precinct 1',
    recentlyChanged: false
  }, {
    id: 'RC02',
    name: 'Roanoke City Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '17',
  name: 'Lynchburg College',
  address: '1501 Lakeside Dr, Lynchburg, VA 24501',
  county: 'Lynchburg',
  zipCode: '24501',
  lat: 37.404,
  lng: -79.182,
  precincts: [{
    id: 'LY01',
    name: 'Lynchburg Precinct 1',
    recentlyChanged: true
  }, {
    id: 'LY02',
    name: 'Lynchburg Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RLY01',
    name: 'Lynchburg College Hill Precinct'
  }]
}, {
  id: '18',
  name: 'Danville Community College',
  address: '1008 S Main St, Danville, VA 24541',
  county: 'Danville',
  zipCode: '24541',
  lat: 36.585,
  lng: -79.395,
  precincts: [{
    id: 'D01',
    name: 'Danville Precinct 1',
    recentlyChanged: false
  }, {
    id: 'D02',
    name: 'Danville Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '19',
  name: 'Fredericksburg Convention Center',
  address: '2371 Carl D. Silver Pkwy, Fredericksburg, VA 22401',
  county: 'Fredericksburg',
  zipCode: '22401',
  lat: 38.299,
  lng: -77.485,
  precincts: [{
    id: 'FR01',
    name: 'Fredericksburg Precinct 1',
    recentlyChanged: false
  }, {
    id: 'FR02',
    name: 'Fredericksburg Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RFR01',
    name: 'Fredericksburg Downtown Precinct'
  }]
}, {
  id: '20',
  name: 'Charlottesville High School',
  address: '1400 Melbourne Rd, Charlottesville, VA 22901',
  county: 'Charlottesville',
  zipCode: '22901',
  lat: 38.046,
  lng: -78.499,
  precincts: [{
    id: 'CV01',
    name: 'Charlottesville Precinct 1',
    recentlyChanged: true
  }, {
    id: 'CV02',
    name: 'Charlottesville Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '21',
  name: 'Staunton City Hall',
  address: '116 W Beverley St, Staunton, VA 24401',
  county: 'Staunton',
  zipCode: '24401',
  lat: 38.149,
  lng: -79.072,
  precincts: [{
    id: 'ST01',
    name: 'Staunton Precinct 1',
    recentlyChanged: false
  }, {
    id: 'ST02',
    name: 'Staunton Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RST01',
    name: 'Staunton North Precinct'
  }]
}, {
  id: '22',
  name: 'Harrisonburg Community Center',
  address: '305 S Dogwood Dr, Harrisonburg, VA 22801',
  county: 'Harrisonburg',
  zipCode: '22801',
  lat: 38.439,
  lng: -78.869,
  precincts: [{
    id: 'HB01',
    name: 'Harrisonburg Precinct 1',
    recentlyChanged: false
  }, {
    id: 'HB02',
    name: 'Harrisonburg Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '23',
  name: 'Winchester Public Library',
  address: '175 N Washington St, Winchester, VA 22601',
  county: 'Winchester',
  zipCode: '22601',
  lat: 39.186,
  lng: -78.166,
  precincts: [{
    id: 'WI01',
    name: 'Winchester Precinct 1',
    recentlyChanged: true
  }, {
    id: 'WI02',
    name: 'Winchester Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RWI01',
    name: 'Winchester Old Town Precinct'
  }]
}, {
  id: '24',
  name: 'Blacksburg Municipal Building',
  address: '300 S Main St, Blacksburg, VA 24060',
  county: 'Montgomery',
  zipCode: '24060',
  lat: 37.229,
  lng: -80.414,
  precincts: [{
    id: 'MG01',
    name: 'Montgomery Precinct 1',
    recentlyChanged: false
  }, {
    id: 'MG02',
    name: 'Montgomery Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '25',
  name: 'Christiansburg Recreation Center',
  address: '1600 N Franklin St, Christiansburg, VA 24073',
  county: 'Montgomery',
  zipCode: '24073',
  lat: 37.141,
  lng: -80.408,
  precincts: [{
    id: 'MG03',
    name: 'Montgomery Precinct 3',
    recentlyChanged: false
  }, {
    id: 'MG04',
    name: 'Montgomery Precinct 4',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RMG01',
    name: 'Montgomery Western Precinct'
  }]
}, {
  id: '26',
  name: 'Fairfax County Government Center',
  address: '12000 Government Center Pkwy, Fairfax, VA 22035',
  county: 'Fairfax',
  zipCode: '22035',
  lat: 38.853,
  lng: -77.356,
  precincts: [{
    id: 'F04',
    name: 'Fairfax Precinct 4',
    recentlyChanged: true
  }, {
    id: 'F05',
    name: 'Fairfax Precinct 5',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '27',
  name: 'Vienna Community Center',
  address: '120 Cherry St SE, Vienna, VA 22180',
  county: 'Fairfax',
  zipCode: '22180',
  lat: 38.901,
  lng: -77.265,
  precincts: [{
    id: 'F06',
    name: 'Fairfax Precinct 6',
    recentlyChanged: false
  }, {
    id: 'F07',
    name: 'Fairfax Precinct 7',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RF02',
    name: 'Vienna Town Precinct'
  }]
}, {
  id: '28',
  name: 'Reston Community Center',
  address: '2310 Colts Neck Rd, Reston, VA 20191',
  county: 'Fairfax',
  zipCode: '20191',
  lat: 38.958,
  lng: -77.356,
  precincts: [{
    id: 'F08',
    name: 'Fairfax Precinct 8',
    recentlyChanged: false
  }, {
    id: 'F09',
    name: 'Fairfax Precinct 9',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '29',
  name: 'Falls Church Community Center',
  address: '223 Little Falls St, Falls Church, VA 22046',
  county: 'Falls Church',
  zipCode: '22046',
  lat: 38.882,
  lng: -77.174,
  precincts: [{
    id: 'FC01',
    name: 'Falls Church Precinct 1',
    recentlyChanged: true
  }, {
    id: 'FC02',
    name: 'Falls Church Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RFC01',
    name: 'Falls Church East Precinct'
  }]
}, {
  id: '30',
  name: 'Manassas City Hall',
  address: '9027 Center St, Manassas, VA 20110',
  county: 'Manassas',
  zipCode: '20110',
  lat: 38.751,
  lng: -77.475,
  precincts: [{
    id: 'MA01',
    name: 'Manassas Precinct 1',
    recentlyChanged: false
  }, {
    id: 'MA02',
    name: 'Manassas Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '31',
  name: 'Woodbridge Senior Center',
  address: '13850 Church Hill Dr, Woodbridge, VA 22191',
  county: 'Prince William',
  zipCode: '22191',
  lat: 38.643,
  lng: -77.293,
  precincts: [{
    id: 'PW03',
    name: 'Prince William Precinct 3',
    recentlyChanged: true
  }, {
    id: 'PW04',
    name: 'Prince William Precinct 4',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RPW02',
    name: 'Woodbridge Central Precinct'
  }]
}, {
  id: '32',
  name: 'Dale City Recreation Center',
  address: '14300 Minnieville Rd, Dale City, VA 22193',
  county: 'Prince William',
  zipCode: '22193',
  lat: 38.657,
  lng: -77.349,
  precincts: [{
    id: 'PW05',
    name: 'Prince William Precinct 5',
    recentlyChanged: false
  }, {
    id: 'PW06',
    name: 'Prince William Precinct 6',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '33',
  name: 'Stafford County Government Center',
  address: '1300 Courthouse Rd, Stafford, VA 22554',
  county: 'Stafford',
  zipCode: '22554',
  lat: 38.422,
  lng: -77.408,
  precincts: [{
    id: 'SF01',
    name: 'Stafford Precinct 1',
    recentlyChanged: true
  }, {
    id: 'SF02',
    name: 'Stafford Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RSF01',
    name: 'Stafford North Precinct'
  }]
}, {
  id: '34',
  name: 'Spotsylvania County Library',
  address: '9701 Leavells Rd, Fredericksburg, VA 22407',
  county: 'Spotsylvania',
  zipCode: '22407',
  lat: 38.244,
  lng: -77.542,
  precincts: [{
    id: 'SP01',
    name: 'Spotsylvania Precinct 1',
    recentlyChanged: false
  }, {
    id: 'SP02',
    name: 'Spotsylvania Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '35',
  name: 'Caroline County Community Center',
  address: '17202 Richmond Turnpike, Milford, VA 22514',
  county: 'Caroline',
  zipCode: '22514',
  lat: 38.024,
  lng: -77.338,
  precincts: [{
    id: 'CA01',
    name: 'Caroline Precinct 1',
    recentlyChanged: false
  }, {
    id: 'CA02',
    name: 'Caroline Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RCA01',
    name: 'Caroline Eastern Precinct'
  }]
}, {
  id: '36',
  name: 'King George County Administration',
  address: '10459 Courthouse Dr, King George, VA 22485',
  county: 'King George',
  zipCode: '22485',
  lat: 38.274,
  lng: -77.181,
  precincts: [{
    id: 'KG01',
    name: 'King George Precinct 1',
    recentlyChanged: true
  }, {
    id: 'KG02',
    name: 'King George Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '37',
  name: 'Westmoreland County Courthouse',
  address: '111 Polk St, Montross, VA 22520',
  county: 'Westmoreland',
  zipCode: '22520',
  lat: 38.093,
  lng: -76.827,
  precincts: [{
    id: 'WM01',
    name: 'Westmoreland Precinct 1',
    recentlyChanged: false
  }, {
    id: 'WM02',
    name: 'Westmoreland Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RWM01',
    name: 'Westmoreland Colonial Beach Precinct'
  }]
}, {
  id: '38',
  name: 'Northumberland County Library',
  address: '7204 Northumberland Hwy, Heathsville, VA 22473',
  county: 'Northumberland',
  zipCode: '22473',
  lat: 37.917,
  lng: -76.471,
  precincts: [{
    id: 'NU01',
    name: 'Northumberland Precinct 1',
    recentlyChanged: false
  }, {
    id: 'NU02',
    name: 'Northumberland Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '39',
  name: 'Lancaster County High School',
  address: '8815 Mary Ball Rd, Lancaster, VA 22503',
  county: 'Lancaster',
  zipCode: '22503',
  lat: 37.752,
  lng: -76.465,
  precincts: [{
    id: 'LA01',
    name: 'Lancaster Precinct 1',
    recentlyChanged: true
  }, {
    id: 'LA02',
    name: 'Lancaster Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RLA01',
    name: 'Lancaster Kilmarnock Precinct'
  }]
}, {
  id: '40',
  name: 'Middlesex County Courthouse',
  address: '73 Bowden St, Saluda, VA 23149',
  county: 'Middlesex',
  zipCode: '23149',
  lat: 37.608,
  lng: -76.579,
  precincts: [{
    id: 'MI01',
    name: 'Middlesex Precinct 1',
    recentlyChanged: false
  }, {
    id: 'MI02',
    name: 'Middlesex Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '41',
  name: 'Gloucester County Library',
  address: '6382 Main St, Gloucester, VA 23061',
  county: 'Gloucester',
  zipCode: '23061',
  lat: 37.415,
  lng: -76.523,
  precincts: [{
    id: 'GL01',
    name: 'Gloucester Precinct 1',
    recentlyChanged: false
  }, {
    id: 'GL02',
    name: 'Gloucester Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RGL01',
    name: 'Gloucester Point Precinct'
  }]
}, {
  id: '42',
  name: 'Mathews County School Board Office',
  address: '63 Church St, Mathews, VA 23109',
  county: 'Mathews',
  zipCode: '23109',
  lat: 37.436,
  lng: -76.323,
  precincts: [{
    id: 'MT01',
    name: 'Mathews Precinct 1',
    recentlyChanged: true
  }, {
    id: 'MT02',
    name: 'Mathews Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '43',
  name: 'York County Administration Building',
  address: '224 Ballard St, Yorktown, VA 23690',
  county: 'York',
  zipCode: '23690',
  lat: 37.238,
  lng: -76.509,
  precincts: [{
    id: 'YK01',
    name: 'York Precinct 1',
    recentlyChanged: false
  }, {
    id: 'YK02',
    name: 'York Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RYK01',
    name: 'Yorktown Historic Precinct'
  }]
}, {
  id: '44',
  name: 'James City County Recreation Center',
  address: '5301 Longhill Rd, Williamsburg, VA 23188',
  county: 'James City',
  zipCode: '23188',
  lat: 37.321,
  lng: -76.765,
  precincts: [{
    id: 'JC01',
    name: 'James City Precinct 1',
    recentlyChanged: false
  }, {
    id: 'JC02',
    name: 'James City Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '45',
  name: 'Williamsburg Community Building',
  address: '401 N Boundary St, Williamsburg, VA 23185',
  county: 'Williamsburg',
  zipCode: '23185',
  lat: 37.274,
  lng: -76.707,
  precincts: [{
    id: 'WB01',
    name: 'Williamsburg Precinct 1',
    recentlyChanged: true
  }, {
    id: 'WB02',
    name: 'Williamsburg Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RWB01',
    name: 'Williamsburg College Precinct'
  }]
}, {
  id: '46',
  name: 'New Kent County Administration',
  address: '12007 Courthouse Cir, New Kent, VA 23124',
  county: 'New Kent',
  zipCode: '23124',
  lat: 37.518,
  lng: -77.001,
  precincts: [{
    id: 'NK01',
    name: 'New Kent Precinct 1',
    recentlyChanged: false
  }, {
    id: 'NK02',
    name: 'New Kent Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '47',
  name: 'Charles City County Government Center',
  address: '10900 Courthouse Rd, Charles City, VA 23030',
  county: 'Charles City',
  zipCode: '23030',
  lat: 37.351,
  lng: -77.074,
  precincts: [{
    id: 'CC01',
    name: 'Charles City Precinct 1',
    recentlyChanged: false
  }, {
    id: 'CC02',
    name: 'Charles City Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RCC01',
    name: 'Charles City Eastern Precinct'
  }]
}, {
  id: '48',
  name: 'Colonial Heights High School',
  address: '3600 Conduit Rd, Colonial Heights, VA 23834',
  county: 'Colonial Heights',
  zipCode: '23834',
  lat: 37.252,
  lng: -77.41,
  precincts: [{
    id: 'CH01',
    name: 'Colonial Heights Precinct 1',
    recentlyChanged: true
  }, {
    id: 'CH02',
    name: 'Colonial Heights Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '49',
  name: 'Petersburg Library',
  address: '201 W Washington St, Petersburg, VA 23803',
  county: 'Petersburg',
  zipCode: '23803',
  lat: 37.231,
  lng: -77.402,
  precincts: [{
    id: 'PE01',
    name: 'Petersburg Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PE02',
    name: 'Petersburg Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RPE01',
    name: 'Petersburg Old Towne Precinct'
  }]
}, {
  id: '50',
  name: 'Hopewell Community Center',
  address: '100 W City Point Rd, Hopewell, VA 23860',
  county: 'Hopewell',
  zipCode: '23860',
  lat: 37.31,
  lng: -77.287,
  precincts: [{
    id: 'HO01',
    name: 'Hopewell Precinct 1',
    recentlyChanged: false
  }, {
    id: 'HO02',
    name: 'Hopewell Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '51',
  name: 'Dinwiddie County Government Center',
  address: '14010 Boydton Plank Rd, Dinwiddie, VA 23841',
  county: 'Dinwiddie',
  zipCode: '23841',
  lat: 37.073,
  lng: -77.584,
  precincts: [{
    id: 'DW01',
    name: 'Dinwiddie Precinct 1',
    recentlyChanged: true
  }, {
    id: 'DW02',
    name: 'Dinwiddie Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RDW01',
    name: 'Dinwiddie Southern Precinct'
  }]
}, {
  id: '52',
  name: 'Prince George County Library',
  address: '6605 Courts Dr, Prince George, VA 23875',
  county: 'Prince George',
  zipCode: '23875',
  lat: 37.226,
  lng: -77.289,
  precincts: [{
    id: 'PG01',
    name: 'Prince George Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PG02',
    name: 'Prince George Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '53',
  name: 'Sussex County Courthouse',
  address: '15098 Courthouse Rd, Sussex, VA 23884',
  county: 'Sussex',
  zipCode: '23884',
  lat: 36.921,
  lng: -77.279,
  precincts: [{
    id: 'SX01',
    name: 'Sussex Precinct 1',
    recentlyChanged: false
  }, {
    id: 'SX02',
    name: 'Sussex Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RSX01',
    name: 'Sussex Eastern Precinct'
  }]
}, {
  id: '54',
  name: 'Surry County Government Center',
  address: '45 School St, Surry, VA 23883',
  county: 'Surry',
  zipCode: '23883',
  lat: 37.137,
  lng: -76.835,
  precincts: [{
    id: 'SY01',
    name: 'Surry Precinct 1',
    recentlyChanged: true
  }, {
    id: 'SY02',
    name: 'Surry Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '55',
  name: 'Isle of Wight County Courthouse',
  address: '17000 Monument Cir, Isle of Wight, VA 23397',
  county: 'Isle of Wight',
  zipCode: '23397',
  lat: 36.91,
  lng: -76.703,
  precincts: [{
    id: 'IW01',
    name: 'Isle of Wight Precinct 1',
    recentlyChanged: false
  }, {
    id: 'IW02',
    name: 'Isle of Wight Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RIW01',
    name: 'Smithfield Precinct'
  }]
}, {
  id: '56',
  name: 'Franklin City Hall',
  address: '207 W 2nd Ave, Franklin, VA 23851',
  county: 'Franklin City',
  zipCode: '23851',
  lat: 36.674,
  lng: -76.941,
  precincts: [{
    id: 'FC01',
    name: 'Franklin City Precinct 1',
    recentlyChanged: false
  }, {
    id: 'FC02',
    name: 'Franklin City Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '57',
  name: 'Southampton County Administration',
  address: '26022 Administration Center Dr, Courtland, VA 23837',
  county: 'Southampton',
  zipCode: '23837',
  lat: 36.716,
  lng: -77.068,
  precincts: [{
    id: 'SO01',
    name: 'Southampton Precinct 1',
    recentlyChanged: true
  }, {
    id: 'SO02',
    name: 'Southampton Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RSO01',
    name: 'Southampton Western Precinct'
  }]
}, {
  id: '58',
  name: 'Emporia City Hall',
  address: '201 S Main St, Emporia, VA 23847',
  county: 'Emporia',
  zipCode: '23847',
  lat: 36.686,
  lng: -77.542,
  precincts: [{
    id: 'EM01',
    name: 'Emporia Precinct 1',
    recentlyChanged: false
  }, {
    id: 'EM02',
    name: 'Emporia Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '59',
  name: 'Greensville County Government Center',
  address: '1781 Brunswick Ave, Emporia, VA 23847',
  county: 'Greensville',
  zipCode: '23847',
  lat: 36.687,
  lng: -77.528,
  precincts: [{
    id: 'GR01',
    name: 'Greensville Precinct 1',
    recentlyChanged: false
  }, {
    id: 'GR02',
    name: 'Greensville Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RGR01',
    name: 'Greensville Southern Precinct'
  }]
}, {
  id: '60',
  name: 'Brunswick County Government Center',
  address: '102 Tobacco St, Lawrenceville, VA 23868',
  county: 'Brunswick',
  zipCode: '23868',
  lat: 36.758,
  lng: -77.846,
  precincts: [{
    id: 'BR01',
    name: 'Brunswick Precinct 1',
    recentlyChanged: true
  }, {
    id: 'BR02',
    name: 'Brunswick Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '61',
  name: 'Mecklenburg County Administration',
  address: '350 Washington St, Boydton, VA 23917',
  county: 'Mecklenburg',
  zipCode: '23917',
  lat: 36.667,
  lng: -78.388,
  precincts: [{
    id: 'ME01',
    name: 'Mecklenburg Precinct 1',
    recentlyChanged: false
  }, {
    id: 'ME02',
    name: 'Mecklenburg Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RME01',
    name: 'South Hill Precinct'
  }]
}, {
  id: '62',
  name: 'Lunenburg County Middle School',
  address: '1121 Courthouse Rd, Victoria, VA 23974',
  county: 'Lunenburg',
  zipCode: '23974',
  lat: 36.971,
  lng: -78.244,
  precincts: [{
    id: 'LU01',
    name: 'Lunenburg Precinct 1',
    recentlyChanged: false
  }, {
    id: 'LU02',
    name: 'Lunenburg Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '63',
  name: 'Nottoway County Courthouse',
  address: '328 W Courthouse Rd, Nottoway, VA 23955',
  county: 'Nottoway',
  zipCode: '23955',
  lat: 37.083,
  lng: -78.054,
  precincts: [{
    id: 'NO01',
    name: 'Nottoway Precinct 1',
    recentlyChanged: true
  }, {
    id: 'NO02',
    name: 'Nottoway Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RNO01',
    name: 'Blackstone Precinct'
  }]
}, {
  id: '64',
  name: 'Amelia County Administration Building',
  address: '16360 Dunn St, Amelia Court House, VA 23002',
  county: 'Amelia',
  zipCode: '23002',
  lat: 37.342,
  lng: -77.98,
  precincts: [{
    id: 'AM01',
    name: 'Amelia Precinct 1',
    recentlyChanged: false
  }, {
    id: 'AM02',
    name: 'Amelia Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '65',
  name: 'Powhatan County Library',
  address: '2270 Mann Rd, Powhatan, VA 23139',
  county: 'Powhatan',
  zipCode: '23139',
  lat: 37.54,
  lng: -77.916,
  precincts: [{
    id: 'PO01',
    name: 'Powhatan Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PO02',
    name: 'Powhatan Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RPO02',
    name: 'Powhatan Eastern Precinct'
  }]
}, {
  id: '66',
  name: 'Goochland County Administration Building',
  address: '1800 Sandy Hook Rd, Goochland, VA 23063',
  county: 'Goochland',
  zipCode: '23063',
  lat: 37.683,
  lng: -77.892,
  precincts: [{
    id: 'GO01',
    name: 'Goochland Precinct 1',
    recentlyChanged: true
  }, {
    id: 'GO02',
    name: 'Goochland Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '67',
  name: 'Hanover County Administration Building',
  address: '7516 County Complex Rd, Hanover, VA 23069',
  county: 'Hanover',
  zipCode: '23069',
  lat: 37.766,
  lng: -77.37,
  precincts: [{
    id: 'HA01',
    name: 'Hanover Precinct 1',
    recentlyChanged: false
  }, {
    id: 'HA02',
    name: 'Hanover Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RHA01',
    name: 'Ashland Precinct'
  }]
}, {
  id: '68',
  name: 'King William County Administration Building',
  address: '180 Horse Landing Rd, King William, VA 23086',
  county: 'King William',
  zipCode: '23086',
  lat: 37.691,
  lng: -77.015,
  precincts: [{
    id: 'KW01',
    name: 'King William Precinct 1',
    recentlyChanged: false
  }, {
    id: 'KW02',
    name: 'King William Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '69',
  name: 'King and Queen County Courthouse',
  address: "242 Allen's Circle, King and Queen Court House, VA 23085",
  county: 'King and Queen',
  zipCode: '23085',
  lat: 37.67,
  lng: -76.879,
  precincts: [{
    id: 'KQ01',
    name: 'King and Queen Precinct 1',
    recentlyChanged: true
  }, {
    id: 'KQ02',
    name: 'King and Queen Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RKQ01',
    name: 'King and Queen Central Precinct'
  }]
}, {
  id: '70',
  name: 'Essex County Administration Building',
  address: '202 S Church Ln, Tappahannock, VA 22560',
  county: 'Essex',
  zipCode: '22560',
  lat: 37.926,
  lng: -76.859,
  precincts: [{
    id: 'ES01',
    name: 'Essex Precinct 1',
    recentlyChanged: false
  }, {
    id: 'ES02',
    name: 'Essex Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '71',
  name: 'Richmond County Courthouse',
  address: '101 Court Cir, Warsaw, VA 22572',
  county: 'Richmond County',
  zipCode: '22572',
  lat: 37.959,
  lng: -76.728,
  precincts: [{
    id: 'RC01',
    name: 'Richmond County Precinct 1',
    recentlyChanged: false
  }, {
    id: 'RC02',
    name: 'Richmond County Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RRC01',
    name: 'Warsaw Precinct'
  }]
}, {
  id: '72',
  name: 'Accomack County Administration Building',
  address: '23296 Courthouse Ave, Accomac, VA 23301',
  county: 'Accomack',
  zipCode: '23301',
  lat: 37.719,
  lng: -75.668,
  precincts: [{
    id: 'AC01',
    name: 'Accomack Precinct 1',
    recentlyChanged: true
  }, {
    id: 'AC02',
    name: 'Accomack Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '73',
  name: 'Northampton County Administration Building',
  address: '16404 Courthouse Rd, Eastville, VA 23347',
  county: 'Northampton',
  zipCode: '23347',
  lat: 37.347,
  lng: -75.939,
  precincts: [{
    id: 'NP01',
    name: 'Northampton Precinct 1',
    recentlyChanged: false
  }, {
    id: 'NP02',
    name: 'Northampton Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RNP01',
    name: 'Cape Charles Precinct'
  }]
}, {
  id: '74',
  name: 'Buckingham County Administration Building',
  address: '13380 W James Anderson Hwy, Buckingham, VA 23921',
  county: 'Buckingham',
  zipCode: '23921',
  lat: 37.551,
  lng: -78.553,
  precincts: [{
    id: 'BU01',
    name: 'Buckingham Precinct 1',
    recentlyChanged: false
  }, {
    id: 'BU02',
    name: 'Buckingham Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '75',
  name: 'Cumberland County Administration Building',
  address: '1 Courthouse Cir, Cumberland, VA 23040',
  county: 'Cumberland',
  zipCode: '23040',
  lat: 37.497,
  lng: -78.259,
  precincts: [{
    id: 'CU01',
    name: 'Cumberland Precinct 1',
    recentlyChanged: true
  }, {
    id: 'CU02',
    name: 'Cumberland Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RCU01',
    name: 'Cumberland Central Precinct'
  }]
}, {
  id: '76',
  name: 'Prince Edward County Courthouse',
  address: '111 S Main St, Farmville, VA 23901',
  county: 'Prince Edward',
  zipCode: '23901',
  lat: 37.302,
  lng: -78.392,
  precincts: [{
    id: 'PE01',
    name: 'Prince Edward Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PE02',
    name: 'Prince Edward Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '77',
  name: 'Charlotte County Administration Building',
  address: '250 LeGrande Ave, Charlotte Court House, VA 23923',
  county: 'Charlotte',
  zipCode: '23923',
  lat: 37.056,
  lng: -78.639,
  precincts: [{
    id: 'CH01',
    name: 'Charlotte Precinct 1',
    recentlyChanged: false
  }, {
    id: 'CH02',
    name: 'Charlotte Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RCH02',
    name: 'Charlotte Western Precinct'
  }]
}, {
  id: '78',
  name: 'Halifax County Administration Building',
  address: '134 S Main St, Halifax, VA 24558',
  county: 'Halifax',
  zipCode: '24558',
  lat: 36.765,
  lng: -78.928,
  precincts: [{
    id: 'HA01',
    name: 'Halifax Precinct 1',
    recentlyChanged: true
  }, {
    id: 'HA02',
    name: 'Halifax Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '79',
  name: 'Pittsylvania County Administration Building',
  address: '1 Center St, Chatham, VA 24531',
  county: 'Pittsylvania',
  zipCode: '24531',
  lat: 36.825,
  lng: -79.397,
  precincts: [{
    id: 'PI01',
    name: 'Pittsylvania Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PI02',
    name: 'Pittsylvania Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RPI01',
    name: 'Chatham Precinct'
  }]
}, {
  id: '80',
  name: 'Henry County Administration Building',
  address: '3300 Kings Mountain Rd, Martinsville, VA 24112',
  county: 'Henry',
  zipCode: '24112',
  lat: 36.691,
  lng: -79.872,
  precincts: [{
    id: 'HE01',
    name: 'Henry Precinct 1',
    recentlyChanged: false
  }, {
    id: 'HE02',
    name: 'Henry Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '81',
  name: 'Martinsville City Hall',
  address: '55 W Church St, Martinsville, VA 24112',
  county: 'Martinsville',
  zipCode: '24112',
  lat: 36.691,
  lng: -79.872,
  precincts: [{
    id: 'MA01',
    name: 'Martinsville Precinct 1',
    recentlyChanged: true
  }, {
    id: 'MA02',
    name: 'Martinsville Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RMA01',
    name: 'Martinsville Central Precinct'
  }]
}, {
  id: '82',
  name: 'Patrick County Administration Building',
  address: '106 Rucker St, Stuart, VA 24171',
  county: 'Patrick',
  zipCode: '24171',
  lat: 36.639,
  lng: -80.27,
  precincts: [{
    id: 'PA01',
    name: 'Patrick Precinct 1',
    recentlyChanged: false
  }, {
    id: 'PA02',
    name: 'Patrick Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '83',
  name: 'Floyd County Administration Building',
  address: '123 W Main St, Floyd, VA 24091',
  county: 'Floyd',
  zipCode: '24091',
  lat: 36.911,
  lng: -80.319,
  precincts: [{
    id: 'FL01',
    name: 'Floyd Precinct 1',
    recentlyChanged: false
  }, {
    id: 'FL02',
    name: 'Floyd Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RFL01',
    name: 'Floyd Northern Precinct'
  }]
}, {
  id: '84',
  name: 'Franklin County Government Center',
  address: '1255 Franklin St, Rocky Mount, VA 24151',
  county: 'Franklin County',
  zipCode: '24151',
  lat: 36.997,
  lng: -79.892,
  precincts: [{
    id: 'FC01',
    name: 'Franklin County Precinct 1',
    recentlyChanged: true
  }, {
    id: 'FC02',
    name: 'Franklin County Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '85',
  name: 'Bedford County Administration Building',
  address: '122 E Main St, Bedford, VA 24523',
  county: 'Bedford',
  zipCode: '24523',
  lat: 37.334,
  lng: -79.523,
  precincts: [{
    id: 'BE01',
    name: 'Bedford Precinct 1',
    recentlyChanged: false
  }, {
    id: 'BE02',
    name: 'Bedford Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RBE01',
    name: 'Bedford Town Precinct'
  }]
}, {
  id: '86',
  name: 'Campbell County Administration Building',
  address: '85 Carden Ln, Rustburg, VA 24588',
  county: 'Campbell',
  zipCode: '24588',
  lat: 37.273,
  lng: -79.1,
  precincts: [{
    id: 'CA01',
    name: 'Campbell Precinct 1',
    recentlyChanged: false
  }, {
    id: 'CA02',
    name: 'Campbell Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '87',
  name: 'Appomattox County Administration Building',
  address: '153A Morton Ln, Appomattox, VA 24522',
  county: 'Appomattox',
  zipCode: '24522',
  lat: 37.357,
  lng: -78.833,
  precincts: [{
    id: 'AP01',
    name: 'Appomattox Precinct 1',
    recentlyChanged: true
  }, {
    id: 'AP02',
    name: 'Appomattox Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RAP01',
    name: 'Appomattox Court House Precinct'
  }]
}, {
  id: '88',
  name: 'Amherst County Administration Building',
  address: '153 Washington St, Amherst, VA 24521',
  county: 'Amherst',
  zipCode: '24521',
  lat: 37.583,
  lng: -79.051,
  precincts: [{
    id: 'AM01',
    name: 'Amherst Precinct 1',
    recentlyChanged: false
  }, {
    id: 'AM02',
    name: 'Amherst Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '89',
  name: 'Nelson County Administration Building',
  address: '84 Courthouse Square, Lovingston, VA 22949',
  county: 'Nelson',
  zipCode: '22949',
  lat: 37.763,
  lng: -78.871,
  precincts: [{
    id: 'NE01',
    name: 'Nelson Precinct 1',
    recentlyChanged: false
  }, {
    id: 'NE02',
    name: 'Nelson Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RNE01',
    name: 'Nelson Southern Precinct'
  }]
}, {
  id: '90',
  name: 'Albemarle County Office Building',
  address: '401 McIntire Rd, Charlottesville, VA 22902',
  county: 'Albemarle',
  zipCode: '22902',
  lat: 38.036,
  lng: -78.477,
  precincts: [{
    id: 'AL01',
    name: 'Albemarle Precinct 1',
    recentlyChanged: true
  }, {
    id: 'AL02',
    name: 'Albemarle Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '91',
  name: 'Fluvanna County Administration Building',
  address: '132 Main St, Palmyra, VA 22963',
  county: 'Fluvanna',
  zipCode: '22963',
  lat: 37.906,
  lng: -78.266,
  precincts: [{
    id: 'FL01',
    name: 'Fluvanna Precinct 1',
    recentlyChanged: false
  }, {
    id: 'FL02',
    name: 'Fluvanna Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RFL02',
    name: 'Lake Monticello Precinct'
  }]
}, {
  id: '92',
  name: 'Louisa County Administration Building',
  address: '1 Woolfolk Ave, Louisa, VA 23093',
  county: 'Louisa',
  zipCode: '23093',
  lat: 38.025,
  lng: -78.003,
  precincts: [{
    id: 'LO01',
    name: 'Louisa Precinct 1',
    recentlyChanged: false
  }, {
    id: 'LO02',
    name: 'Louisa Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '93',
  name: 'Orange County Administration Building',
  address: '112 W Main St, Orange, VA 22960',
  county: 'Orange',
  zipCode: '22960',
  lat: 38.246,
  lng: -78.111,
  precincts: [{
    id: 'OR01',
    name: 'Orange Precinct 1',
    recentlyChanged: true
  }, {
    id: 'OR02',
    name: 'Orange Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'ROR01',
    name: 'Orange Town Precinct'
  }]
}, {
  id: '94',
  name: 'Madison County Administration Building',
  address: '302 Thrift Rd, Madison, VA 22727',
  county: 'Madison',
  zipCode: '22727',
  lat: 38.381,
  lng: -78.258,
  precincts: [{
    id: 'MA01',
    name: 'Madison Precinct 1',
    recentlyChanged: false
  }, {
    id: 'MA02',
    name: 'Madison Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '95',
  name: 'Greene County Administration Building',
  address: '40 Celt Rd, Stanardsville, VA 22973',
  county: 'Greene',
  zipCode: '22973',
  lat: 38.297,
  lng: -78.44,
  precincts: [{
    id: 'GE01',
    name: 'Greene Precinct 1',
    recentlyChanged: false
  }, {
    id: 'GE02',
    name: 'Greene Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RGE01',
    name: 'Stanardsville Precinct'
  }]
}, {
  id: '96',
  name: 'Culpeper County Administration Building',
  address: '302 N Main St, Culpeper, VA 22701',
  county: 'Culpeper',
  zipCode: '22701',
  lat: 38.473,
  lng: -77.996,
  precincts: [{
    id: 'CU01',
    name: 'Culpeper Precinct 1',
    recentlyChanged: true
  }, {
    id: 'CU02',
    name: 'Culpeper Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '97',
  name: 'Rappahannock County Administration Building',
  address: '290 Gay St, Washington, VA 22747',
  county: 'Rappahannock',
  zipCode: '22747',
  lat: 38.713,
  lng: -78.159,
  precincts: [{
    id: 'RA01',
    name: 'Rappahannock Precinct 1',
    recentlyChanged: false
  }, {
    id: 'RA02',
    name: 'Rappahannock Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RRA01',
    name: 'Sperryville Precinct'
  }]
}, {
  id: '98',
  name: 'Fauquier County Administration Building',
  address: '29 Ashby St, Warrenton, VA 20186',
  county: 'Fauquier',
  zipCode: '20186',
  lat: 38.713,
  lng: -77.795,
  precincts: [{
    id: 'FA01',
    name: 'Fauquier Precinct 1',
    recentlyChanged: false
  }, {
    id: 'FA02',
    name: 'Fauquier Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}, {
  id: '99',
  name: 'Warren County Administration Building',
  address: '220 N Commerce Ave, Front Royal, VA 22630',
  county: 'Warren',
  zipCode: '22630',
  lat: 38.918,
  lng: -78.195,
  precincts: [{
    id: 'WA01',
    name: 'Warren Precinct 1',
    recentlyChanged: true
  }, {
    id: 'WA02',
    name: 'Warren Precinct 2',
    recentlyChanged: false
  }],
  hasRemovedPrecinct: true,
  removedPrecincts: [{
    id: 'RWA01',
    name: 'Front Royal Precinct'
  }]
}, {
  id: '100',
  name: 'Shenandoah County Government Center',
  address: '600 N Main St, Woodstock, VA 22664',
  county: 'Shenandoah',
  zipCode: '22664',
  lat: 38.882,
  lng: -78.507,
  precincts: [{
    id: 'SH01',
    name: 'Shenandoah Precinct 1',
    recentlyChanged: false
  }, {
    id: 'SH02',
    name: 'Shenandoah Precinct 2',
    recentlyChanged: true
  }],
  hasRemovedPrecinct: false,
  removedPrecincts: []
}];
// Incident data for polling places
export const extendedIncidentData = [{
  id: 1,
  name: 'Fairfax High School',
  address: '3501 Lion Run, Fairfax, VA 22030',
  county: 'Fairfax',
  precinct: 'Precinct 1',
  incidents: 12,
  status: 'issue',
  lat: 38.846,
  lng: -77.306,
  incidentTypes: ['Long Line', 'Equipment Issues']
}, {
  id: 2,
  name: 'Arlington Community Center',
  address: '5115 Arlington Blvd, Arlington, VA 22204',
  county: 'Arlington',
  precinct: 'Precinct 2',
  incidents: 3,
  status: 'ok',
  lat: 38.88,
  lng: -77.106,
  incidentTypes: ['Voter ID Related']
}, {
  id: 3,
  name: 'Alexandria City Hall',
  address: '301 King St, Alexandria, VA 22314',
  county: 'Alexandria',
  precinct: 'Precinct 1',
  incidents: 7,
  status: 'issue',
  lat: 38.804,
  lng: -77.047,
  incidentTypes: ['Intimidation', 'Aggressive Electioneering']
}, {
  id: 4,
  name: 'Loudoun County High School',
  address: '415 Dry Mill Rd SW, Leesburg, VA 20175',
  county: 'Loudoun',
  precinct: 'Precinct 1',
  incidents: 1,
  status: 'ok',
  lat: 39.116,
  lng: -77.564,
  incidentTypes: ['Equipment Issues']
}, {
  id: 5,
  name: 'Prince William Library',
  address: '9750 Liberia Ave, Manassas, VA 20110',
  county: 'Prince William',
  precinct: 'Precinct 2',
  incidents: 5,
  status: 'ok',
  lat: 38.751,
  lng: -77.475,
  incidentTypes: ['Not Enough Poll Workers']
}, {
  id: 6,
  name: 'Henrico Recreation Center',
  address: '8301 Hungary Spring Rd, Henrico, VA 23228',
  county: 'Henrico',
  precinct: 'Precinct 3',
  incidents: 0,
  status: 'ok',
  lat: 37.54,
  lng: -77.469,
  incidentTypes: []
}, {
  id: 7,
  name: 'Chesterfield Elementary School',
  address: '9601 Krause Rd, Chesterfield, VA 23832',
  county: 'Chesterfield',
  precinct: 'Precinct 1',
  incidents: 8,
  status: 'issue',
  lat: 37.376,
  lng: -77.578,
  incidentTypes: ['Not Accessible', 'Long Line']
}, {
  id: 8,
  name: 'Richmond Convention Center',
  address: '403 N 3rd St, Richmond, VA 23219',
  county: 'Richmond City',
  precinct: 'Precinct 2',
  incidents: 15,
  status: 'issue',
  lat: 37.541,
  lng: -77.436,
  incidentTypes: ['Long Line', 'Equipment Issues', 'Voter ID Related']
}, {
  id: 9,
  name: 'Virginia Beach Civic Center',
  address: '2100 Parks Ave, Virginia Beach, VA 23451',
  county: 'Virginia Beach',
  precinct: 'Precinct 3',
  incidents: 2,
  status: 'ok',
  lat: 36.852,
  lng: -75.977,
  incidentTypes: ['Registration']
}, {
  id: 10,
  name: 'Norfolk State University',
  address: '700 Park Ave, Norfolk, VA 23504',
  county: 'Norfolk',
  precinct: 'Precinct 1',
  incidents: 4,
  status: 'ok',
  lat: 36.849,
  lng: -76.261,
  incidentTypes: ['Intimidation']
}, {
  id: 11,
  name: 'Chesapeake Central Library',
  address: '298 Cedar Rd, Chesapeake, VA 23322',
  county: 'Chesapeake',
  precinct: 'Precinct 1',
  incidents: 6,
  status: 'issue',
  lat: 36.721,
  lng: -76.241,
  incidentTypes: ['Long Line', 'Equipment Issues']
}, {
  id: 12,
  name: 'Newport News High School',
  address: '4200 Marshall Ave, Newport News, VA 23607',
  county: 'Newport News',
  precinct: 'Precinct 1',
  incidents: 3,
  status: 'ok',
  lat: 36.981,
  lng: -76.428,
  incidentTypes: ['Registration']
}, {
  id: 13,
  name: 'Hampton University',
  address: '100 E Queen St, Hampton, VA 23668',
  county: 'Hampton',
  precinct: 'Precinct 1',
  incidents: 2,
  status: 'ok',
  lat: 37.021,
  lng: -76.335,
  incidentTypes: ['Voter ID Related']
}, {
  id: 14,
  name: 'Suffolk Community Center',
  address: '110 N 8th St, Suffolk, VA 23434',
  county: 'Suffolk',
  precinct: 'Precinct 1',
  incidents: 9,
  status: 'issue',
  lat: 36.731,
  lng: -76.583,
  incidentTypes: ['Not Enough Poll Workers', 'Long Line']
}, {
  id: 15,
  name: 'Portsmouth City Hall',
  address: '801 Crawford St, Portsmouth, VA 23704',
  county: 'Portsmouth',
  precinct: 'Precinct 1',
  incidents: 5,
  status: 'ok',
  lat: 36.835,
  lng: -76.298,
  incidentTypes: ['Equipment Issues']
}, {
  id: 16,
  name: 'Roanoke City Library',
  address: '706 S Jefferson St, Roanoke, VA 24016',
  county: 'Roanoke City',
  precinct: 'Precinct 1',
  incidents: 11,
  status: 'issue',
  lat: 37.271,
  lng: -79.942,
  incidentTypes: ['Intimidation', 'Aggressive Electioneering', 'Long Line']
}, {
  id: 17,
  name: 'Lynchburg College',
  address: '1501 Lakeside Dr, Lynchburg, VA 24501',
  county: 'Lynchburg',
  precinct: 'Precinct 1',
  incidents: 7,
  status: 'issue',
  lat: 37.404,
  lng: -79.182,
  incidentTypes: ['Voter ID Related', 'Registration']
}, {
  id: 18,
  name: 'Danville Community College',
  address: '1008 S Main St, Danville, VA 24541',
  county: 'Danville',
  precinct: 'Precinct 1',
  incidents: 2,
  status: 'ok',
  lat: 36.585,
  lng: -79.395,
  incidentTypes: ['Equipment Issues']
}, {
  id: 19,
  name: 'Fredericksburg Convention Center',
  address: '2371 Carl D. Silver Pkwy, Fredericksburg, VA 22401',
  county: 'Fredericksburg',
  precinct: 'Precinct 1',
  incidents: 6,
  status: 'issue',
  lat: 38.299,
  lng: -77.485,
  incidentTypes: ['Not Accessible', 'Equipment Issues']
}, {
  id: 20,
  name: 'Charlottesville High School',
  address: '1400 Melbourne Rd, Charlottesville, VA 22901',
  county: 'Charlottesville',
  precinct: 'Precinct 1',
  incidents: 4,
  status: 'ok',
  lat: 38.046,
  lng: -78.499,
  incidentTypes: ['Registration']
}, {
  id: 21,
  name: 'Staunton City Hall',
  address: '116 W Beverley St, Staunton, VA 24401',
  county: 'Staunton',
  precinct: 'Precinct 1',
  incidents: 0,
  status: 'ok',
  lat: 38.149,
  lng: -79.072,
  incidentTypes: []
}, {
  id: 22,
  name: 'Harrisonburg Community Center',
  address: '305 S Dogwood Dr, Harrisonburg, VA 22801',
  county: 'Harrisonburg',
  precinct: 'Precinct 1',
  incidents: 3,
  status: 'ok',
  lat: 38.439,
  lng: -78.869,
  incidentTypes: ['Voter ID Related']
}, {
  id: 23,
  name: 'Winchester Public Library',
  address: '175 N Washington St, Winchester, VA 22601',
  county: 'Winchester',
  precinct: 'Precinct 1',
  incidents: 8,
  status: 'issue',
  lat: 39.186,
  lng: -78.166,
  incidentTypes: ['Long Line', 'Not Enough Poll Workers']
}, {
  id: 24,
  name: 'Blacksburg Municipal Building',
  address: '300 S Main St, Blacksburg, VA 24060',
  county: 'Montgomery',
  precinct: 'Precinct 1',
  incidents: 5,
  status: 'ok',
  lat: 37.229,
  lng: -80.414,
  incidentTypes: ['Equipment Issues']
}, {
  id: 25,
  name: 'Christiansburg Recreation Center',
  address: '1600 N Franklin St, Christiansburg, VA 24073',
  county: 'Montgomery',
  precinct: 'Precinct 3',
  incidents: 1,
  status: 'ok',
  lat: 37.141,
  lng: -80.408,
  incidentTypes: ['Registration']
}, {
  id: 26,
  name: 'Fairfax County Government Center',
  address: '12000 Government Center Pkwy, Fairfax, VA 22035',
  county: 'Fairfax',
  precinct: 'Precinct 4',
  incidents: 10,
  status: 'issue',
  lat: 38.853,
  lng: -77.356,
  incidentTypes: ['Long Line', 'Equipment Issues', 'Not Enough Poll Workers']
}, {
  id: 27,
  name: 'Vienna Community Center',
  address: '120 Cherry St SE, Vienna, VA 22180',
  county: 'Fairfax',
  precinct: 'Precinct 6',
  incidents: 2,
  status: 'ok',
  lat: 38.901,
  lng: -77.265,
  incidentTypes: ['Voter ID Related']
}, {
  id: 28,
  name: 'Reston Community Center',
  address: '2310 Colts Neck Rd, Reston, VA 20191',
  county: 'Fairfax',
  precinct: 'Precinct 8',
  incidents: 0,
  status: 'ok',
  lat: 38.958,
  lng: -77.356,
  incidentTypes: []
}, {
  id: 29,
  name: 'Falls Church Community Center',
  address: '223 Little Falls St, Falls Church, VA 22046',
  county: 'Falls Church',
  precinct: 'Precinct 1',
  incidents: 3,
  status: 'ok',
  lat: 38.882,
  lng: -77.174,
  incidentTypes: ['Registration']
}, {
  id: 30,
  name: 'Manassas City Hall',
  address: '9027 Center St, Manassas, VA 20110',
  county: 'Manassas',
  precinct: 'Precinct 1',
  incidents: 7,
  status: 'issue',
  lat: 38.751,
  lng: -77.475,
  incidentTypes: ['Long Line', 'Not Enough Poll Workers']
}];