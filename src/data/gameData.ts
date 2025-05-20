
// Game data with 10 rounds
export interface GameRound {
  id: number;
  photoUrl: string;
  correctFloor: number;
  correctPosition: { x: number; y: number };
  description?: string;
}

export interface FloorMap {
  floor: number;
  name: string;
  mapUrl: string;
}

// Floor maps
export const floorMaps: FloorMap[] = [
  {
    floor: 0,
    name: "Ground Floor",
    mapUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2Mjk4Ng&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    floor: 1,
    name: "First Floor",
    mapUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzA3NA&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    floor: 2,
    name: "Second Floor",
    mapUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzEwOA&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    floor: 3,
    name: "Third Floor",
    mapUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzE0MQ&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    floor: 4,
    name: "Fourth Floor",
    mapUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzE3Mg&ixlib=rb-1.2.1&q=80&w=1080",
  },
];

// Game rounds
export const gameRounds: GameRound[] = [
  {
    id: 1,
    photoUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzI2OQ&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 2,
    correctPosition: { x: 75, y: 30 },
    description: "Office conference room with glass walls",
  },
  {
    id: 2,
    photoUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzQ3NQ&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 0,
    correctPosition: { x: 20, y: 60 },
    description: "Main lobby entrance",
  },
  {
    id: 3,
    photoUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzUwNA&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 3,
    correctPosition: { x: 45, y: 45 },
    description: "Quiet study area",
  },
  {
    id: 4,
    photoUrl: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzUzMQ&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 4,
    correctPosition: { x: 85, y: 15 },
    description: "Executive meeting room",
  },
  {
    id: 5,
    photoUrl: "https://images.unsplash.com/photo-1439887352045-564d49420957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzU2MA&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 1,
    correctPosition: { x: 30, y: 70 },
    description: "Cafeteria seating area",
  },
  {
    id: 6,
    photoUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzU4OQ&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 2,
    correctPosition: { x: 60, y: 40 },
    description: "Recreation room",
  },
  {
    id: 7,
    photoUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzYxOA&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 0,
    correctPosition: { x: 50, y: 20 },
    description: "Reception desk",
  },
  {
    id: 8,
    photoUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzY0NQ&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 3,
    correctPosition: { x: 15, y: 50 },
    description: "IT department",
  },
  {
    id: 9,
    photoUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzY3NQ&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 1,
    correctPosition: { x: 70, y: 25 },
    description: "Staff kitchen",
  },
  {
    id: 10,
    photoUrl: "https://images.unsplash.com/photo-1577079584753-dd075b10e19c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyMTY2MzcwMw&ixlib=rb-1.2.1&q=80&w=1080",
    correctFloor: 4,
    correctPosition: { x: 40, y: 80 },
    description: "Rooftop garden",
  },
];

// Calculate distance between two points (used for scoring)
export function calculateDistance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Calculate score based on floor and position accuracy
export function calculateScore(
  guessedFloor: number,
  correctFloor: number,
  guessedPosition: { x: number; y: number },
  correctPosition: { x: number; y: number }
): number {
  // Maximum possible score
  const maxScore = 1000;
  
  // Floor accuracy (50% of total score)
  const floorScore = guessedFloor === correctFloor ? maxScore * 0.5 : 0;
  
  // Position accuracy (50% of total score)
  // Calculate distance (0-100 scale)
  const distance = calculateDistance(guessedPosition, correctPosition);
  
  // Maximum distance possible on a 100x100 map is ~141.42 (diagonal)
  // Convert to a 0-1 scale and invert (closer = higher score)
  const normalizedDistance = Math.min(1, distance / 141.42);
  const positionScore = maxScore * 0.5 * (1 - normalizedDistance);
  
  // Total score (rounded to integer)
  return Math.round(floorScore + positionScore);
}
