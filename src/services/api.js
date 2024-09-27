const mockCouncils = [
  {
    id: 1,
    name: "Mount Isa City Council",
    budget: 110.9,
    year: 2025,
    quickFacts: [
      "Major infrastructure projects planned",
      "Focus on community services",
      "Sustainable development initiatives"
    ],
    projectDescription: "The 2025 budget focuses on enhancing city infrastructure and community services.",
    fundingSource: "Local taxes, state grants, and federal funding",
    budgetBreakdown: [
      "Infrastructure: $50 million",
      "Community Services: $30 million",
      "Administration: $20 million",
      "Parks and Recreation: $10.9 million"
    ],
    keyHighlights: [
      "New community center construction",
      "Road improvement project",
      "Increased funding for local businesses"
    ]
  },
  {
    id: 2,
    name: "Brisbane City Council",
    budget: 3200,
    year: 2025,
    quickFacts: [
      "Largest council budget in Queensland",
      "Major public transport investments",
      "Green spaces expansion"
    ],
    projectDescription: "Brisbane's 2025 budget aims to transform the city with major investments in public transport and green initiatives.",
    fundingSource: "City rates, parking fees, state and federal grants",
    budgetBreakdown: [
      "Public Transport: $1.5 billion",
      "Infrastructure: $800 million",
      "Parks and Environment: $400 million",
      "Community Services: $500 million"
    ],
    keyHighlights: [
      "New cross-river rail project",
      "Expansion of bike paths network",
      "Flood mitigation works"
    ]
  }
];

export const fetchCouncils = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockCouncils;
};

export const fetchCouncilDetails = async (id) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  const council = mockCouncils.find(c => c.id === parseInt(id));
  if (!council) {
    throw new Error('Council not found');
  }
  return council;
};