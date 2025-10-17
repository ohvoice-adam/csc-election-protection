// Mock data for Virginia voter eligibility
// Define region bounds for different views of Virginia
export const regionBounds = {
  statewide: {
    center: [37.5, -78.5],
    zoom: 7,
    bounds: [[39.5, -83.7], [36.5, -75.2]] // Northern, Western, Southern, Eastern
  },
  north: {
    center: [38.9, -77.5],
    zoom: 9,
    bounds: [[39.5, -78.5], [38.5, -76.9]]
  },
  west: {
    center: [37.3, -80.5],
    zoom: 8,
    bounds: [[38.5, -83.7], [36.5, -79.0]]
  },
  east: {
    center: [37.5, -76.8],
    zoom: 8,
    bounds: [[38.0, -78.0], [36.8, -75.2]]
  },
  south: {
    center: [36.7, -78.5],
    zoom: 8,
    bounds: [[37.3, -80.0], [36.5, -77.0]]
  }
};
// Mock municipalities
export const municipalities = ['Richmond', 'Norfolk', 'Virginia Beach', 'Alexandria', 'Arlington', 'Fairfax', 'Charlottesville', 'Roanoke', 'Lynchburg', 'Danville', 'Hampton', 'Newport News', 'Chesapeake', 'Suffolk', 'Petersburg', 'Fredericksburg', 'Harrisonburg', 'Blacksburg', 'Bristol', 'Staunton'];
// Generate mock precinct data
export const generateMockPrecincts = (count = 150) => {
  const precincts = [];
  for (let i = 0; i < count; i++) {
    // Generate a random polygon within Virginia bounds
    const centerLat = 36.5 + Math.random() * 3;
    const centerLng = -83 + Math.random() * 7;
    const size = 0.05 + Math.random() * 0.15;
    // Generate a simple polygon (approximately rectangle with some variation)
    const coordinates = [[[centerLng - size * (0.8 + Math.random() * 0.4), centerLat - size * (0.8 + Math.random() * 0.4)], [centerLng + size * (0.8 + Math.random() * 0.4), centerLat - size * (0.8 + Math.random() * 0.4)], [centerLng + size * (0.8 + Math.random() * 0.4), centerLat + size * (0.8 + Math.random() * 0.4)], [centerLng - size * (0.8 + Math.random() * 0.4), centerLat + size * (0.8 + Math.random() * 0.4)], [centerLng - size * (0.8 + Math.random() * 0.4), centerLat - size * (0.8 + Math.random() * 0.4)]]];
    // Generate mock demographic data
    const whitePct = 20 + Math.random() * 70;
    const blackPct = 10 + Math.random() * 50;
    const hispanicPct = 5 + Math.random() * 30;
    const asianPct = 2 + Math.random() * 15;
    const otherPct = 100 - whitePct - blackPct - hispanicPct - asianPct;
    const bipocPct = blackPct + hispanicPct + asianPct + otherPct;
    // Generate a biased eligibility score that correlates somewhat with BIPOC percentage
    // This simulates potential demographic disparities
    let avgScore = 0.85 - bipocPct / 100 * 0.3 + (Math.random() * 0.2 - 0.1);
    avgScore = Math.max(0.3, Math.min(0.95, avgScore));
    // Calculate at-risk voters (score < 0.5)
    const totalVoters = 200 + Math.floor(Math.random() * 1800);
    const voterScoreDistribution = generateVoterScoreDistribution(avgScore, totalVoters);
    const atRiskVoters = voterScoreDistribution.filter(score => score < 0.5).length;
    precincts.push({
      type: 'Feature',
      properties: {
        id: `P${i.toString().padStart(3, '0')}`,
        name: `Precinct ${i + 1}`,
        municipality: municipalities[Math.floor(Math.random() * municipalities.length)],
        county: `County ${Math.floor(i / 10) + 1}`,
        avgScore,
        totalVoters,
        atRiskVoters,
        bipocPct,
        demographics: {
          white: whitePct,
          black: blackPct,
          hispanic: hispanicPct,
          asian: asianPct,
          other: otherPct,
          male: 45 + Math.random() * 10,
          female: 45 + Math.random() * 10
        },
        voterScores: voterScoreDistribution
      },
      geometry: {
        type: 'Polygon',
        coordinates
      }
    });
  }
  return {
    type: 'FeatureCollection',
    features: precincts
  };
};
// Generate a distribution of voter eligibility scores
const generateVoterScoreDistribution = (meanScore, count) => {
  const scores = [];
  const stdDev = 0.15; // Standard deviation
  for (let i = 0; i < count; i++) {
    // Box-Muller transform for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let score = meanScore + z * stdDev;
    // Clamp between 0 and 1
    score = Math.max(0, Math.min(1, score));
    scores.push(score);
  }
  return scores;
};
// Generate mock voters data
export const generateMockVoters = (count = 10000) => {
  const voters = [];
  const genders = ['Male', 'Female'];
  const races = ['White', 'Black', 'Hispanic', 'Asian', 'Other'];
  for (let i = 0; i < count; i++) {
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const race = races[Math.floor(Math.random() * races.length)];
    // Generate a location within Virginia bounds
    const lat = 36.5 + Math.random() * 3;
    const lon = -83 + Math.random() * 7;
    // Generate a biased eligibility score that correlates with race
    // This is to simulate potential demographic disparities
    let baseScore = 0.75;
    if (race === 'White') baseScore += 0.1;
    if (race === 'Black') baseScore -= 0.05;
    if (race === 'Hispanic') baseScore -= 0.03;
    // Add some random variation
    const eligibilityScore = Math.max(0, Math.min(1, baseScore + (Math.random() * 0.2 - 0.1)));
    voters.push({
      voter_id: `V${i.toString().padStart(6, '0')}`,
      gender,
      race,
      lon,
      lat,
      municipality: municipalities[Math.floor(Math.random() * municipalities.length)],
      voter_eligibility_score: eligibilityScore
    });
  }
  return voters;
};
// Pregenerate mock data
export const mockPrecincts = generateMockPrecincts(150);
export const mockVoters = generateMockVoters(10000);
// Analyze data to get summaries
export const analyzeMockData = () => {
  // Get overall stats
  const allScores = mockVoters.map(v => v.voter_eligibility_score);
  const avgScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
  const atRiskVoters = mockVoters.filter(v => v.voter_eligibility_score < 0.5).length;
  // Get stats by race
  const byRace = {};
  mockVoters.forEach(voter => {
    if (!byRace[voter.race]) {
      byRace[voter.race] = {
        count: 0,
        scoreSum: 0,
        atRisk: 0
      };
    }
    byRace[voter.race].count++;
    byRace[voter.race].scoreSum += voter.voter_eligibility_score;
    if (voter.voter_eligibility_score < 0.5) {
      byRace[voter.race].atRisk++;
    }
  });
  // Calculate averages
  Object.keys(byRace).forEach(race => {
    byRace[race].avgScore = byRace[race].scoreSum / byRace[race].count;
    byRace[race].atRiskPct = byRace[race].atRisk / byRace[race].count * 100;
  });
  // Get stats by gender
  const byGender = {};
  mockVoters.forEach(voter => {
    if (!byGender[voter.gender]) {
      byGender[voter.gender] = {
        count: 0,
        scoreSum: 0,
        atRisk: 0
      };
    }
    byGender[voter.gender].count++;
    byGender[voter.gender].scoreSum += voter.voter_eligibility_score;
    if (voter.voter_eligibility_score < 0.5) {
      byGender[voter.gender].atRisk++;
    }
  });
  // Calculate averages
  Object.keys(byGender).forEach(gender => {
    byGender[gender].avgScore = byGender[gender].scoreSum / byGender[gender].count;
    byGender[gender].atRiskPct = byGender[gender].atRisk / byGender[gender].count * 100;
  });
  // Get top and bottom precincts
  const sortedPrecincts = [...mockPrecincts.features].sort((a, b) => b.properties.avgScore - a.properties.avgScore);
  const topPrecincts = sortedPrecincts.slice(0, 10);
  const bottomPrecincts = sortedPrecincts.slice(-10).reverse();
  return {
    overall: {
      avgScore,
      totalVoters: mockVoters.length,
      atRiskVoters,
      atRiskPct: atRiskVoters / mockVoters.length * 100
    },
    byRace,
    byGender,
    topPrecincts,
    bottomPrecincts
  };
};
export const dataAnalysis = analyzeMockData();