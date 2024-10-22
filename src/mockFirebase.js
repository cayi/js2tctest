"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantData1 = void 0;
exports.getMockFirestore = getMockFirestore;
const firestore_1 = require("@google-cloud/firestore");
const metadataSchema_mock_js_1 = __importDefault(require("./mocks/metadataSchema.mock.js"));
exports.tenantData1 = {
    configurations: {
        testConfig: {
            value: {
                testName: 'test'
            }
        }
    },
    featureFlags: {
        ffOne: {
            value: true
        }
    },
    ltiPlatforms: {
        ltiPlat: {
            audience: 'https://test-server.org',
            id: 'ltiPlat',
            name: 'Test Platform',
            oauth2AccessTokenUrl: 'https://oauth2AccessTokenUrl.org/oauth',
            oidcAuthenticationUrl: 'https://oauth2AccessTokenUrl.org/oidc'
        }
    },
    ltiRegistrations: {
        ltiReg: {
            clientId: 'deliver-test1',
            clientSecret: 'client_secret-1',
            deploymentIds: ['1'],
            id: 'ltiReg',
            platformId: 'deliver-platform',
            platformJwksUrl: 'https://test-auth.org/jwks/jwks.json',
            platformKeyChain: {},
            toolId: 'devkit-tool',
            toolJwksUrl: 'https://test-auth.org/jwks/toolSet.json',
            toolKeyChain: {}
        }
    },
    ltiTools: {
        testTool: {
            audience: 'https://test-host.org',
            deepLinkingUrl: 'https://deeplink.org/api/v1/deep-links',
            id: 'testTool',
            isInternal: true,
            launchUrl: 'https://launch.org/api/v1/auth/launch',
            name: 'Test runner',
            oidcInitiationUrl: 'https://launch.org/initiation'
        }
    },
    oauth2Clients: {
        testy: {
            client: {
                id: 'testId',
                secret: '$secret-admin',
                isConfidential: true,
                scopes: ['admin'],
                users: []
            },
            clientId: 'testy',
            name: 'Test admin'
        }
    },
    ssoProviders: {
        testProvider: {
            providerId: 'testProvider',
            clientId: 'clientId',
            clientSecret: '$clientSecret',
            discoveryUrl: 'discoveryUrl',
            redirectUrl: 'redirectUrl',
            scopes: ['scope'],
            userIdPath: '$["https://userId.path"]',
            isConfidential: true,
            createIfNotExists: false
        }
    },
    meta: {
        tenantId: '1',
        name: 'test tenant'
    },
    metadataSchemas: metadataSchema_mock_js_1.default
};
const collections = {
    'environment-management': [
        {
            id: 'environment',
            configurations: {
                'test-#tenantId#': {
                    value: {
                        testName: 'test'
                    }
                }
            },
            featureFlags: {
                ffOne: {
                    value: false,
                    description: 'feature flag description'
                }
            },
            ssoProviders: {
                testProvider: {
                    providerId: 'testProvider',
                    clientId: 'clientId',
                    clientSecret: '$clientSecret',
                    discoveryUrl: 'discoveryUrl',
                    redirectUrl: 'redirectUrl',
                    scopes: ['scope'],
                    userIdPath: '$["https://userId.path"]',
                    isConfidential: true,
                    createIfNotExists: false
                }
            },
            rolePermissions: {
                ADMIN: {
                    name: 'ADMIN',
                    permissions: [
                        {
                            resource: 'portal.content-bank',
                            scopes: ['view']
                        },
                        {
                            resource: 'portal.dashboard',
                            scopes: ['view']
                        }
                    ]
                }
            }
        },
    ]
};
if (process.env.NODE_ENV === 'test') {
    const mockGoogleCloudFirestore = require('firestore-jest-mock').mockGoogleCloudFirestore;
    mockGoogleCloudFirestore({
        database: {
            testEnv: [
                {
                    id: 'stores',
                    _collections: collections
                }
            ]
        }
    });
}
function getMockFirestore() {
    return new firestore_1.Firestore();
}
