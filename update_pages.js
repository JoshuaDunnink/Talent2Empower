const fs = require('fs');

const mappings = [
  { proto: 'stitch_talent2empower_website_redesign/talent2empower_home/code.html', target: 'src/pages/index.astro' },
  { proto: 'stitch_talent2empower_website_redesign/voor_ouders_talent2empower/code.html', target: 'src/pages/voor-ouders.astro' },
  { proto: 'stitch_talent2empower_website_redesign/voor_scholen_talent2empower/code.html', target: 'src/pages/voor-scholen.astro' },
  { proto: 'stitch_talent2empower_website_redesign/voor_sportverenigingen_talent2empower/code.html', target: 'src/pages/voor-sportverenigingen.astro' }
];

for (const map of mappings) {
  if (fs.existsSync(map.proto)) {
    const html = fs.readFileSync(map.proto, 'utf8');
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (mainMatch) {
      const mainContent = mainMatch[1];
      let astro = fs.readFileSync(map.target, 'utf8');
      astro = astro.replace(/(<BaseLayout[^>]*>)[\s\S]*?(<\/BaseLayout>)/, '\\n' + mainContent + '\n\');
      fs.writeFileSync(map.target, astro);
      console.log('Updated ' + map.target);
    }
  }
}
