import { Firestore } from '@google-cloud/firestore';
import metadataSchemaMock from './mocks/metadataSchema.mock.js';

export interface TenantData {
    configurations: {
        [key: string]: {
            value: {
                testName: string;
            };
        };
    };
    featureFlags: {
        [key: string]: {
            value: boolean;
        };
    };
    ltiPlatforms: {
        [key: string]: {
            audience: string;
            id: string;
            name: string;
            oauth2AccessTokenUrl: string;
            oidcAuthenticationUrl: string;
        };
    };
    ltiRegistrations: {
        [key: string]: {
            clientId: string;
            clientSecret: string;
            deploymentIds: string[];
            id: string;
            platformId: string;
            platformJwksUrl: string;
            platformKeyChain: object;
            toolId: string;
            toolJwksUrl: string;
            toolKeyChain: object;
        };
    };
    ltiTools: {
        [key: string]: {
            audience: string;
            deepLinkingUrl: string;
            id: string;
            isInternal: boolean;
            launchUrl: string;
            name: string;
            oidcInitiationUrl: string;
        };
    };
    oauth2Clients: {
        [key: string]: {
            client: {
                id: string;
                secret: string;
                isConfidential: boolean;
                scopes: string[];
                users: any[];
            };
            clientId: string;
            name: string;
        };
    };
    ssoProviders: {
        [key: string]: {
            providerId: string;
            clientId: string;
            clientSecret: string;
            discoveryUrl: string;
            redirectUrl: string;
            scopes: string[];
            userIdPath: string;
            isConfidential: boolean;
            createIfNotExists: boolean;
        };
    };
    meta: {
        tenantId: string;
        name: string;
    };
    metadataSchemas: any;
}
export const tenantData1: TenantData = {
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
    metadataSchemas: metadataSchemaMock
};
interface Collection {
    id: string;
    configurations: {
        [key: string]: {
            value: {
                testName: string;
            };
        };
    };
    featureFlags: {
        [key: string]: {
            value: boolean;
            description: string;
        };
    };
    ssoProviders: {
        [key: string]: {
            providerId: string;
            clientId: string;
            clientSecret: string;
            discoveryUrl: string;
            redirectUrl: string;
            scopes: string[];
            userIdPath: string;
            isConfidential: boolean;
            createIfNotExists: boolean;
        };
    };
    rolePermissions: {
        [key: string]: {
            name: string;
            permissions: {
                resource: string;
                scopes: string[];
            }[];
        };
    };
    _collections?: {
        history: { foo: string }[];
    };
}

interface Collections {
    [key: string]: Collection[];
}

const collections: Collections = {
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

export function getMockFirestore(): Firestore {
    return new Firestore();
}
