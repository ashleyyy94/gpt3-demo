import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Give me a new recipe to try with a detailed step-by-step recipe, without newlines. Include a warm greeting from a personal chef named Marco at the beginning. Use the following ingredients:

Ingredients:
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  // If require Prompt #2.
//   const secondPrompt = 
//   `
//   Take the table of contents and title of the blog post below and generate a blog post written in thwe style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

//   Title: ${req.body.userInput}

//   Table of Contents: ${basePromptOutput.text}

//   Blog Post:
//   `

  // 2nd Call
//   const secondPromptCompletion = await openai.createCompletion({
//     model: 'text-davinci-002',
//     prompt: `${secondPrompt}`,
//     temperature: 0.85,
//     max_tokens: 1250,
//   });
  
//   // Get the output
//   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;