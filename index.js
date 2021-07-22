// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter a project title.');
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
                console.log('You must enter a project description.');
                return false;
            }
        }
    },
    {
        // is there a way to bypass this step and still proceed without breaking everything? if commented out, terminal has issues with subsequent 'includes'
        type: 'confirm',
        name: 'confirmTableOfContents',
        message: 'Would you like to include a table of contents?',
        default: true
    },
    {
        type: 'checkbox',
        name: 'tableOfContents',
        message: 'Which of the following sections would you like to include in your table of contents?',
        choices: ['Installation', 'Usage', 'Credits', 'License', 'Features', 'Contributing', 'Tests'],
        when: ({ confirmTableOfContents }) => {
            if (confirmTableOfContents) {
                return true;
            } else {
                console.log('You must choose at least one section.')
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
    {
        type: 'input',
        name: 'usage',
        message: 'Please enter instructions for usage.',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Usage')) {
                return true;
            } else {
                return false;

            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmCreditsDevs',
        message: 'Are you crediting any developers with GitHub profiles?',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Credits')) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditsDevsName',
        message: "Please enter the name of a developer you're crediting.",
        when: ({ confirmCreditsDevs, confirmAnotherDev}) => {
            if (confirmCreditsDevs || confirmAnotherDev) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditDevsProfile',
        message: "Please enter the URL of this developer's GitHub profile.",
        when: ({ creditsDevsName }) => {
            if (creditsDevsName) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAnotherDev',
        message: "Would you like to credit another developer?",
        when: ({ creditDevsProfile }) => {
            if (creditDevsProfile) {
                // how do we loop back to earlier position to add another developer while keeping original data persistent?
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmThirdParty',
        message: "Would you like to credit a third-party asset?",
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Credits')) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditAsset',
        message: "Please enter the name of the third-party asset you'd like to credit.",
        when: ({ confirmThirdParty }) => {
            if (confirmThirdParty) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditAssetURL',
        message: "Please enter a URL for this third-party asset.",
        when: ({ creditAsset }) => {
            if (creditAsset) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmThirdParty',
        message: "Would you like to credit another third-party asset?",
        when: ({ creditAssetURL }) => {
            if (creditAssetURL) {
                // how do we loop back to earlier position to add another asset while keeping original data persistent?
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license would you like to use?',
        choices: ['MIT', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License', 'The Unlicense'],
        when: ({ tableOfContents }) => {
            if ( tableOfContents.includes('License') ) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'features',
        message: 'Please enter a comma-separated list of features.',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Features')) {
                return true;
            } else {
                return false;

            }
        }
    },
    {
        type: 'confirm',
        name: 'contributing',
        message: 'Would you like to use the standard "Contributor Convenant" language in your Contributing section?',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Contributing')) {
                return true;
            } else {
                return false;

            }
        }
    },
    {
        type: 'input',
        name: 'contributingOwn',
        message: 'Please describe how others may contribute to this project.',
        when: (contributing) => {
            if (contributing) {
                return false;
            } else {
                return true;

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
