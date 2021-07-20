// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter a project name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter a project description.',
        validate: projectDescription => {
            if (projectDescription) {
                return true;
            } else {
                console.log('You must enter a project description.')
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmTableOfContents',
        message: 'Would you like to include a table of contents?',
        default: true
    },
    {
        type: 'checkbox',
        name: 'tableOfContents',
        message: 'Which of the following sections would you like to include in your table of contents?',
        choices: ['Installation', 'Usage', 'Credits', 'License', 'Badges', 'Features', 'Contributing', 'Tests'],
        when: ({ confirmTableOfContents }) => {
            if (confirmTableOfContents) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please enter installation instructions.',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Installation')) {
                return true;
            } else {
                return false;
            }
        }
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
    return inquirer
    .prompt(questions) 
    }

// Function call to initialize app
init();
