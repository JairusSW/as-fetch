// Copyright 2020 Fastly, Inc.

// Function to check if a value is null in AS
export function isNull<T>(value: T): boolean {
  return changetype<usize>(value) == 0;
}
