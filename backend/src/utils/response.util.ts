export function success<T>(data: T) {
  return { success: true as const, data };
}

export function error(message: string, statusCode = 400) {
  return { success: false as const, error: message, statusCode };
}
