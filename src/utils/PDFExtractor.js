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

export const extractInformation = async (state) => {
  const pdfPath = pdfPaths[state];
  if (!pdfPath) {
    throw new Error('PDF not found for the selected state');
  }

  // TODO: Implement actual PDF extraction logic here
  // For now, we'll use a placeholder extraction
  const extractedText = `Sample extracted text for ${state} infrastructure projects`;

  // Use OpenAI to analyze and summarize the extracted text
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Summarize the following text about infrastructure projects in ${state}:\n\n${extractedText}`,
    max_tokens: 150,
  });

  const summary = response.data.choices[0].text.trim();

  // Return placeholder data
  return [
    {
      projectName: `${state} Road Improvement`,
      budget: '$100 million',
      description: summary,
      timeline: '2023-2025',
      source: pdfPath,
    },
    // Add more placeholder projects as needed
  ];
};