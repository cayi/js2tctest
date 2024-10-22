"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock = {
    user: {
        items: [
            {
                key: 'favNumber',
                private: true,
                label: 'Favorite number',
                type: 'number'
            },
            {
                key: 'DUF',
                required: true,
                type: 'text',
                label: 'DUF'
            },
            {
                key: 'passport',
                required: true,
                label: 'Passport',
                type: 'text'
            },
            {
                key: 'country',
                required: true,
                label: 'Country of issue',
                type: 'enum',
                source: ['Luxemburg', 'Spain', 'Poland', 'Algeria'],
                allowAddSource: true
            }
        ],
        exceptionsToRequirements: [
            {
                target: 'DUF',
                rule: 'notRequiredIf',
                valid: ['passport', 'country']
            },
            {
                target: ['passport', 'country'],
                rule: 'notRequiredIf',
                valid: ['DUF']
            }
        ],
        formGroups: [
            {
                name: 'dufPassportGroup',
                displayName: 'DUF and Passport',
                items: [
                    'DUF',
                    {
                        name: 'passportGroup',
                        displayName: 'Passport Info',
                        items: ['passport', 'country']
                    }
                ]
            }
        ]
    }
};
exports.default = mock;
