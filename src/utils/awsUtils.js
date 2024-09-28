import AWS from 'aws-sdk';

// Configure AWS SDK (ensure your AWS credentials are set up correctly)
AWS.config.update({ region: 'ap-southeast-2' });

const secretsManager = new AWS.SecretsManager();

export async function getChatGPTApiKey() {
  try {
    const data = await secretsManager.getSecretValue({ SecretId: 'ChatGPTAPI' }).promise();
    const secret = JSON.parse(data.SecretString);
    return secret.CHATGPT_API_KEY;
  } catch (error) {
    console.error("Error retrieving the ChatGPT API key: ", error);
    throw error;
  }
}