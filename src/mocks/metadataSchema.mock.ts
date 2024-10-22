const mock: {
    user: {
        items: Array<{
            key: string;
            private?: boolean;
            label: string;
            type: 'number' | 'text' | 'enum';
            required?: boolean;
            source?: string[];
            allowAddSource?: boolean;
        }>;
        exceptionsToRequirements: Array<{
            target: string | string[];
            rule: string;
            valid: string[];
        }>;
        formGroups: Array<{
            name: string;
            displayName: string;
            items: (string | {
                name: string;
                displayName: string;
                items: string[];
            })[];
        }>;
    };
} = {
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

export default mock;