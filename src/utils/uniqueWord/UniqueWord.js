
import {uniqueNamesGenerator, adjectives, colors, animals} from 'unique-names-generator'

const code = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '-',
        length: 3,
        style: 'lowerCase'
    }
);

export default code
