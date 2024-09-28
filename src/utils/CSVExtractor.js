import { parseCSV } from './CSVParser';

export const extractInformation = async (state, infoType) => {
  try {
    const csvUrl = 'https://raw.githubusercontent.com/KenKaiii/budget-scraper-haven/main/budgetfiles/QLDBudgets.csv';
    const csvData = await parseCSV(csvUrl);
    
    // Filter data based on user selection
    const filteredData = csvData.filter(row => {
      const projectName = row['Project'] || '';
      return projectName.toLowerCase().includes(infoType.toLowerCase());
    });

    // Return raw data
    return filteredData;
  } catch (error) {
    console.error('Error extracting information:', error);
    throw new Error('Failed to extract budget information');
  }
};