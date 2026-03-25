const fs = require('fs');
fs.renameSync('src/app/page.tsx', 'src/app/HomeClient.tsx');

let code = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');
code = code.replace(
  'src="/Biomedical_warehouse_healthcare_202603241218.mp4"',
  'src="/hero_optimized.mp4"'
);
fs.writeFileSync('src/app/HomeClient.tsx', code);

const newPageContent = `import HomeClient from './HomeClient';

export default function Page() {
  return <HomeClient />;
}
`;
fs.writeFileSync('src/app/page.tsx', newPageContent);
