// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')
const generateMarkdown = require("./utils/generateMarkdown")


let readmeObj = {
}

const devNameArr = []
const devLinkArr = []

const setupQuestions = [
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
        type: 'input',
        name: 'contactPerson',
        message: 'Please provide the name of the person users can contact with questions.',
        validate: contactPerson => {
            if (contactPerson) {
                return true;
            } else {
                console.log('You must enter a name.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contactEmail',
        message: "Please provide this person's email address.",
        validate: contactEmail => {
            if (contactEmail) {
                return true;
            } else {
                console.log('You must enter an email address.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'contactGitHub',
        message: "Please provide this person's GitHub username.",
        validate: contactGitHub => {
            if (contactGitHub) {
                return true;
            } else {
                console.log('You must enter a GitHub username.');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'tableOfContents',
        message: 'Which of the following sections would you like to include in your README?',
        choices: ['Installation', 'Usage', 'Credits', 'License', 'Features', 'Contributing', 'Tests'],
        when: ({ contactEmail }) => {
            if (contactEmail) {
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
        type: 'input',
        name: 'features',
        message: 'Please enter a comma-separated list of features. (eg. Feature One, Feature Two, etc.)',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Features')) {
                return true;
            } else {
                return false;

            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please describe how others may contribute to this project.',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Contributing')) {
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
        choices: ['MIT', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'The Unlicense'],
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
        name: 'tests',
        message: 'Please describe how others may test this project.',
        when: ({ tableOfContents }) => {
            if (tableOfContents.includes('Tests')) {
                return true;
            } else {
                return false;

            }
        }
    },
];

const devCreditsQuestions = [
    {
        type: 'input',
        name: 'creditsDevsName',
        message: "Please enter the name of a developer you're crediting.",
    },
    {
        type: 'input',
        name: 'creditDevsProfile',
        message: "Please enter this developer's GitHub username.",
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
                return true;
            } else {
                return false;
            }
        }
    },
]


function init() {
    return inquirer
    .prompt(setupQuestions) 
    .then(response => {
        readmeObj = response
        if(response.tableOfContents.includes('Credits')) {
            devCreditsEval()
        } else {
            const dir = './dist'
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFile(`./dist/${readmeObj.title}-README.md`, generateMarkdown(readmeObj), (err) => {
                console.log("A README for " + readmeObj.title + " has been generated! It can be retrieved from the dist folder.")
                if (err) throw err
            })
        }
    })
}

function devCreditsEval() {
    return inquirer
    .prompt(devCreditsQuestions)
    .then(devCreditsResponse => {
        devNameArr.push(devCreditsResponse.creditsDevsName)
        devLinkArr.push(devCreditsResponse.creditDevsProfile)
        readmeObj.devNames = devNameArr
        readmeObj.devLinks = devLinkArr

        if (devCreditsResponse.confirmAnotherDev) {
            devCreditsEval()
        } else {
            const dir = './dist'
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            fs.writeFile(`./dist/${readmeObj.title}-README.md`, generateMarkdown(readmeObj), (err) => {
                console.log("A README for " + readmeObj.title + " has been generated! It can be retrieved from the dist folder.")
                if (err) throw err
            })
        }

    })
}

// Function call to initialize app
init();
