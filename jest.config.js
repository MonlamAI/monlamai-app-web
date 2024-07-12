module.exports = {
    preset: "ts-jest",
    transform: {
        "^.+\.(ts|tsx)?$": "ts-jest",
        "^.+\.(js|jsx)$": "babel-jest",
    },   
    // testEnvironment: "jsdom",
    reporters: [
        "default",
        ["jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath": "reports/test-report.html",
            "includeFailureMsg": true,
            "includeConsoleLog": true
        }]
    ]
};
