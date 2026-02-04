// cucumber.js
module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: ["features/**/*.feature"],
    dryRun: false,
    require: ["src/steps/**/*.ts", "src/support/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html" // Genera el reporte HTML requerido [cite: 11]
    ],
    parallel: 1
  }
};