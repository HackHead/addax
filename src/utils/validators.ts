import { validate as validateUUID } from 'uuid';

const isUUID = (str: any): boolean => {
    return validateUUID(str);
}

export default isUUID;