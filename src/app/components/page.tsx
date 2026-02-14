import fs from 'fs';
import path from 'path';
import { loadNavigation } from '@/config/navigationLoader';
import DashboardLayout from './DashboardLayout';

function readComponentSource(componentPath: string): string {
  try {
    const filePath = path.join(
      process.cwd(),
      'src',
      'components',
      componentPath,
      `${componentPath}.tsx`
    );
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return `// Source file not found for: ${componentPath}`;
  }
}

export default function Page() {
  const navigation = loadNavigation();

  const sourceMap: Record<string, string> = {};
  for (const category of navigation) {
    for (const item of category.items) {
      if (item.componentPath && !(item.componentPath in sourceMap)) {
        sourceMap[item.componentPath] = readComponentSource(item.componentPath);
      }
    }
  }

  return <DashboardLayout sourceMap={sourceMap} />;
}