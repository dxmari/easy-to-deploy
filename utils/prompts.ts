// const prompts = require('prompts');
import prompts from 'prompts'

const questions: prompts.PromptObject[] = [
    {
        type: 'select',
        name: 'applicationID',
        message: 'Please choose the application'
    },
    {
        type: 'confirm',
        name: 'default',
        message: 'Would you like to set this application as default',
        initial: false
    }
];

export default {
    chooseApp: async (choices: any) => {
        questions[0].choices = choices;
        const response = await prompts(questions);
        return response;
    }
} 
