import Papa from 'papaparse';

export const parseCSV = async (url) => {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    throw new Error('Failed to fetch or parse CSV file');
  }
};