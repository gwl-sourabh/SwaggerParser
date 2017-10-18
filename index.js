var SwaggerParser = require('swagger-parser');
var fs = require("fs");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const searchTemplate = require('./templates/search');
const createTemplate = require('./templates/create');
const viewTemplate = require('./templates/view');
const updateTemplate = require('./templates/update');

let output = function(outputFileName, specifications) {
    fs.writeFileSync(outputFileName || "specs.js", "var dat = " + JSON.stringify(specifications) + "\n export default dat;");
    console.log("SUCCESSFULLY CREATED.");
    rl.close();
    process.exit();
};

rl.question('Enter YAML URL/PATH: ', (yamlpath) => {
    rl.question('Enter Template Parser Path (Leave empty if you want to use default): ', (templateParser) => {
        rl.question('Enter output file name with extension (Defaults to "specs.js"): ', (outputFileName) => {
            rl.question('Enter module name (Defaults to "specs"): ', (module) => {
                SwaggerParser.bundle(yamlpath)
                    .then(function(yamlJSON) {
                        if (templateParser) {
                            require(templateParser)(yamlJSON, function(specifications) {
                                output(outputFileName || "specs.js", specifications);
                            })
                        } else {
                            let basePath = yamlJSON.basePath;
                            let specifications = {};
                            for (let key in yamlJSON.paths) {
                                if (/_search/.test(key)) {
                                    specifications[(module || "specs") + ".search"] = searchTemplate((module || "specs"), 4, basePath + key, yamlJSON.paths[key], yamlJSON.parameters, yamlJSON["x-ui-info"]);
                                } else if (/_create/.test(key)) {
                                	specifications[(module || "specs") + ".create"] = createTemplate((module || "specs"), 4, basePath + key, yamlJSON.paths[key], yamlJSON.definitions, yamlJSON["x-ui-info"]);
                                	specifications[(module || "specs") + ".view"] = viewTemplate((module || "specs"), 4, basePath + key, yamlJSON.paths[key], yamlJSON.definitions, yamlJSON["x-ui-info"]);
                                } else if (/_update/.test(key)) {
                                	specifications[(module || "specs") + ".update"] = updateTemplate((module || "specs"), 4, basePath + key, yamlJSON.paths[key], yamlJSON.definitions, yamlJSON["x-ui-info"]);
                                }
                            }

                            output(outputFileName || "specs.js", specifications);
                        }
                    })
                    .catch(function(err) {
                        console.error(err);
                        rl.close();
                        process.exit();
                    });
            })
        })
    })
})