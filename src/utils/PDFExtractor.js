import { Configuration, OpenAIApi } from 'openai';
import * as pdfjs from 'pdfjs-dist';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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

  try {
    // Fetch the PDF file
    const pdfResponse = await fetch(pdfPath);
    if (!pdfResponse.ok) {
      throw new Error(`HTTP error! status: ${pdfResponse.status}`);
    }
    const pdfData = await pdfResponse.arrayBuffer();

    // Load the PDF using pdf.js
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
    let extractedText = '';

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map(item => item.str).join(' ') + '\n';
    }

    console.log('Extracted text:', extractedText);

    console.log('Calling OpenAI API...');
    const openAIResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpful assistant that extracts specific information about infrastructure projects. Provide only the project name, budget, total estimated cost, and location for each project mentioned. Extract as many projects as possible from the given text, up to a maximum of 20 projects."},
        {role: "user", content: `Extract and list the infrastructure projects related to ${infoType} in ${state} from the following text. Include only the project name, budget, total estimated cost, and location for each project. List as many projects as you can find, up to 20:\n\n${extractedText}`}
      ],
      max_tokens: 1000,
    });
    console.log('OpenAI API response:', openAIResponse.data);

    const summary = openAIResponse.data.choices[0].message.content.trim();
    console.log('Parsed summary:', summary);

    // Parse the summary to extract project information
    const projects = parseProjectsFromSummary(summary);
    console.log('Parsed projects:', projects);

    return projects;
  } catch (error) {
    console.error('Error in extraction process:', error);
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
  const projectRegex = /Project:?\s*([\s\S]*?)(?=\n\s*Project:|$)/gi;
  let match;

  while ((match = projectRegex.exec(summary)) !== null) {
    const projectInfo = match[1].trim();
    const project = {};

    const nameMatch = projectInfo.match(/Name:?\s*(.+)/i);
    const budgetMatch = projectInfo.match(/Budget:?\s*(.+)/i);
    const costMatch = projectInfo.match(/Total Estimated Cost:?\s*(.+)/i);
    const locationMatch = projectInfo.match(/Location:?\s*(.+)/i);

    if (nameMatch) project.projectName = nameMatch[1].trim();
    if (budgetMatch) project.budget = budgetMatch[1].trim();
    if (costMatch) project.totalEstimatedCost = costMatch[1].trim();
    if (locationMatch) project.statisticalArea = locationMatch[1].trim();

    if (Object.keys(project).length > 0) {
      projects.push(project);
    }
  }

  console.log('Parsed projects:', projects);
  return projects;
};