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
  const pdfPath = pdfPaths[state];
  if (!pdfPath) {
    throw new Error('PDF not found for the selected state');
  }

  // TODO: Implement actual PDF extraction logic here
  // For now, we'll use a placeholder extraction
  const extractedText = `Sample extracted text for ${state} ${infoType} projects`;

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
    console.log('OpenAI API response:', response);

    const summary = response.data.choices[0].message.content.trim();

    // Parse the summary to extract project information
    const projects = parseProjectsFromSummary(summary);

    return projects;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    let errorMessage = `Failed to analyze the extracted information: ${error.message}`;
    if (error.response) {
      errorMessage += `\nStatus: ${error.response.status}\nData: ${JSON.stringify(error.response.data)}`;
    }
    errorMessage += `\nStack trace: ${error.stack}`;
    throw new Error(errorMessage);
  }
};

const parseProjectsFromSummary = (summary) => {
  // This is a simple parser. You might need to adjust it based on the actual format of the summary.
  const lines = summary.split('\n');
  const projects = [];
  let currentProject = {};

  for (const line of lines) {
    if (line.startsWith('Project:')) {
      if (Object.keys(currentProject).length > 0) {
        projects.push(currentProject);
      }
      currentProject = { projectName: line.split('Project:')[1].trim() };
    } else if (line.startsWith('Budget:')) {
      currentProject.budget = line.split('Budget:')[1].trim();
    } else if (line.startsWith('Total Estimated Cost:')) {
      currentProject.totalEstimatedCost = line.split('Total Estimated Cost:')[1].trim();
    } else if (line.startsWith('Statistical Area:')) {
      currentProject.statisticalArea = line.split('Statistical Area:')[1].trim();
    }
  }

  if (Object.keys(currentProject).length > 0) {
    projects.push(currentProject);
  }

  return projects;
};