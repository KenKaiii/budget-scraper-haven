import { parseCSV } from './CSVParser';

export const extractInformation = async (state, infoType) => {
  try {
    const csvUrl = 'https://raw.githubusercontent.com/KenKaiii/budget-scraper-haven/main/budgetfiles/QLDBudgets.csv';
    const csvData = await parseCSV(csvUrl);
    
    // Filter data based on user selection
    const filteredData = csvData.filter(row => {
      const isRelevantProject = row['Project Name'].toLowerCase().includes(infoType.toLowerCase());
      return isRelevantProject;
    });

    // Map the filtered data to the required format
    return filteredData.map(row => ({
      projectName: row['Project Name'],
      budget: row['Budget'] || row['Total Estimated Cost'],
      timeline: row['Time'],
      details: `Statistical Area: ${row['Statistical Area']}`
    }));
  } catch (error) {
    console.error('Error extracting information:', error);
    throw new Error('Failed to extract budget information');
  }
};