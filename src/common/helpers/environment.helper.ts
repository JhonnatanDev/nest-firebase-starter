/**
 * 
 */
export const isLocal = ():boolean => process.env.NODE_ENV === 'localdev';

/**
 * 
 */
export const isDev = ():boolean => process.env.NODE_ENV === 'development';

/**
 * 
 */
export const isStage = ():boolean => process.env.NODE_ENV === 'staging';

/**
 * 
 */
export const isPreprod = ():boolean => process.env.NODE_ENV === 'preproduction';

/**
 * 
 */
export const isProd = ():boolean => process.env.NODE_ENV === 'production';

/**
 * 
 */
 export const getEnvPrefix = ():string => `[${process.env.NODE_ENV.toUpperCase()}]`;

 export const enum EnvVariablesEnum {
  PROJECT_ID = 'PROJECT_ID',
  LOCAL_FIRESTORE_HOST = 'LOCAL_FIRESTORE_HOST',
  KEY_FILE_NAME = 'KEY_FILE_NAME'
 }