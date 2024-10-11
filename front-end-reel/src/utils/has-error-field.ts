export function hasErrorField(
  err: unknown
): err is { data: { message: string; error: string } } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'message' in err.data &&
    'error' in err.data
  )
}
