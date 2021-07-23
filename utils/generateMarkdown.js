// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) { }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

const generateTableOfContents = data => {
  for (let i = 0; i < data.tableOfContents.length; i++) {
    console.log(data.tableOfContents.length)
    return `- [${data.tableOfContents[i]}](#${data.tableOfContents[i]})`;
  }
}

const generateInstall = data => {
  if (!data.tableOfContents.includes('Installation')) {
    return '';
  }

  return `
## Installation

${data.installation}`
}

const generateUsage = data => {
  if (!data.tableOfContents.includes('Usage')) {
    return '';
  }

  return `
## Usage

${data.usage}`
}

const generateDevCredits = devCreditsArr => {
  for (let i = 0; i < devCreditsArr.length; i++) {
    console.log(devCreditsArr.length)
    return `
    ## Developed By
    - [${data.creditsDevsName[i]}](#${data.creditsDevsProfile[i]})`;
  }
}


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

## Description
${data.description}

## Table of Contents

${generateTableOfContents(data)}

${generateInstall(data)}

${generateUsage(data)}

${generateDevCredits(data)}
`
}

module.exports = generateMarkdown;
