// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')
const generateMarkdown = require("./utils/generateMarkdown")
let readmeObj = {
}

const devCreditsArr = []
const thirdPArr = []


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

const thirdPQuestions = [
    {
        type: 'input',
        name: 'creditAsset',
        message: "Please enter the name of any third-party asset you'd like to credit. If no credits are required for third-party assets, press ENTER.",
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
        console.log(response)
        readmeObj = response
        if(response.tableOfContents.includes('Credits')) {
            devCreditsEval()
        } else {
            fs.writeFile(`./dist/${readmeObj.title}-README.md`, generateMarkdown(readmeObj), (err) => {
                console.log("README generated!")
                if (err) throw err
            })
        }
    })
}

function devCreditsEval() {
    return inquirer
    .prompt(devCreditsQuestions)
    .then(devCreditsResponse => {
        console.log(devCreditsResponse)
        devCreditsArr.push(devCreditsResponse)
        console.log(devCreditsArr)
        readmeObj.devCredits = devCreditsArr
        console.log(readmeObj)

        if (devCreditsResponse.confirmAnotherDev) {
            devCreditsEval()
        } else {
            thirdPEval();
        }

    })
}

function thirdPEval() {
    return inquirer
    .prompt(thirdPQuestions)
    .then(thirdPResponse => {
        console.log(thirdPResponse)
        thirdPArr.push(thirdPResponse)
        console.log(thirdPArr)
        readmeObj.thirdPCredits = thirdPArr
        console.log(readmeObj)

        if (thirdPResponse.confirmThirdParty) {
            thirdPEval()
        } else {
            fs.writeFile(`./dist/${readmeObj.title}-README.md`, generateMarkdown(readmeObj), (err) => {
                console.log("README generated!")
                if (err) throw err
            })
        }
    })
}

// Function call to initialize app
init();
