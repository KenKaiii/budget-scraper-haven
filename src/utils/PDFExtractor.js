import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const pdfPaths = {
  'Queensland': 'budgetfiles/Queensland Budgets.pdf',
  'New South Wales': 'budgetfiles/New_South_Wales_Budgets.pdf',
  // Add paths for other states
};

export const extractInformation = async (state, infoType) => {
  console.log('Starting extraction process...');
  console.log(`State: ${state}, Info Type: ${infoType}`);

  const pdfPath = pdfPaths[state];
  if (!pdfPath) {
    console.error('PDF not found for the selected state');
    throw new Error('PDF not found for the selected state');
  }

  console.log(`Attempting to extract information from: ${pdfPath}`);

  // TODO: Implement actual PDF extraction logic here
  // For now, we'll use a placeholder extraction
  const extractedText = `Sample extracted text for ${state} ${infoType} projects`;

  console.log('Extracted text:', extractedText);

  try {
    console.log('Calling OpenAI API...');
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpful assistant that summarizes text about infrastructure projects."},
        {role: "user", content: `Summarize the following text about ${infoType} in ${state} and provide a list of projects with their budget, total estimated cost, and statistical area:\n\n${extractedText}`}
      ],
      max_tokens: 500,
    });
    console.log('OpenAI API response:', response.data);

    const summary = response.data.choices[0].message.content.trim();
    console.log('Parsed summary:', summary);

    // Parse the summary to extract project information
    const projects = parseProjectsFromSummary(summary);
    console.log('Parsed projects:', projects);

    return projects;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    let errorMessage = `Failed to analyze the extracted information: ${error.message}`;
    if (error.response) {
      errorMessage += `\nStatus: ${error.response.status}\nData: ${JSON.stringify(error.response.data)}`;
    }
    errorMessage += `\nStack trace: ${error.stack}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

const parseProjectsFromSummary = (summary) => {
  console.log('Parsing summary:', summary);
  const projects = [];
  const lines = summary.split('.');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.includes('project') || trimmedLine.includes('upgrade')) {
      const project = {};
      
      // Extract project name
      const nameMatch = trimmedLine.match(/the (.+?) with/i);
      if (nameMatch) {
        project.projectName = nameMatch[1].trim();
      }
      
      // Extract budget/total estimated cost
      const costMatch = trimmedLine.match(/total estimated cost of \$?([\d.]+) (million|billion)/i);
      if (costMatch) {
        let cost = parseFloat(costMatch[1]);
        if (costMatch[2].toLowerCase() === 'billion') {
          cost *= 1000;
        }
        project.totalEstimatedCost = `$${cost} million`;
      }
      
      // Extract statistical area
      const areaMatch = trimmedLine.match(/in the (.+?) statistical area/i);
      if (areaMatch) {
        project.statisticalArea = areaMatch[1].trim();
      }
      
      // Only add the project if we have at least a name and cost
      if (project.projectName && project.totalEstimatedCost) {
        project.budget = project.totalEstimatedCost; // Assuming budget is the same as total estimated cost
        projects.push(project);
      }
    }
  }
  
  console.log('Parsed projects:', projects);
  return projects;
};