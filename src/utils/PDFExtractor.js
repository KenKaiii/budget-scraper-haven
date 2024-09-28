import { Configuration, OpenAIApi } from 'openai';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const pdfPaths = {
  'Queensland': '/budgetfiles/Queensland Budgets.pdf',
};

export const extractInformation = async (state, infoType) => {
  console.log('Starting extraction process...');
  console.log(`State: ${state}, Info Type: ${infoType}`);

  const pdfPath = pdfPaths[state];
  if (!pdfPath) {
    console.error('PDF not found for the selected state');
    throw new Error('PDF not found for the selected state');
  }

  try {
    const pdfData = await fetch(pdfPath).then(res => res.arrayBuffer());
    const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
    let extractedText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      extractedText += parseTableLikeStructure(pageText) + '\n';
    }

    console.log('Extracted text:', extractedText);

    const openAIResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: `You are an assistant that extracts and organizes information about ${infoType} projects from budget documents. For each project, provide the project name, budget allocation, timeline, and any other relevant details.`},
        {role: "user", content: `Extract and organize information about ${infoType} projects from the following text. List as many projects as you can find:\n\n${extractedText}`}
      ],
      max_tokens: 1000,
    });

    const summary = openAIResponse.data.choices[0].message.content.trim();
    console.log('Parsed summary:', summary);

    return parseProjectsFromSummary(summary);
  } catch (error) {
    console.error('Error in extraction process:', error);
    throw new Error(`Failed to analyze the extracted information: ${error.message}`);
  }
};

const parseTableLikeStructure = (text) => {
  // Split the text into lines
  const lines = text.split('\n');
  
  // Process each line to identify and structure table-like data
  const structuredData = lines.map(line => {
    // Split the line by multiple spaces to separate columns
    const columns = line.split(/\s{2,}/);
    return columns.join(' | ');
  });

  return structuredData.join('\n');
};

const parseProjectsFromSummary = (summary) => {
  const projects = [];
  const projectRegex = /Project:?\s*([\s\S]*?)(?=\n\s*Project:|$)/gi;
  let match;

  while ((match = projectRegex.exec(summary)) !== null) {
    const projectInfo = match[1].trim();
    const project = {};

    const nameMatch = projectInfo.match(/Name:?\s*(.+)/i);
    const budgetMatch = projectInfo.match(/Budget:?\s*(.+)/i);
    const timelineMatch = projectInfo.match(/Timeline:?\s*(.+)/i);
    const detailsMatch = projectInfo.match(/Details:?\s*([\s\S]+)$/i);

    if (nameMatch) project.projectName = nameMatch[1].trim();
    if (budgetMatch) project.budget = budgetMatch[1].trim();
    if (timelineMatch) project.timeline = timelineMatch[1].trim();
    if (detailsMatch) project.details = detailsMatch[1].trim();

    if (Object.keys(project).length > 0) {
      projects.push(project);
    }
  }

  console.log('Parsed projects:', projects);
  return projects;
};