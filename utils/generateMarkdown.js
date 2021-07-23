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

const generateDevCredits = data => {
  if (!data.devCredits) {
    return '';
  }

  for (let i = 0; i < data.devCredits.length; i++) {
    console.log(data.devCredits.length)
    return `
## Developed By
- [${data.devCredits[i].creditsDevsName}](http://www.github.com/${data.devCredits[i].creditDevsProfile})`;
  }
}

const generateThirdPCredits = data => {
  if (!data.thirdPCredits) {
    return '';
  }

  for (let i = 0; i < data.thirdPCredits.length; i++) {
    console.log(data.thirdPCredits.length)
    return `
## Third-Party Assets
- [${data.thirdPCredits[i].creditAsset}](${data.thirdPCredits[i].creditAssetURL})`;
  }
}


// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  console.log(data);
  return `# ${data.title}

## Description
${data.description}

## Table of Contents
${generateTableOfContents(data)}
${generateInstall(data)}
${generateUsage(data)}
${generateDevCredits(data)}
${generateThirdPCredits(data)}
`
}

module.exports = generateMarkdown;
