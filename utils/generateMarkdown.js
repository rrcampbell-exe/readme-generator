// FUNCTIONS TO GENERATE PROSPECTIVE SECTIONS OF README

const generateTableOfContents = data => {
  for (let i = 0; i < data.tableOfContents.length; i++) {
    return `- [${data.tableOfContents[i]}](#${data.tableOfContents[i].toLowerCase()})
- [Questions, Comments, Suggestions](#questions-comments-suggestions)`;
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

const generateLicenseBadge = data => {
  if (!data.tableOfContents.includes('License')) {
    return '';
  }
  let licenseURL = data.license.replace(" ", "%20")
  return `
[![license-${licenseURL}-blue.png](https://img.shields.io/badge/license-${licenseURL}-blue)](#License)`
}

const generateLicense = data => {
  if (!data.tableOfContents.includes('License')) {
    return ''
  }

  return `
## License
This application is covered under the ${data.license} license.`
}

const generateFeatures = data => {
  if (!data.features) {
    return '';
  }
  let featuresArr = data.features.split(', ')
  console.log(data.features)
  for (let i = 0; i < featuresArr.length; i++) {
    return `
## Features
- ${featuresArr[i]}`;
  }
}

const generateContributing = data => {
  if (!data.contributing) {
    return ''
  }
  return `
## Contributing
${data.contributing}
`
}


// GENERATE FINAL LAYOUT OF README
function generateMarkdown(data) {
  console.log(data);
  return `# ${data.title}
${generateLicenseBadge(data)}

## Description
${data.description}

## Table of Contents
${generateTableOfContents(data)}
${generateInstall(data)}
${generateUsage(data)}
${generateDevCredits(data)}
${generateThirdPCredits(data)}
## Questions, Comments, Suggestions
Please contact [${data.contactPerson}](mailto:${data.contactEmail}) with any questions, to report any bugs, or to make any feature suggestions.
${generateFeatures(data)}
${generateContributing(data)}
${generateLicense(data)}
`
}

module.exports = generateMarkdown;
