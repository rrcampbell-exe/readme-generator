// FUNCTIONS TO GENERATE PROSPECTIVE SECTIONS OF README

const generateTableOfContents = data => {
  const outer = data.tableOfContents.reduce(function(tableLines, lineData) {
     tableLines.push(`- [${lineData}](#${lineData.toLowerCase()})`)
     return tableLines
  }, [])
  outer.push(`- [Questions, Comments, Suggestions](#questions-comments-suggestions)`)
  return outer.join("\n")
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
  if (!data.devNames) {
    return '';
  } else {

    const accum = []
    for (let i = 0; i < data.devNames.length; i++) {
    const newTableLine = `- [${data.devNames[i]}](https://www.github.com/${data.devLinks[i]}/)`
    accum.push(newTableLine)
    }
    const tableLines = accum.join("\n")
    return `
## Developed By
${tableLines}`;
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
  const outer = featuresArr.reduce(function(tableLines, lineData) {
    tableLines.push(`${lineData}`)
    return tableLines
 }, [])
 return `
 ## Features
 - ${outer.join("\n - ")}`
}

const generateContributing = data => {
  if (!data.contributing) {
    return ''
  }
  return `
## Contributing
${data.contributing}`
}

const generateTests = data => {
  if (!data.tests) {
    return ''
  }
  return `
## Tests
${data.tests}`
}


// GENERATE FINAL LAYOUT OF README
function generateMarkdown(data) {
  return `# ${data.title}
${generateLicenseBadge(data)}

## Description
${data.description}

## Table of Contents
${generateTableOfContents(data)}
${generateInstall(data)}
${generateUsage(data)}
${generateFeatures(data)}
${generateContributing(data)}
${generateTests(data)}
${generateLicense(data)}
${generateDevCredits(data)}

## Questions, Comments, Suggestions
Please email [${data.contactPerson}](mailto:${data.contactEmail}) with any questions, to report any bugs, or to make any feature suggestions. You can also [contact ${data.contactPerson} on GitHub](https://www.github.com/${data.contactGitHub}/).
`
}

module.exports = generateMarkdown;
