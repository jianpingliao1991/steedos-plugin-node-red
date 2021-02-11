const express = require('express');
const path = require('path');
var RED = require("node-red");

exports.init = function (steedos) {

    var server = WebApp.httpServer;
    var app = steedos.app;

    var settings = {
        credentialSecret: "3b905ca2dbb6921f3c98a21eeb0e3ef1bWs",
        httpAdminRoot:"/node-red/admin/",
        httpNodeRoot: "/node-red/",
        userDir: path.join(process.cwd(), "node-red"),
        flowFile: path.join("flows.json"),
        functionGlobalContext: {
            node_red: {
                _id: 'default'
            },
            tenant: {
                _id: "default",
                name: "Steedos"
            }
        },    // enables global context
        editorTheme: {
            page: {
                title: "Steedos Flow Builder",
                // favicon: "/absolute/path/to/theme/icon",
                // css: "/absolute/path/to/custom/css/file",
                // scripts: [ "/absolute/path/to/custom/script/file", "/another/script/file"]
            },
            header: {
                title: "Steedos Flow Builder",
                image: "/images/logo.png", // or null to remove image
                url: "/" // optional url to make the header text/image a link to this url
            },
            projects: {
                enabled: false // Enable the projects feature
            }
        }
    };

    // Initialise the runtime with a server and settings
    RED.init(server,settings);

    // Serve the editor UI from /red
    app.use(settings.httpAdminRoot,RED.httpAdmin);

    // Serve the http nodes UI from /api
    app.use(settings.httpNodeRoot,RED.httpNode);


    // Start the runtime
    RED.start();

}