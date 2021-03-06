import path from 'path';

export default function(args) {
    const option = {
        file: null,
        help: null,
        version: null,
        webdriver: null,
        modules: [],
        hostURI: 'playentry.org',
        hostProtocol: 'https:',
    };

    for (const argv of args) {
        if (argv === '--version' || argv === '-v') {
            option.version = true;
            break;
        } else if (argv.startsWith('--app')) {
            const value = argv.split('=')[1];
            if (_isValidProjectFilePath(value)) {
                option.file = value;
            }
        } else if (argv === '--debug' || argv === '-d') {
            option.debug = true;
        } else if (argv.startsWith('--host') || argv.startsWith('-h')) {
            option.hostURI = argv.split('=')[1];
        } else if (argv.startsWith('--protocol') || argv.startsWith('-p')) {
            option.hostProtocol = argv.split('=')[1];
        } else {
            if (_isValidProjectFilePath(argv)) {
                option.file = argv;
                break;
            }
        }
    }
    return option;
}

const _isValidProjectFilePath = function(filePath) {
    return path.isAbsolute(filePath) && path.extname(filePath) === '.ent';
};
