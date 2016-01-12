import {env as params} from 'gulp-util';

const env = params.env || 'development';
export default env;

export var prod = () => env === 'production';
export var dev = () => env === 'development';
