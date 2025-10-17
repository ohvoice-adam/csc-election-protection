import React, { useEffect, useState, useRef, createElement } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
// Control component to handle map view changes
const MapViewControl = ({
  bounds,
  center,
  zoom
}) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(center, zoom);
    }
  }, [map, bounds, center, zoom]);
  return null;
};
// Helper function to calculate centroid of polygon
const calculateCentroid = (coordinates: number[][][]): [number, number] => {
  // For simple polygons, we can just average the points
  // For more complex shapes, a more sophisticated algorithm would be needed
  const points = coordinates[0]; // Use the first (outer) ring
  let sumLat = 0;
  let sumLng = 0;
  points.forEach(point => {
    sumLng += point[0];
    sumLat += point[1];
  });
  return [sumLat / points.length, sumLng / points.length];
};
// Virginia's approximate bounding box
const virginiaBounds = {
  north: 39.5,
  south: 36.5,
  east: -75.2,
  west: -83.7
};
// Check if a point is within Virginia's boundaries
const isPointInVirginia = (lat: number, lng: number): boolean => {
  return lat >= virginiaBounds.south && lat <= virginiaBounds.north && lng >= virginiaBounds.west && lng <= virginiaBounds.east;
};
// Convert GeoJSON features to bubble data
const convertToBubbleData = (precincts: any) => {
  if (!precincts || !precincts.features) return [];
  return precincts.features.map(feature => {
    const centroid = calculateCentroid(feature.geometry.coordinates);
    return {
      id: feature.properties.id,
      name: feature.properties.name,
      county: feature.properties.county,
      municipality: feature.properties.municipality,
      avgScore: feature.properties.avgScore,
      totalVoters: feature.properties.totalVoters,
      atRiskVoters: feature.properties.atRiskVoters,
      bipocPct: feature.properties.bipocPct,
      demographics: feature.properties.demographics || {
        white: 0,
        black: 0,
        hispanic: 0,
        asian: 0,
        other: 0,
        male: 0,
        female: 0
      },
      center: centroid
    };
  })
  // Filter out points outside of Virginia
  .filter(point => isPointInVirginia(point.center[0], point.center[1]));
};
// Sample precinct data from StatewideCensusHeatMap component
export const virginiaPrecinctData = [{
  id: 'P001',
  name: 'Arlington Central Precinct',
  county: 'Arlington',
  municipality: 'Arlington',
  coordinates: [38.87, -77.1],
  avgScore: 0.92,
  affectedPopulation: 1245,
  atRiskVoters: 84,
  demographics: {
    white: {
      population: 809,
      avgScore: 0.94,
      atRiskVoters: 32
    },
    black: {
      population: 249,
      avgScore: 0.88,
      atRiskVoters: 22
    },
    hispanic: {
      population: 124,
      avgScore: 0.85,
      atRiskVoters: 15
    },
    asian: {
      population: 62,
      avgScore: 0.91,
      atRiskVoters: 5
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 598,
      avgScore: 0.91,
      atRiskVoters: 38
    },
    female: {
      population: 647,
      avgScore: 0.93,
      atRiskVoters: 46
    }
  }
}, {
  id: 'P002',
  name: 'Arlington Heights Precinct',
  county: 'Arlington',
  municipality: 'Arlington',
  coordinates: [38.9, -77.12],
  avgScore: 0.88,
  affectedPopulation: 980,
  atRiskVoters: 103,
  demographics: {
    white: {
      population: 637,
      avgScore: 0.91,
      atRiskVoters: 38
    },
    black: {
      population: 196,
      avgScore: 0.82,
      atRiskVoters: 29
    },
    hispanic: {
      population: 98,
      avgScore: 0.79,
      atRiskVoters: 21
    },
    asian: {
      population: 49,
      avgScore: 0.87,
      atRiskVoters: 15
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 470,
      avgScore: 0.87,
      atRiskVoters: 48
    },
    female: {
      population: 510,
      avgScore: 0.89,
      atRiskVoters: 55
    }
  }
}, {
  id: 'P003',
  name: 'Fairfax Central Precinct',
  county: 'Fairfax',
  municipality: 'Fairfax City',
  coordinates: [38.85, -77.3],
  avgScore: 0.81,
  affectedPopulation: 1520,
  atRiskVoters: 237,
  demographics: {
    white: {
      population: 988,
      avgScore: 0.85,
      atRiskVoters: 98
    },
    black: {
      population: 304,
      avgScore: 0.74,
      atRiskVoters: 69
    },
    hispanic: {
      population: 152,
      avgScore: 0.71,
      atRiskVoters: 41
    },
    asian: {
      population: 76,
      avgScore: 0.79,
      atRiskVoters: 29
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 730,
      avgScore: 0.8,
      atRiskVoters: 113
    },
    female: {
      population: 790,
      avgScore: 0.82,
      atRiskVoters: 124
    }
  }
}, {
  id: 'P004',
  name: 'Fairfax North Precinct',
  county: 'Fairfax',
  municipality: 'Fairfax City',
  coordinates: [38.89, -77.28],
  avgScore: 0.79,
  affectedPopulation: 1350,
  atRiskVoters: 256,
  demographics: {
    white: {
      population: 878,
      avgScore: 0.83,
      atRiskVoters: 105
    },
    black: {
      population: 270,
      avgScore: 0.72,
      atRiskVoters: 71
    },
    hispanic: {
      population: 135,
      avgScore: 0.69,
      atRiskVoters: 46
    },
    asian: {
      population: 68,
      avgScore: 0.77,
      atRiskVoters: 34
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 648,
      avgScore: 0.78,
      atRiskVoters: 122
    },
    female: {
      population: 702,
      avgScore: 0.8,
      atRiskVoters: 134
    }
  }
}, {
  id: 'P005',
  name: 'Alexandria Old Town Precinct',
  county: 'Alexandria',
  municipality: 'Alexandria',
  coordinates: [38.81, -77.04],
  avgScore: 0.85,
  affectedPopulation: 1150,
  atRiskVoters: 172,
  demographics: {
    white: {
      population: 748,
      avgScore: 0.89,
      atRiskVoters: 67
    },
    black: {
      population: 230,
      avgScore: 0.78,
      atRiskVoters: 52
    },
    hispanic: {
      population: 115,
      avgScore: 0.75,
      atRiskVoters: 31
    },
    asian: {
      population: 58,
      avgScore: 0.83,
      atRiskVoters: 22
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 552,
      avgScore: 0.84,
      atRiskVoters: 81
    },
    female: {
      population: 598,
      avgScore: 0.86,
      atRiskVoters: 91
    }
  }
}, {
  id: 'P006',
  name: 'Alexandria West Precinct',
  county: 'Alexandria',
  municipality: 'Alexandria',
  coordinates: [38.82, -77.08],
  avgScore: 0.77,
  affectedPopulation: 1050,
  atRiskVoters: 210,
  demographics: {
    white: {
      population: 683,
      avgScore: 0.82,
      atRiskVoters: 87
    },
    black: {
      population: 210,
      avgScore: 0.7,
      atRiskVoters: 60
    },
    hispanic: {
      population: 105,
      avgScore: 0.65,
      atRiskVoters: 38
    },
    asian: {
      population: 53,
      avgScore: 0.73,
      atRiskVoters: 25
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 504,
      avgScore: 0.76,
      atRiskVoters: 100
    },
    female: {
      population: 546,
      avgScore: 0.78,
      atRiskVoters: 110
    }
  }
}, {
  id: 'P007',
  name: 'Loudoun East Precinct',
  county: 'Loudoun',
  municipality: 'Leesburg',
  coordinates: [39.03, -77.54],
  avgScore: 0.83,
  affectedPopulation: 1680,
  atRiskVoters: 252,
  demographics: {
    white: {
      population: 1092,
      avgScore: 0.87,
      atRiskVoters: 105
    },
    black: {
      population: 336,
      avgScore: 0.76,
      atRiskVoters: 74
    },
    hispanic: {
      population: 168,
      avgScore: 0.73,
      atRiskVoters: 43
    },
    asian: {
      population: 84,
      avgScore: 0.81,
      atRiskVoters: 30
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 806,
      avgScore: 0.82,
      atRiskVoters: 121
    },
    female: {
      population: 874,
      avgScore: 0.84,
      atRiskVoters: 131
    }
  }
}, {
  id: 'P008',
  name: 'Loudoun West Precinct',
  county: 'Loudoun',
  municipality: 'Leesburg',
  coordinates: [39.02, -77.6],
  avgScore: 0.8,
  affectedPopulation: 1420,
  atRiskVoters: 227,
  demographics: {
    white: {
      population: 923,
      avgScore: 0.84,
      atRiskVoters: 96
    },
    black: {
      population: 284,
      avgScore: 0.73,
      atRiskVoters: 65
    },
    hispanic: {
      population: 142,
      avgScore: 0.7,
      atRiskVoters: 40
    },
    asian: {
      population: 71,
      avgScore: 0.78,
      atRiskVoters: 26
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 682,
      avgScore: 0.79,
      atRiskVoters: 109
    },
    female: {
      population: 738,
      avgScore: 0.81,
      atRiskVoters: 118
    }
  }
}, {
  id: 'P009',
  name: 'Richmond Downtown Precinct',
  county: 'Richmond City',
  municipality: 'Richmond',
  coordinates: [37.54, -77.43],
  avgScore: 0.65,
  affectedPopulation: 1870,
  atRiskVoters: 561,
  demographics: {
    white: {
      population: 842,
      avgScore: 0.74,
      atRiskVoters: 168
    },
    black: {
      population: 748,
      avgScore: 0.58,
      atRiskVoters: 261
    },
    hispanic: {
      population: 187,
      avgScore: 0.54,
      atRiskVoters: 78
    },
    asian: {
      population: 94,
      avgScore: 0.67,
      atRiskVoters: 54
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 898,
      avgScore: 0.64,
      atRiskVoters: 269
    },
    female: {
      population: 972,
      avgScore: 0.66,
      atRiskVoters: 292
    }
  }
}, {
  id: 'P010',
  name: 'Richmond East Precinct',
  county: 'Richmond City',
  municipality: 'Richmond',
  coordinates: [37.53, -77.38],
  avgScore: 0.62,
  affectedPopulation: 1650,
  atRiskVoters: 577,
  demographics: {
    white: {
      population: 743,
      avgScore: 0.7,
      atRiskVoters: 172
    },
    black: {
      population: 660,
      avgScore: 0.55,
      atRiskVoters: 264
    },
    hispanic: {
      population: 165,
      avgScore: 0.51,
      atRiskVoters: 80
    },
    asian: {
      population: 83,
      avgScore: 0.63,
      atRiskVoters: 61
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 792,
      avgScore: 0.61,
      atRiskVoters: 277
    },
    female: {
      population: 858,
      avgScore: 0.63,
      atRiskVoters: 300
    }
  }
}, {
  id: 'P011',
  name: 'Norfolk Central Precinct',
  county: 'Norfolk',
  municipality: 'Norfolk',
  coordinates: [36.86, -76.28],
  avgScore: 0.55,
  affectedPopulation: 2100,
  atRiskVoters: 840,
  demographics: {
    white: {
      population: 945,
      avgScore: 0.65,
      atRiskVoters: 283
    },
    black: {
      population: 840,
      avgScore: 0.48,
      atRiskVoters: 370
    },
    hispanic: {
      population: 210,
      avgScore: 0.43,
      atRiskVoters: 126
    },
    asian: {
      population: 105,
      avgScore: 0.57,
      atRiskVoters: 61
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 1008,
      avgScore: 0.54,
      atRiskVoters: 403
    },
    female: {
      population: 1092,
      avgScore: 0.56,
      atRiskVoters: 437
    }
  }
}, {
  id: 'P012',
  name: 'Norfolk East Precinct',
  county: 'Norfolk',
  municipality: 'Norfolk',
  coordinates: [36.85, -76.23],
  avgScore: 0.52,
  affectedPopulation: 1920,
  atRiskVoters: 844,
  demographics: {
    white: {
      population: 864,
      avgScore: 0.62,
      atRiskVoters: 278
    },
    black: {
      population: 768,
      avgScore: 0.45,
      atRiskVoters: 368
    },
    hispanic: {
      population: 192,
      avgScore: 0.4,
      atRiskVoters: 134
    },
    asian: {
      population: 96,
      avgScore: 0.54,
      atRiskVoters: 64
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 922,
      avgScore: 0.51,
      atRiskVoters: 405
    },
    female: {
      population: 998,
      avgScore: 0.53,
      atRiskVoters: 439
    }
  }
}, {
  id: 'P013',
  name: 'Henrico North Precinct',
  county: 'Henrico',
  municipality: 'Henrico',
  coordinates: [37.63, -77.46],
  avgScore: 0.76,
  affectedPopulation: 1430,
  atRiskVoters: 300,
  demographics: {
    white: {
      population: 930,
      avgScore: 0.82,
      atRiskVoters: 130
    },
    black: {
      population: 286,
      avgScore: 0.68,
      atRiskVoters: 85
    },
    hispanic: {
      population: 143,
      avgScore: 0.65,
      atRiskVoters: 50
    },
    asian: {
      population: 72,
      avgScore: 0.73,
      atRiskVoters: 35
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 686,
      avgScore: 0.75,
      atRiskVoters: 144
    },
    female: {
      population: 744,
      avgScore: 0.77,
      atRiskVoters: 156
    }
  }
}, {
  id: 'P014',
  name: 'Henrico East Precinct',
  county: 'Henrico',
  municipality: 'Henrico',
  coordinates: [37.57, -77.4],
  avgScore: 0.72,
  affectedPopulation: 1280,
  atRiskVoters: 320,
  demographics: {
    white: {
      population: 832,
      avgScore: 0.78,
      atRiskVoters: 142
    },
    black: {
      population: 256,
      avgScore: 0.64,
      atRiskVoters: 92
    },
    hispanic: {
      population: 128,
      avgScore: 0.61,
      atRiskVoters: 53
    },
    asian: {
      population: 64,
      avgScore: 0.69,
      atRiskVoters: 33
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 614,
      avgScore: 0.71,
      atRiskVoters: 154
    },
    female: {
      population: 666,
      avgScore: 0.73,
      atRiskVoters: 166
    }
  }
}, {
  id: 'P015',
  name: 'Virginia Beach North Precinct',
  county: 'Virginia Beach',
  municipality: 'Virginia Beach',
  coordinates: [36.86, -76.03],
  avgScore: 0.82,
  affectedPopulation: 1780,
  atRiskVoters: 285,
  demographics: {
    white: {
      population: 1157,
      avgScore: 0.86,
      atRiskVoters: 127
    },
    black: {
      population: 356,
      avgScore: 0.75,
      atRiskVoters: 82
    },
    hispanic: {
      population: 178,
      avgScore: 0.72,
      atRiskVoters: 47
    },
    asian: {
      population: 89,
      avgScore: 0.8,
      atRiskVoters: 29
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 854,
      avgScore: 0.81,
      atRiskVoters: 137
    },
    female: {
      population: 926,
      avgScore: 0.83,
      atRiskVoters: 148
    }
  }
}, {
  id: 'P016',
  name: 'Virginia Beach Oceanfront Precinct',
  county: 'Virginia Beach',
  municipality: 'Virginia Beach',
  coordinates: [36.85, -75.96],
  avgScore: 0.79,
  affectedPopulation: 1650,
  atRiskVoters: 297,
  demographics: {
    white: {
      population: 1073,
      avgScore: 0.83,
      atRiskVoters: 135
    },
    black: {
      population: 330,
      avgScore: 0.72,
      atRiskVoters: 86
    },
    hispanic: {
      population: 165,
      avgScore: 0.69,
      atRiskVoters: 47
    },
    asian: {
      population: 83,
      avgScore: 0.77,
      atRiskVoters: 29
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 792,
      avgScore: 0.78,
      atRiskVoters: 142
    },
    female: {
      population: 858,
      avgScore: 0.8,
      atRiskVoters: 155
    }
  }
}, {
  id: 'P017',
  name: 'Chesterfield Central Precinct',
  county: 'Chesterfield',
  municipality: 'Chesterfield',
  coordinates: [37.39, -77.5],
  avgScore: 0.74,
  affectedPopulation: 1520,
  atRiskVoters: 350,
  demographics: {
    white: {
      population: 988,
      avgScore: 0.8,
      atRiskVoters: 158
    },
    black: {
      population: 304,
      avgScore: 0.66,
      atRiskVoters: 97
    },
    hispanic: {
      population: 152,
      avgScore: 0.63,
      atRiskVoters: 58
    },
    asian: {
      population: 76,
      avgScore: 0.71,
      atRiskVoters: 37
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 730,
      avgScore: 0.73,
      atRiskVoters: 168
    },
    female: {
      population: 790,
      avgScore: 0.75,
      atRiskVoters: 182
    }
  }
}, {
  id: 'P018',
  name: 'Chesterfield South Precinct',
  county: 'Chesterfield',
  municipality: 'Chesterfield',
  coordinates: [37.33, -77.48],
  avgScore: 0.71,
  affectedPopulation: 1380,
  atRiskVoters: 345,
  demographics: {
    white: {
      population: 897,
      avgScore: 0.77,
      atRiskVoters: 153
    },
    black: {
      population: 276,
      avgScore: 0.63,
      atRiskVoters: 96
    },
    hispanic: {
      population: 138,
      avgScore: 0.6,
      atRiskVoters: 58
    },
    asian: {
      population: 69,
      avgScore: 0.68,
      atRiskVoters: 38
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 662,
      avgScore: 0.7,
      atRiskVoters: 166
    },
    female: {
      population: 718,
      avgScore: 0.72,
      atRiskVoters: 179
    }
  }
}, {
  id: 'P019',
  name: 'Roanoke Central Precinct',
  county: 'Roanoke',
  municipality: 'Roanoke',
  coordinates: [37.27, -79.94],
  avgScore: 0.68,
  affectedPopulation: 1620,
  atRiskVoters: 470,
  demographics: {
    white: {
      population: 1053,
      avgScore: 0.74,
      atRiskVoters: 210
    },
    black: {
      population: 324,
      avgScore: 0.6,
      atRiskVoters: 121
    },
    hispanic: {
      population: 162,
      avgScore: 0.57,
      atRiskVoters: 72
    },
    asian: {
      population: 81,
      avgScore: 0.65,
      atRiskVoters: 67
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 778,
      avgScore: 0.67,
      atRiskVoters: 225
    },
    female: {
      population: 842,
      avgScore: 0.69,
      atRiskVoters: 245
    }
  }
}, {
  id: 'P020',
  name: 'Roanoke North Precinct',
  county: 'Roanoke',
  municipality: 'Roanoke',
  coordinates: [37.31, -79.93],
  avgScore: 0.65,
  affectedPopulation: 1480,
  atRiskVoters: 444,
  demographics: {
    white: {
      population: 962,
      avgScore: 0.71,
      atRiskVoters: 202
    },
    black: {
      population: 296,
      avgScore: 0.57,
      atRiskVoters: 118
    },
    hispanic: {
      population: 148,
      avgScore: 0.54,
      atRiskVoters: 68
    },
    asian: {
      population: 74,
      avgScore: 0.62,
      atRiskVoters: 56
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 710,
      avgScore: 0.64,
      atRiskVoters: 213
    },
    female: {
      population: 770,
      avgScore: 0.66,
      atRiskVoters: 231
    }
  }
}, {
  id: 'P021',
  name: 'Charlottesville Downtown Precinct',
  county: 'Charlottesville',
  municipality: 'Charlottesville',
  coordinates: [38.03, -78.48],
  avgScore: 0.78,
  affectedPopulation: 1320,
  atRiskVoters: 264,
  demographics: {
    white: {
      population: 858,
      avgScore: 0.84,
      atRiskVoters: 116
    },
    black: {
      population: 264,
      avgScore: 0.7,
      atRiskVoters: 74
    },
    hispanic: {
      population: 132,
      avgScore: 0.67,
      atRiskVoters: 44
    },
    asian: {
      population: 66,
      avgScore: 0.75,
      atRiskVoters: 30
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 634,
      avgScore: 0.77,
      atRiskVoters: 127
    },
    female: {
      population: 686,
      avgScore: 0.79,
      atRiskVoters: 137
    }
  }
}, {
  id: 'P022',
  name: 'Charlottesville University Precinct',
  county: 'Charlottesville',
  municipality: 'Charlottesville',
  coordinates: [38.04, -78.5],
  avgScore: 0.82,
  affectedPopulation: 1570,
  atRiskVoters: 251,
  demographics: {
    white: {
      population: 1021,
      avgScore: 0.86,
      atRiskVoters: 112
    },
    black: {
      population: 314,
      avgScore: 0.75,
      atRiskVoters: 71
    },
    hispanic: {
      population: 157,
      avgScore: 0.72,
      atRiskVoters: 42
    },
    asian: {
      population: 79,
      avgScore: 0.8,
      atRiskVoters: 26
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 754,
      avgScore: 0.81,
      atRiskVoters: 120
    },
    female: {
      population: 816,
      avgScore: 0.83,
      atRiskVoters: 131
    }
  }
}, {
  id: 'P023',
  name: 'Lynchburg Central Precinct',
  county: 'Lynchburg',
  municipality: 'Lynchburg',
  coordinates: [37.41, -79.14],
  avgScore: 0.7,
  affectedPopulation: 1450,
  atRiskVoters: 406,
  demographics: {
    white: {
      population: 943,
      avgScore: 0.76,
      atRiskVoters: 188
    },
    black: {
      population: 290,
      avgScore: 0.62,
      atRiskVoters: 110
    },
    hispanic: {
      population: 145,
      avgScore: 0.59,
      atRiskVoters: 63
    },
    asian: {
      population: 73,
      avgScore: 0.67,
      atRiskVoters: 45
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 696,
      avgScore: 0.69,
      atRiskVoters: 195
    },
    female: {
      population: 754,
      avgScore: 0.71,
      atRiskVoters: 211
    }
  }
}, {
  id: 'P024',
  name: 'Hampton Central Precinct',
  county: 'Hampton',
  municipality: 'Hampton',
  coordinates: [37.03, -76.35],
  avgScore: 0.63,
  affectedPopulation: 1580,
  atRiskVoters: 521,
  demographics: {
    white: {
      population: 711,
      avgScore: 0.71,
      atRiskVoters: 171
    },
    black: {
      population: 632,
      avgScore: 0.56,
      atRiskVoters: 234
    },
    hispanic: {
      population: 158,
      avgScore: 0.52,
      atRiskVoters: 73
    },
    asian: {
      population: 79,
      avgScore: 0.64,
      atRiskVoters: 43
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 758,
      avgScore: 0.62,
      atRiskVoters: 250
    },
    female: {
      population: 822,
      avgScore: 0.64,
      atRiskVoters: 271
    }
  }
}, {
  id: 'P025',
  name: 'Newport News Central Precinct',
  county: 'Newport News',
  municipality: 'Newport News',
  coordinates: [37.08, -76.48],
  avgScore: 0.61,
  affectedPopulation: 1720,
  atRiskVoters: 602,
  demographics: {
    white: {
      population: 774,
      avgScore: 0.69,
      atRiskVoters: 201
    },
    black: {
      population: 688,
      avgScore: 0.54,
      atRiskVoters: 275
    },
    hispanic: {
      population: 172,
      avgScore: 0.5,
      atRiskVoters: 82
    },
    asian: {
      population: 86,
      avgScore: 0.62,
      atRiskVoters: 44
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 826,
      avgScore: 0.6,
      atRiskVoters: 289
    },
    female: {
      population: 894,
      avgScore: 0.62,
      atRiskVoters: 313
    }
  }
}, {
  id: 'P026',
  name: 'Danville Central Precinct',
  county: 'Danville',
  municipality: 'Danville',
  coordinates: [36.59, -79.4],
  avgScore: 0.58,
  affectedPopulation: 1380,
  atRiskVoters: 518,
  demographics: {
    white: {
      population: 621,
      avgScore: 0.66,
      atRiskVoters: 177
    },
    black: {
      population: 552,
      avgScore: 0.51,
      atRiskVoters: 237
    },
    hispanic: {
      population: 138,
      avgScore: 0.47,
      atRiskVoters: 71
    },
    asian: {
      population: 69,
      avgScore: 0.59,
      atRiskVoters: 33
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 662,
      avgScore: 0.57,
      atRiskVoters: 248
    },
    female: {
      population: 718,
      avgScore: 0.59,
      atRiskVoters: 270
    }
  }
}, {
  id: 'P027',
  name: 'Chesapeake North Precinct',
  county: 'Chesapeake',
  municipality: 'Chesapeake',
  coordinates: [36.77, -76.28],
  avgScore: 0.67,
  affectedPopulation: 1650,
  atRiskVoters: 495,
  demographics: {
    white: {
      population: 1073,
      avgScore: 0.73,
      atRiskVoters: 242
    },
    black: {
      population: 330,
      avgScore: 0.59,
      atRiskVoters: 128
    },
    hispanic: {
      population: 165,
      avgScore: 0.56,
      atRiskVoters: 75
    },
    asian: {
      population: 83,
      avgScore: 0.64,
      atRiskVoters: 50
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 792,
      avgScore: 0.66,
      atRiskVoters: 238
    },
    female: {
      population: 858,
      avgScore: 0.68,
      atRiskVoters: 257
    }
  }
}, {
  id: 'P028',
  name: 'Suffolk Central Precinct',
  county: 'Suffolk',
  municipality: 'Suffolk',
  coordinates: [36.73, -76.58],
  avgScore: 0.64,
  affectedPopulation: 1420,
  atRiskVoters: 455,
  demographics: {
    white: {
      population: 639,
      avgScore: 0.72,
      atRiskVoters: 153
    },
    black: {
      population: 568,
      avgScore: 0.57,
      atRiskVoters: 210
    },
    hispanic: {
      population: 142,
      avgScore: 0.53,
      atRiskVoters: 63
    },
    asian: {
      population: 71,
      avgScore: 0.65,
      atRiskVoters: 29
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 682,
      avgScore: 0.63,
      atRiskVoters: 218
    },
    female: {
      population: 738,
      avgScore: 0.65,
      atRiskVoters: 237
    }
  }
}, {
  id: 'P029',
  name: 'Fredericksburg Central Precinct',
  county: 'Fredericksburg',
  municipality: 'Fredericksburg',
  coordinates: [38.3, -77.47],
  avgScore: 0.73,
  affectedPopulation: 1380,
  atRiskVoters: 331,
  demographics: {
    white: {
      population: 897,
      avgScore: 0.79,
      atRiskVoters: 152
    },
    black: {
      population: 276,
      avgScore: 0.65,
      atRiskVoters: 91
    },
    hispanic: {
      population: 138,
      avgScore: 0.62,
      atRiskVoters: 53
    },
    asian: {
      population: 69,
      avgScore: 0.7,
      atRiskVoters: 35
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 662,
      avgScore: 0.72,
      atRiskVoters: 159
    },
    female: {
      population: 718,
      avgScore: 0.74,
      atRiskVoters: 172
    }
  }
}, {
  id: 'P030',
  name: 'Harrisonburg Central Precinct',
  county: 'Harrisonburg',
  municipality: 'Harrisonburg',
  coordinates: [38.45, -78.87],
  avgScore: 0.75,
  affectedPopulation: 1520,
  atRiskVoters: 334,
  demographics: {
    white: {
      population: 988,
      avgScore: 0.81,
      atRiskVoters: 148
    },
    black: {
      population: 304,
      avgScore: 0.67,
      atRiskVoters: 94
    },
    hispanic: {
      population: 152,
      avgScore: 0.64,
      atRiskVoters: 56
    },
    asian: {
      population: 76,
      avgScore: 0.72,
      atRiskVoters: 36
    },
    other: {
      population: 0,
      avgScore: 0,
      atRiskVoters: 0
    },
    male: {
      population: 730,
      avgScore: 0.74,
      atRiskVoters: 160
    },
    female: {
      population: 790,
      avgScore: 0.76,
      atRiskVoters: 174
    }
  }
}];
// Apply demographic filters to the data
const applyDemographicFilters = (precinct, filters) => {
  // If no demographic filters are applied, use the overall precinct data
  if (!filters || filters.race.length === 0 && filters.gender.length === 0) {
    return {
      id: precinct.id,
      name: precinct.name,
      county: precinct.county,
      municipality: precinct.municipality,
      avgScore: precinct.avgScore,
      totalVoters: precinct.affectedPopulation,
      atRiskVoters: precinct.atRiskVoters,
      bipocPct: (precinct.atRiskVoters / precinct.affectedPopulation * 100).toFixed(1),
      demographics: {
        white: 65,
        black: 20,
        hispanic: 10,
        asian: 5,
        other: 0,
        male: 48,
        female: 52
      },
      center: [precinct.coordinates[0], precinct.coordinates[1]]
    };
  }
  // Start with empty aggregates
  let filteredPopulation = 0;
  let filteredAtRisk = 0;
  let weightedScore = 0;
  // Apply race filters
  if (filters.race.length > 0) {
    filters.race.forEach(race => {
      const raceKey = race.toLowerCase();
      if (precinct.demographics[raceKey]) {
        const demoData = precinct.demographics[raceKey];
        filteredPopulation += demoData.population;
        filteredAtRisk += demoData.atRiskVoters;
        weightedScore += demoData.avgScore * demoData.population;
      }
    });
  } else {
    // If no race filter, include all races
    ;
    ['white', 'black', 'hispanic', 'asian', 'other'].forEach(race => {
      if (precinct.demographics[race]) {
        const demoData = precinct.demographics[race];
        filteredPopulation += demoData.population;
        filteredAtRisk += demoData.atRiskVoters;
        weightedScore += demoData.avgScore * demoData.population;
      }
    });
  }
  // Apply gender filters - this will further filter the already filtered population
  if (filters.gender.length > 0) {
    // Reset counters for gender filtering
    let genderFilteredPopulation = 0;
    let genderFilteredAtRisk = 0;
    let genderWeightedScore = 0;
    filters.gender.forEach(gender => {
      const genderKey = gender.toLowerCase();
      if (precinct.demographics[genderKey]) {
        const demoData = precinct.demographics[genderKey];
        genderFilteredPopulation += demoData.population;
        genderFilteredAtRisk += demoData.atRiskVoters;
        genderWeightedScore += demoData.avgScore * demoData.population;
      }
    });
    // Use gender filtered data
    filteredPopulation = genderFilteredPopulation;
    filteredAtRisk = genderFilteredAtRisk;
    weightedScore = genderWeightedScore;
  }
  // Calculate average score
  const filteredAvgScore = filteredPopulation > 0 ? weightedScore / filteredPopulation : precinct.avgScore;
  // Apply score range filter
  if (filters.scoreRange[0] > 0 || filters.scoreRange[1] < 1) {
    if (filteredAvgScore < filters.scoreRange[0] || filteredAvgScore > filters.scoreRange[1]) {
      return null; // This precinct doesn't match the score range filter
    }
  }
  return {
    id: precinct.id,
    name: precinct.name,
    county: precinct.county,
    municipality: precinct.municipality,
    avgScore: filteredAvgScore,
    totalVoters: filteredPopulation,
    atRiskVoters: filteredAtRisk,
    bipocPct: filteredPopulation > 0 ? (filteredAtRisk / filteredPopulation * 100).toFixed(1) : '0',
    demographics: precinct.demographics,
    center: [precinct.coordinates[0], precinct.coordinates[1]]
  };
};
// Use sample data directly to generate bubble data with demographic filtering
const useSamplePrecinctData = (precincts, filters) => {
  // Apply demographic filters to sample data
  return virginiaPrecinctData.map(precinct => {
    // Apply demographic filters
    return applyDemographicFilters(precinct, filters);
  }).filter(precinct => precinct !== null); // Remove precincts that don't match filters
};
interface MapViewProps {
  region: {
    center: [number, number];
    zoom: number;
    bounds?: [[number, number], [number, number]];
  };
  precincts: any;
  voters: any[];
  darkMode: boolean;
}
const MapView: React.FC<MapViewProps> = ({
  region,
  precincts,
  voters,
  darkMode
}) => {
  const [bubbleData, setBubbleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Extract filters from the voters array
  const extractFilters = voters => {
    if (!voters || voters.length === 0) return null;
    const raceFilters = [...new Set(voters.map(voter => voter.race))];
    const genderFilters = [...new Set(voters.map(voter => voter.gender))];
    // Get min and max score from voters
    const scores = voters.map(voter => voter.voter_eligibility_score);
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    return {
      race: raceFilters,
      gender: genderFilters,
      scoreRange: [minScore, maxScore],
      municipality: []
    };
  };
  // Update bubble data when precincts or voters change
  useEffect(() => {
    setIsLoading(true);
    // Extract filters from voters
    const filters = extractFilters(voters);
    // Apply filters to get the bubble data
    const bubbles = useSamplePrecinctData(precincts, filters);
    setBubbleData(bubbles);
    setIsLoading(false);
  }, [precincts, voters]);
  // Function to get color based on eligibility score
  const getColor = (score: number) => {
    if (score >= 0.9) return '#10B981'; // Green for high scores
    if (score >= 0.8) return '#10B981'; // Green
    if (score >= 0.7) return '#10B981'; // Green
    if (score >= 0.6) return '#FBBF24'; // Yellow for medium scores
    if (score >= 0.5) return '#FBBF24'; // Yellow
    if (score >= 0.4) return '#FBBF24'; // Yellow
    return '#EF4444'; // Red for low scores
  };
  // Calculate bubble size based on total voters
  const getBubbleRadius = (totalVoters: number) => {
    // Scale the radius based on voter count
    // Min radius is 5px, max is 30, with logarithmic scaling to prevent huge bubbles
    const minRadius = 5;
    const maxRadius = 30;
    const minVoters = 100;
    const maxVoters = 2000;
    if (!totalVoters) return minRadius;
    if (totalVoters <= minVoters) return minRadius;
    if (totalVoters >= maxVoters) return maxRadius;
    // Logarithmic scaling
    const scale = (maxRadius - minRadius) / Math.log(maxVoters / minVoters);
    return minRadius + scale * Math.log(totalVoters / minVoters);
  };
  // Add dark mode styles for map
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .dark-popup .leaflet-popup-content-wrapper {
        background-color: #1F2937;
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
      }
      .dark-popup .leaflet-popup-tip {
        background-color: #1F2937;
      }
      .light-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      }
      .leaflet-container {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  return <div className="notebook-cell map-cell">
      <div className="mb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Virginia Voter Eligibility Map
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Low Score (&lt;50%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Medium Score (50-80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              High Score (&gt;80%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Bubble size represents voter population
            </span>
          </div>
        </div>
      </div>
      <div className={`h-[500px] w-full border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden shadow-lg relative`}>
        {isLoading && <div className="absolute inset-0 bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70 z-10 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                Updating map...
              </span>
            </div>
          </div>}
        <MapContainer center={region.center} zoom={region.zoom} style={{
        height: '100%',
        width: '100%'
      }} zoomControl={false} className={darkMode ? 'dark-map' : ''}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={darkMode ? 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png' : 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'} />
          <ZoomControl position="bottomright" />
          <MapViewControl center={region.center} zoom={region.zoom} bounds={region.bounds} />
          {bubbleData.map((precinct: any) => <CircleMarker key={precinct.id} center={precinct.center} radius={getBubbleRadius(precinct.totalVoters)} pathOptions={{
          fillColor: getColor(precinct.avgScore),
          color: getColor(precinct.avgScore),
          weight: 1,
          fillOpacity: 0.7,
          opacity: 1
        }}>
              <Popup className={darkMode ? 'dark-popup' : 'light-popup'}>
                <div className="p-2">
                  <h3 className="font-medium">{precinct.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {precinct.municipality}, {precinct.county}
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Eligibility Score:
                      </span>
                      <span className="text-sm">
                        {(precinct.avgScore * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Voters:</span>
                      <span className="text-sm">
                        {precinct.totalVoters?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        At-Risk Voters:
                      </span>
                      <span className="text-sm">
                        {precinct.atRiskVoters?.toLocaleString() || 'N/A'}
                      </span>
                    </div>
                    {precinct.bipocPct !== undefined && <div className="flex justify-between">
                        <span className="text-sm font-medium">At-Risk %:</span>
                        <span className="text-sm">
                          {precinct.bipocPct.toFixed ? precinct.bipocPct.toFixed(1) : precinct.bipocPct}
                          %
                        </span>
                      </div>}
                  </div>
                  {precinct.demographics && <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm font-medium mb-1">
                        Demographics:
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {precinct.demographics.white && <div className="text-xs">
                            White:{' '}
                            {Math.round(precinct.demographics.white.population / precinct.affectedPopulation * 100)}
                            %
                          </div>}
                        {precinct.demographics.black && <div className="text-xs">
                            Black:{' '}
                            {Math.round(precinct.demographics.black.population / precinct.affectedPopulation * 100)}
                            %
                          </div>}
                        {precinct.demographics.hispanic && <div className="text-xs">
                            Hispanic:{' '}
                            {Math.round(precinct.demographics.hispanic.population / precinct.affectedPopulation * 100)}
                            %
                          </div>}
                        {precinct.demographics.asian && <div className="text-xs">
                            Asian:{' '}
                            {Math.round(precinct.demographics.asian.population / precinct.affectedPopulation * 100)}
                            %
                          </div>}
                        {precinct.demographics.male && <div className="text-xs">
                            Male:{' '}
                            {Math.round(precinct.demographics.male.population / precinct.affectedPopulation * 100)}
                            %
                          </div>}
                        {precinct.demographics.female && <div className="text-xs">
                            Female:{' '}
                            {Math.round(precinct.demographics.female.population / precinct.affectedPopulation * 100)}
                            %
                          </div>}
                      </div>
                    </div>}
                  <div className="mt-2 pt-1 border-t border-gray-200 dark:border-gray-700">
                    <Link to={`/precinct/${precinct.id}`} className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                      View Detailed Analysis
                    </Link>
                  </div>
                </div>
              </Popup>
            </CircleMarker>)}
        </MapContainer>
      </div>
      <div className="mt-2 text-xs text-center italic text-gray-500 dark:text-gray-400">
        Click on a bubble for detailed voter eligibility information
      </div>
      <div className="mt-4 p-3 border border-blue-200 bg-blue-50 rounded-md text-sm text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200">
        <p className="font-medium">Data Visualization Note:</p>
        <ul className="mt-1 list-disc list-inside space-y-1 text-xs">
          <li>
            Bubbles represent precincts with their size indicating voter
            population
          </li>
          <li>
            Color indicates eligibility score: red for low, yellow for medium,
            green for high
          </li>
          <li>
            Larger bubbles with red or yellow colors indicate areas with many
            at-risk voters
          </li>
          <li>
            This visualization helps identify priority areas for voter
            eligibility interventions
          </li>
        </ul>
      </div>
    </div>;
};
export default MapView;