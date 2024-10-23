This is only a DEMO how to convert JS to TS files

CLONE this repo

1. Go https://js2ts.com/ paste your js file
2. Convert and download the TS file
3. Put the JS and TS files under src directory
4. Execute:
 npm install
 tsc --project tsconfig.json

 NOTES:
 When mockFirebase.js is converted to mockFirebase.ts
 You must remove this code:
 {
            id: 'tenant-1',
            _collections: {
                history: [{ foo: 'bar' }, { foo: 'baz' }]
            },
            ...tenantData1
},

and

{
            id: 'notifications',
            configurations: {
                'hubSpot.sendId': {
                    testConfig: 'hubSpot.sendId',
                    value: 3
                }
            }
}

I am not an expert in JavaScript or Typescript
This is only for demo conversion
