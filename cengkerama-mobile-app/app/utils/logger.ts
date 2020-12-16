export function error(context: string, _error: Error) {
  console.error(`${context}: ${_error}`);
}

export function warn(context: string, message: string) {
  console.warn(`${context}: ${message}`);
}

export function log(context: string, ...rest: any[]) {
  console.log(`${context}: `, ...rest);
}
