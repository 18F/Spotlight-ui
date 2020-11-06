import AGENCY_BUREAU_DATA from './agency_bureau_data';

const OptionsByKey = (key) => {
    return Object.keys(AGENCY_BUREAU_DATA.reduce((acc, obj) => {
        acc[obj[key]] = null;
        return acc
    }, {})).sort().map(val => ({ label: val, value: val}));
}

export const AGENCY_OPTIONS = OptionsByKey("Agency Name");
export const BUREAU_OPTIONS = OptionsByKey("Bureau Name");
