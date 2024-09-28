import Papa from 'papaparse';

export const parseCSV = async (url) => {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: header => header.trim(),
        complete: (results) => {
          console.log('Parsed CSV data:', results.data); // Log parsed data for debugging
          resolve(results.data);
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    throw new Error('Failed to fetch or parse CSV file');
  }
};