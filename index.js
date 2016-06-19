// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START server]
const Hapi = require('hapi');
const path = require('path');
const Inert = require('inert');
const uuid = require('node-uuid');


// Create a server with a host and port
var server = new Hapi.Server();

//server connection settings
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 8080,
    routes: {
        files: {
            relativeTo: path.resolve('.', 'build')
        }
    }

});





// [END server]
// Add  route
server.route([{
    method: 'GET',
    path: '/hello',
    handler: function(request, reply) {
        reply('Hello World! Hapi.js on Google App Engine.');
    }
}, {
    method: 'GET',
    path: '/uuid',
    handler: function(request, reply) {
        reply(uuid.v1());
    }
}]);
//serve static files
server.register(Inert, () => {});
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: ['index.html']
        }
    } // relativeTo: '/static/'
});

// [START server_start]
server.start(function() {
    console.log('Server running at:', server.info.uri);
});
// [END server_start]