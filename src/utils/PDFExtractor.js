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
        {role: "user", content: `Summarize the following text about ${infoType} in ${state}:\n\n${extractedText}`}
      ],
      max_tokens: 150,
    });
    console.log('OpenAI API response:', response);

    const summary = response.data.choices[0].message.content.trim();

    // Return placeholder data along with the summary
    return [
      {
        projectName: `${state} ${infoType} Project 1`,
        budget: '$100 million',
        totalEstimatedCost: '$150 million',
        statisticalArea: 'Central Region',
        summary: summary,
      },
      {
        projectName: `${state} ${infoType} Project 2`,
        budget: '$75 million',
        totalEstimatedCost: '$120 million',
        statisticalArea: 'Northern Region',
        summary: summary,
      },
      // Add more placeholder projects as needed
    ];
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