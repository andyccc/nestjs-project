


import * as dev from './dev.env';
import * as prod from './prod.env';


const envconfigs = {
    development: dev,
    production: prod,
};

const environment = envconfigs[process.env.NODE_ENV || 'development']

export { environment };
