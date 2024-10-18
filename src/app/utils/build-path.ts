import { Path } from 'path-parser';

export function buildPath(
  pathWithParams: string,
  params: Record<string, string>
): string {
  const path = new Path(pathWithParams);
  return path.build(params);
}
