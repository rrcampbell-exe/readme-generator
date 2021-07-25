// FUNCTIONS TO GENERATE PROSPECTIVE SECTIONS OF README

const generateTableOfContents = data => {
  const outer = data.tableOfContents.reduce(function(tableLines, lineData) {
     tableLines.push(`- [${lineData}](#${lineData.toLowerCase()})`)
     return tableLines
  }, [])
  outer.push(`- [Questions, Comments, Suggestions](#questions-comments-suggestions)`)
  return outer.join("\n")
  
  // const accum = []
  // for (let i = 0; i < data.tableOfContents.length; i++) {
  // const newTableLine = `- [${data.tableOfContents[i]}](#${data.tableOfContents[i].toLowerCase()})`
  // accum.push(newTableLine)
  // }
  // accum.push(`- [Questions, Comments, Suggestions](#questions-comments-suggestions)`)
  // const tableLines = accum.join("\n")
  // return tableLines
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

const generateDevName = data => {
  const outer = data.devNames.reduce(function(tableLines, lineData) {
    tableLines.push(`- [${lineData}]`)
    return tableLines
  },[])
  return outer.join("\n")
}

const generateDevLink = data => {
  const outer = data.devLinks.reduce(function(tableLines, lineData) {
    tableLines.push(`(${lineData})`)
    return tableLines
  },[])
  return outer.join("\n")
}

const generateDevCredits = data => {
  if (!data.devNames) {
    return '';
  } else {
  
   return `
## Developed By
${generateDevName(data)}${generateDevLink(data)}`

  }

//   for (let i = 0; i < data.devCredits.length; i++) {
//     console.log(data.devCredits.length)
//     return `
// ## Developed By
// - [${data.devCredits[i].creditsDevsName}](http://www.github.com/${data.devCredits[i].creditDevsProfile})`;
//   }
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
${generateFeatures(data)}
${generateContributing(data)}
${generateLicense(data)}
${generateDevCredits(data)}

## Questions, Comments, Suggestions
Please contact [${data.contactPerson}](mailto:${data.contactEmail}) with any questions, to report any bugs, or to make any feature suggestions.
`
}

module.exports = generateMarkdown;
