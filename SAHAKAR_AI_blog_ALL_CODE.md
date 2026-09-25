# SAHAKAR AI blog: all code in one place

Create each file at the path shown, then follow the README section first. Folder to create: `src/assets/images/team/` (put photos there).


## `README.md`

```markdown
# SAHAKAR AI blog (Team Mitras)

Astro 5 + plain CSS + GSAP. No emojis, no invented content.

## Run
    npm install
    npm run dev        # http://localhost:4321
    npm run build

## Add images
1. Copy photos into `src/assets/images/` (team photos in `src/assets/images/team/`).
2. Team photos: name them `team-mithun`, `team-nizamudeen`, `team-kishor`, `team-pesalayel`, `team-kanishka`, `team-sakthi` (any of jpg, png, webp).
3. Hero image: `src/assets/images/hero.jpg`. Group photo: `team-group.jpg`.
4. Blog covers and gallery: edit `src/data/placements.json`.
   Gallery entry: { "file": "events/nabard-visit", "alt": "Describe the photo", "caption": "Short caption" }
   Post cover: "hardware-kiosk": "hardware/kiosk-front"
Missing files never break the build; slots without an image are hidden or show initials.

## Before publishing
- Set the real URL in `astro.config.mjs` (`site`).
- Search the posts for `TODO` comments and add the sourced efficiency number.
- Add one-line bios in `src/data/team.ts`.
```


## `package.json`

```json
{
  "name": "sahakar-ai-blog",
  "type": "module",
  "version": "1.0.0",
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": {
    "@astrojs/sitemap": "^3.2.0",
    "astro": "^5.0.0",
    "gsap": "^3.12.5"
  }
}
```


## `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Replace with your real deployed URL (needed for sitemap and canonical links)
export default defineConfig({
  site: 'https://sahakar-ai.vercel.app',
  integrations: [sitemap()],
});
```


## `tsconfig.json`

```json
{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist"] }
```


## `src/content.config.ts`

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    part: z.string(),
    order: z.number(),
    tag: z.string(),
    date: z.coerce.date(),
  }),
});

export const collections = { blog };
```


## `src/data/team.ts`

```ts
// Source: RGU authorization letter dated 22 September 2026.
// Add `bio` (one line) per member when you have it. Role is shown only when set.
export type Member = { id: string; name: string; role?: string; stream: string; year: string; bio?: string };

export const team: Member[] = [
  { id: 'mithun', name: 'Mithun Aradya', role: 'Team Leader', stream: 'B.Com IB & FS', year: '1st year' },
  { id: 'nizamudeen', name: 'Mohamed Nizamudeen J', stream: 'B.Com IB & FS', year: '2nd year' },
  { id: 'kishor', name: 'Kishor R', stream: 'B.Tech CSE', year: '1st year' },
  { id: 'pesalayel', name: 'Pesalayel D', stream: 'B.Tech ECE', year: '1st year' },
  { id: 'kanishka', name: 'Kanishka S', stream: 'B.Tech ECE', year: '1st year' },
  { id: 'sakthi', name: 'Sakthi Ajitha S', stream: 'BCA AI', year: '1st year' },
];
```


## `src/data/placements.json`

```json
{
  "hero": "hero",
  "about": "team-group",
  "team": {
    "mithun": "team/team-mithun",
    "nizamudeen": "team/team-nizamudeen",
    "kishor": "team/team-kishor",
    "pesalayel": "team/team-pesalayel",
    "kanishka": "team/team-kanishka",
    "sakthi": "team/team-sakthi"
  },
  "posts": {
    "the-problem": "",
    "introducing-sahakar-ai": "",
    "how-we-are-building": "",
    "hardware-kiosk": "",
    "software-voice-rag": ""
  },
  "gallery": []
}
```


## `src/components/Pic.astro`

```astro
---
import { Image } from 'astro:assets';

interface Props {
  name?: string;          // path under src/assets/images, extension optional
  alt: string;
  class?: string;
  width?: number;
  loading?: 'lazy' | 'eager';
  initials?: string;      // shown in a placeholder when the file is missing
  hideIfMissing?: boolean;
}
const { name = '', alt, class: cls = '', width = 900, loading = 'lazy', initials = '', hideIfMissing = false } = Astro.props;

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}',
  { eager: true }
);
const wanted = `/src/assets/images/${name.replace(/\.[^.]+$/, '')}`;
const hit = name ? Object.entries(files).find(([k]) => k.replace(/\.[^.]+$/, '') === wanted) : undefined;
---
{hit ? (
  <Image src={hit[1].default} alt={alt} width={width} class={cls} loading={loading} />
) : hideIfMissing ? null : (
  <div class:list={['ph', cls]} role="img" aria-label={alt}><span>{initials}</span></div>
)}
```


## `src/layouts/Base.astro`

```astro
---
import '../styles/global.css';

interface Props { title: string; description?: string }
const {
  title,
  description = 'SAHAKAR AI is a voice-first kiosk that helps PACS members get scheme, KCC and legal information in their own language.',
} = Astro.props;

const path = Astro.url.pathname;
const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About us' },
  { href: '/blog/', label: 'Blog' },
];
const active = (h: string) => (h === '/' ? path === '/' : path.startsWith(h));
const fullTitle = title === 'SAHAKAR AI' ? title : `${title} | SAHAKAR AI`;
const canonical = new URL(path, Astro.site);
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta name="twitter:card" content="summary" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="wrap bar">
        <a class="brand" href="/">SAHAKAR AI</a>
        <nav aria-label="Main">
          {nav.map((n) => (
            <a href={n.href} aria-current={active(n.href) ? 'page' : undefined}>{n.label}</a>
          ))}
        </nav>
      </div>
    </header>
    <main id="main"><slot /></main>
    <footer class="site-footer">
      <div class="wrap">
        <p><strong>Team Mitras</strong>, Rathinam Global University</p>
        <p>Smart India Hackathon 2026, problem statement PS26088, Ministry of Cooperation (NCCT)</p>
      </div>
    </footer>
    <script>
      import '../scripts/animations.js';
    </script>
  </body>
</html>
```


## `src/styles/global.css`

```css
:root {
  --bg: #ffffff;
  --surface: #f5f8f7;
  --ink: #17212b;
  --muted: #566472;
  --line: #dfe6e3;
  --accent: #0f6b4b;
  --tint: #e6f2ed;
  --r-lg: 20px;
  --r-md: 12px;
  --max: 1120px;
  --font: 'Figtree', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: var(--font); font-size: 1.0625rem; line-height: 1.65; }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--accent); }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
.skip { position: absolute; left: -999px; top: 8px; background: var(--ink); color: #fff; padding: 8px 14px; z-index: 20; border-radius: 8px; }
.skip:focus { left: 8px; }
.wrap { max-width: var(--max); margin: 0 auto; padding: 0 24px; }
h1, h2, h3 { line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 0.5em; }
h1 { font-size: clamp(2.2rem, 5vw, 3.6rem); font-weight: 700; }
h2 { font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; }
h3 { font-size: 1.2rem; font-weight: 700; }
p { margin: 0 0 1em; }
.lead { font-size: 1.25rem; color: var(--muted); max-width: 56ch; }

/* header and footer */
.site-header { position: sticky; top: 0; z-index: 10; background: rgba(255,255,255,.94); backdrop-filter: blur(8px); border-bottom: 1px solid var(--line); }
.bar { display: flex; align-items: center; justify-content: space-between; min-height: 64px; }
.brand { font-weight: 700; font-size: 1.15rem; color: var(--ink); text-decoration: none; letter-spacing: -0.01em; }
nav { display: flex; gap: 4px; }
nav a { color: var(--muted); text-decoration: none; padding: 8px 14px; border-radius: 999px; font-weight: 500; }
nav a:hover { background: var(--surface); color: var(--ink); }
nav a[aria-current='page'] { background: var(--tint); color: var(--accent); }
.site-footer { border-top: 1px solid var(--line); background: var(--surface); padding: 32px 0; margin-top: 96px; color: var(--muted); font-size: 0.95rem; }
.site-footer p { margin: 0 0 4px; }

/* buttons */
.actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.btn { display: inline-block; padding: 12px 24px; border-radius: 999px; font-weight: 700; text-decoration: none; border: 2px solid var(--accent); }
.btn.primary { background: var(--accent); color: #fff; }
.btn.primary:hover { background: #0b563c; border-color: #0b563c; }
.btn.ghost { color: var(--accent); background: #fff; }
.btn.ghost:hover { background: var(--tint); }

/* sections */
.section { padding: 72px 0 0; }
.section > .wrap > p.intro { color: var(--muted); max-width: 60ch; }
.hero { padding: 72px 0 24px; }
.hero .wrap { display: grid; gap: 48px; align-items: center; }
.hero:has(.hero-art img) .wrap { grid-template-columns: 1.1fr 0.9fr; }
.hero-art img { border-radius: var(--r-lg); width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 28px; }
.cols > div { border-top: 3px solid var(--accent); padding-top: 16px; }
.cols p { color: var(--muted); }
.caps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 48px; margin: 28px 0 0; }
.caps > div { padding: 18px 0; border-bottom: 1px solid var(--line); }
.caps dt { font-weight: 700; }
.caps dd { margin: 4px 0 0; color: var(--muted); }
.steps { list-style: none; counter-reset: s; margin: 28px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.steps li { counter-increment: s; background: var(--surface); border-radius: var(--r-md); padding: 20px; }
.steps li::before { content: counter(s); display: inline-grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--accent); color: #fff; font-weight: 700; margin-bottom: 12px; }
.steps strong { display: block; }
.steps span { color: var(--muted); font-size: 0.97rem; }

/* blog list */
.posts { list-style: none; margin: 28px 0 0; padding: 0; }
.posts li { border-top: 1px solid var(--line); }
.posts a.row { display: grid; grid-template-columns: 72px 1fr; gap: 20px; padding: 24px 0; text-decoration: none; color: inherit; }
.posts a.row:hover h3 { color: var(--accent); }
.part { font-weight: 700; color: var(--accent); }
.posts h3 { margin: 0 0 4px; }
.posts p { margin: 0 0 6px; color: var(--muted); }
.meta { font-size: 0.9rem; color: var(--muted); }
.tag { display: inline-block; background: var(--tint); color: var(--accent); border-radius: 999px; padding: 2px 12px; font-size: 0.85rem; font-weight: 500; margin-right: 8px; }
.page-head { padding: 64px 0 0; }

/* about */
.facts { display: flex; flex-wrap: wrap; gap: 8px 32px; margin: 24px 0 0; padding: 16px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); color: var(--muted); }
.facts b { color: var(--ink); }
.team { list-style: none; margin: 28px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.team img, .team .ph { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: var(--r-lg); }
.team h3 { margin: 14px 0 2px; font-size: 1.1rem; }
.team p { margin: 0; color: var(--muted); font-size: 0.95rem; }
.team .role { color: var(--accent); font-weight: 700; }
.ph { background: var(--tint); color: var(--accent); display: grid; place-items: center; font-size: 2.2rem; font-weight: 700; min-height: 120px; }
.group-photo { margin-top: 32px; }
.group-photo img { border-radius: var(--r-lg); width: 100%; max-height: 480px; object-fit: cover; }
.gallery { margin: 28px 0 0; padding: 0; list-style: none; columns: 3; column-gap: 16px; }
.gallery li { break-inside: avoid; margin-bottom: 16px; }
.gallery img { border-radius: var(--r-md); width: 100%; }
.gallery figcaption { font-size: 0.9rem; color: var(--muted); margin-top: 6px; }

/* post */
.post-head { max-width: 760px; margin: 0 auto; padding: 64px 24px 0; }
.post-head .lead { font-size: 1.2rem; }
.post-cover { max-width: 960px; margin: 32px auto 0; padding: 0 24px; }
.post-cover img { border-radius: var(--r-lg); width: 100%; max-height: 460px; object-fit: cover; }
.post-body { max-width: 960px; margin: 40px auto 0; padding: 0 24px; display: grid; grid-template-columns: minmax(0, 68ch) 200px; gap: 56px; justify-content: center; }
.prose h2 { margin-top: 1.8em; font-size: 1.6rem; }
.prose h3 { margin-top: 1.4em; }
.prose li { margin-bottom: 0.4em; }
.prose code { background: var(--surface); padding: 2px 6px; border-radius: 6px; font-size: 0.92em; }
.prose img { border-radius: var(--r-md); margin: 1.5em 0; }
.toc { position: sticky; top: 88px; align-self: start; font-size: 0.93rem; }
.toc b { display: block; margin-bottom: 8px; }
.toc a { display: block; color: var(--muted); text-decoration: none; padding: 4px 0 4px 12px; border-left: 2px solid var(--line); }
.toc a:hover { color: var(--accent); border-color: var(--accent); }
.pager { max-width: 960px; margin: 56px auto 0; padding: 0 24px; display: flex; justify-content: space-between; gap: 16px; }
.pager a { flex: 1; border: 1px solid var(--line); border-radius: var(--r-md); padding: 16px 20px; text-decoration: none; color: var(--ink); }
.pager a:hover { border-color: var(--accent); }
.pager small { display: block; color: var(--muted); }
.pager .next { text-align: right; }

@media (max-width: 860px) {
  .hero:has(.hero-art img) .wrap, .cols, .caps, .steps, .team { grid-template-columns: 1fr; }
  .team { grid-template-columns: repeat(2, 1fr); }
  .gallery { columns: 2; }
  .post-body { grid-template-columns: 1fr; }
  .toc { display: none; }
  .posts a.row { grid-template-columns: 1fr; gap: 4px; }
}
@media (max-width: 520px) { .team { grid-template-columns: 1fr; } .gallery { columns: 1; } .bar { flex-wrap: wrap; padding-block: 8px; } }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```


## `src/scripts/animations.js`

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

// Animations run only when the visitor has not asked for reduced motion.
mm.add('(prefers-reduced-motion: no-preference)', () => {
  // 1. One page-load sequence on the home hero
  if (document.querySelector('[data-hero]')) {
    gsap
      .timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
      .from('[data-hero] h1', { y: 24, opacity: 0 })
      .from('[data-hero] .lead, [data-hero] .actions', { y: 16, opacity: 0, stagger: 0.1 }, '-=0.4')
      .from('[data-hero] .hero-art', { opacity: 0, scale: 0.98, duration: 0.9 }, '-=0.6');
  }

  // 2. Groups marked data-stagger (visit steps, team) reveal once on scroll
  gsap.utils.toArray('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 85%', once: true },
    });
  });
});
```


## `src/pages/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import Pic from '../components/Pic.astro';
import placements from '../data/placements.json';

const posts = (await getCollection('blog')).sort((a, b) => a.data.order - b.data.order).slice(0, 3);

const problems = [
  ['Language barrier', 'Most digital government tools work only in English or Hindi, which leaves out many regional-language-speaking members.'],
  ['Literacy and access barrier', 'App-based tools assume a smartphone and digital literacy. Many PACS members have neither.'],
  ['Process delay', 'Scheme applications, KCC processing and legal queries need several visits, paperwork and available staff.'],
];
const capabilities = [
  ['Speak in your language', 'Voice input and spoken answers through Bhashini, the government speech service.'],
  ['Tap to identify', 'An NFC or RFID tap, or a PACS ID lookup, brings up the member instantly.'],
  ['Answers from verified documents', 'A local retrieval pipeline answers from PACS bylaws, KCC rules and scheme guidelines.'],
  ['Forms filled from the conversation', 'KCC and scheme application forms on the PACS admin portal are filled automatically.'],
  ['A receipt to take away', 'A printed slip with a unique application ID and QR code, plus a government SMS confirmation.'],
  ['Keeps working offline', 'A cached knowledge base covers internet outages and syncs when the connection returns.'],
];
const steps = [
  ['Tap your ID', 'NFC card or PACS ID'],
  ['Speak', 'Ask in your own language'],
  ['Get your answer', 'Spoken and on screen'],
  ['Take your receipt', 'Application ID and QR code'],
];
---
<Base title="SAHAKAR AI">
  <section class="hero" data-hero>
    <div class="wrap">
      <div>
        <h1>Government services in the member's own language.</h1>
        <p class="lead">SAHAKAR AI is a voice-first kiosk for PACS branches. A member taps an ID, speaks, and leaves with an answer and a printed receipt, without needing a smartphone or English.</p>
        <div class="actions">
          <a class="btn primary" href="/blog/">Read the blog</a>
          <a class="btn ghost" href="/about/">Meet the team</a>
        </div>
      </div>
      <div class="hero-art"><Pic name={placements.hero} alt="The SAHAKAR AI kiosk" width={1100} loading="eager" hideIfMissing /></div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>Why PACS members are left waiting</h2>
      <p class="intro">Primary Agricultural Cooperative Societies serve millions of rural members, but access to schemes, Kisan Credit Card benefits and legal guidance still depends on staff and paperwork.</p>
      <div class="cols">
        {problems.map(([t, d]) => <div><h3>{t}</h3><p>{d}</p></div>)}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>What the kiosk does</h2>
      <dl class="caps">
        {capabilities.map(([t, d]) => <div><dt>{t}</dt><dd>{d}</dd></div>)}
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>A visit, start to finish</h2>
      <ol class="steps" data-stagger>
        {steps.map(([t, d]) => <li><strong>{t}</strong><span>{d}</span></li>)}
      </ol>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2>From the blog</h2>
      <ul class="posts">
        {posts.map((p) => (
          <li><a class="row" href={`/blog/${p.id}/`}>
            <span class="part">Part {p.data.part}</span>
            <span><h3>{p.data.title}</h3><p>{p.data.summary}</p></span>
          </a></li>
        ))}
      </ul>
      <div class="actions"><a class="btn ghost" href="/blog/">All posts</a></div>
    </div>
  </section>
</Base>
```


## `src/pages/about.astro`

```astro
---
import Base from '../layouts/Base.astro';
import Pic from '../components/Pic.astro';
import { team } from '../data/team';
import placements from '../data/placements.json';

const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
const gallery = placements.gallery as { file: string; alt: string; caption?: string }[];
---
<Base title="About us" description="Team Mitras, Rathinam Global University: the students building SAHAKAR AI for Smart India Hackathon 2026.">
  <div class="wrap page-head">
    <h1>About us</h1>
    <p class="lead">We are Team Mitras, students at Rathinam Global University. We are building SAHAKAR AI so a PACS member can get scheme, KCC and legal help in their own language, at the branch, in one visit.</p>
    <div class="facts">
      <span><b>Event</b> Smart India Hackathon 2026</span>
      <span><b>Problem statement</b> PS26088</span>
      <span><b>Ministry</b> Cooperation (NCCT)</span>
    </div>
    <div class="group-photo"><Pic name={placements.about} alt="Team Mitras together" width={1400} hideIfMissing /></div>
  </div>

  <section class="section">
    <div class="wrap">
      <h2>The team</h2>
      <ul class="team" data-stagger>
        {team.map((m) => (
          <li>
            <Pic name={placements.team[m.id as keyof typeof placements.team]} alt={`Photo of ${m.name}`} width={600} initials={initials(m.name)} />
            <h3>{m.name}</h3>
            {m.role && <p class="role">{m.role}</p>}
            <p>{m.stream}, {m.year}</p>
            {m.bio && <p>{m.bio}</p>}
          </li>
        ))}
      </ul>
    </div>
  </section>

  {gallery.length > 0 && (
    <section class="section">
      <div class="wrap">
        <h2>Along the way</h2>
        <ul class="gallery">
          {gallery.map((g) => (
            <li><figure style="margin:0"><Pic name={g.file} alt={g.alt} width={700} hideIfMissing />{g.caption && <figcaption>{g.caption}</figcaption>}</figure></li>
          ))}
        </ul>
      </div>
    </section>
  )}
</Base>
```


## `src/pages/blog/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import Base from '../../layouts/Base.astro';

const posts = (await getCollection('blog')).sort((a, b) => a.data.order - b.data.order);
const minutes = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 200));
---
<Base title="Blog" description="Notes from Team Mitras on the problem, the design and the build of SAHAKAR AI.">
  <div class="wrap page-head">
    <h1>Blog</h1>
    <p class="lead">The problem we are solving and how we are building SAHAKAR AI, in reading order.</p>
    <ul class="posts">
      {posts.map((p) => (
        <li><a class="row" href={`/blog/${p.id}/`}>
          <span class="part">Part {p.data.part}</span>
          <span>
            <h3>{p.data.title}</h3>
            <p>{p.data.summary}</p>
            <span class="meta"><span class="tag">{p.data.tag}</span>{minutes(p.body)} min read</span>
          </span>
        </a></li>
      ))}
    </ul>
  </div>
</Base>
```


## `src/pages/blog/[...slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';
import Pic from '../../components/Pic.astro';
import placements from '../../data/placements.json';

export async function getStaticPaths() {
  const posts = (await getCollection('blog')).sort((a, b) => a.data.order - b.data.order);
  return posts.map((post, i) => ({
    params: { slug: post.id },
    props: { post, prev: posts[i - 1], next: posts[i + 1] },
  }));
}

const { post, prev, next } = Astro.props;
const { Content, headings } = await render(post);
const toc = headings.filter((h) => h.depth === 2);
const minutes = Math.max(1, Math.round((post.body ?? '').split(/\s+/).length / 200));
const cover = (placements.posts as Record<string, string>)[post.id];
const date = post.data.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
---
<Base title={post.data.title} description={post.data.summary}>
  <header class="post-head">
    <p class="meta"><span class="tag">{post.data.tag}</span>Part {post.data.part}, {date}, {minutes} min read</p>
    <h1>{post.data.title}</h1>
    <p class="lead">{post.data.summary}</p>
  </header>
  {cover && <div class="post-cover"><Pic name={cover} alt={post.data.title} width={1400} loading="eager" hideIfMissing /></div>}
  <div class="post-body">
    <article class="prose"><Content /></article>
    {toc.length > 0 && (
      <aside class="toc" aria-label="On this page">
        <b>On this page</b>
        {toc.map((h) => <a href={`#${h.slug}`}>{h.text}</a>)}
      </aside>
    )}
  </div>
  <nav class="pager" aria-label="More posts">
    {prev ? <a href={`/blog/${prev.id}/`}><small>Previous</small>{prev.data.title}</a> : <span></span>}
    {next ? <a class="next" href={`/blog/${next.id}/`}><small>Next</small>{next.data.title}</a> : <span></span>}
  </nav>
</Base>
```


## `src/content/blog/hardware-kiosk.md`

```markdown
---
title: "The hardware: kiosk, identity tap and receipt printer"
summary: "What is inside the SAHAKAR AI kiosk and why each part is there."
part: "3.1"
order: 4
tag: "Hardware"
date: 2026-09-24
---
The kiosk has to be simple enough for a first-time user and cheap enough to place in many branches.

## Parts

- **Compute:** Raspberry Pi 5 with 8 GB of memory.
- **Display:** 18.5 inch HD capacitive touchscreen for large, readable options alongside voice.
- **Audio:** a USB directional microphone to pick up the member over branch noise, and a speaker for spoken answers.
- **Identity:** an NFC or RFID reader so a member can tap a card for instant, personalised service.
- **Receipt:** a thermal printer that prints the application ID and QR code.
- **Enclosure:** a podium-style housing that holds everything at a comfortable standing height.

## Why a physical kiosk

A kiosk removes the smartphone from the equation. A tap replaces a login, a printed receipt replaces a form, and a voice replaces typing. Each choice lowers the literacy and device requirements for the member.

## Status

The prototype is being built on a laptop first. Hardware integration follows, and we will publish photos and results here as they are ready.
```


## `src/content/blog/how-we-are-building.md`

```markdown
---
title: "How we are building SAHAKAR AI"
summary: "The hardware, software and data choices behind the kiosk, and where the project stands."
part: "3"
order: 3
tag: "Build"
date: 2026-09-24
---
Every part of SAHAKAR AI uses technology that is already in production elsewhere in India: Bhashini for speech, Raspberry Pi kiosks, NFC and RFID identification, and thermal printing. We are integrating proven parts rather than inventing new ones.

## The three layers

**Hardware.** A Raspberry Pi 5 with a touchscreen, microphone, speaker, card reader and receipt printer inside a podium-style enclosure. Details are in [the hardware post](/blog/hardware-kiosk/).

**Software.** A Python and Flask backend, a kiosk interface, Bhashini for voice, a local retrieval database and a language model. Details are in [the software post](/blog/software-voice-rag/).

**Data.** Verified documents from the Ministry of Cooperation, NABARD and state cooperative departments, loaded as PDFs and updated centrally.

## Why central updates matter

Because answers come from a shared document set, updating that set updates every kiosk. Nobody has to retrain staff at each branch.

## Where we are

SAHAKAR AI is a Smart India Hackathon 2026 project by Team Mitras. We are building the working prototype on a laptop first and moving to Raspberry Pi hardware afterwards. Our first demo languages are Hindi, Tamil and English.

## Roadmap

Today the prototype can use an API-based language model. The goal is fully local inference on the device for complete offline independence. We also plan SMS and missed-call access for members who cannot visit a kiosk.
```


## `src/content/blog/introducing-sahakar-ai.md`

```markdown
---
title: "Introducing SAHAKAR AI: a voice-first kiosk for PACS"
summary: "A member taps an ID, speaks in their own language, and leaves with an answer and a printed receipt."
part: "2"
order: 2
tag: "Product"
date: 2026-09-24
---
SAHAKAR AI is a physical, voice-first assistant placed directly at a PACS branch. A member walks up, taps an ID, speaks in their own language, and walks away with the query resolved and a printed proof of the transaction. Routine queries need no smartphone, no English or Hindi, and no staff member.

## A visit, start to finish

1. The member taps an NFC or RFID card, or the branch looks up their PACS ID.
2. The member speaks. Speech is recognised and answered through Bhashini, the government speech service.
3. The kiosk answers from verified documents and, where needed, fills a KCC or scheme application form.
4. A thermal printer gives the member a receipt with a unique application ID and a QR code. A government SMS confirms the request.

## Core capabilities

- **Multilingual voice interaction** in regional Indian languages.
- **Identity-linked access** for personalised service.
- **Grounded answers** drawn from PACS bylaws, KCC rules and scheme guidelines, not from unverified sources.
- **Automatic form filling** on the PACS admin portal from the voice conversation.
- **Proof of interaction** with a receipt and QR code for later tracking.
- **Offline resilience** through a cached knowledge base that syncs when the internet returns.

## How it differs

Existing digital tools are built for people with smartphones. SAHAKAR AI is built for the person standing at the counter: it needs no phone, asks for little literacy, gives instant identification, and leaves a physical receipt.

<!-- TODO: add the measured comparison (manual process takes X days, SAHAKAR AI resolves it in Y minutes) once you have a sourced number. -->
```


## `src/content/blog/software-voice-rag.md`

```markdown
---
title: "The software: Bhashini voice, grounded answers and offline fallback"
summary: "How voice, retrieval and a language model work together so answers come from verified documents."
part: "3.2"
order: 5
tag: "Software"
date: 2026-09-24
---
The software has one job: turn a spoken question in any supported language into a correct answer from an official source, and act on it.

## The pipeline

1. **Speech in.** Bhashini converts the member's speech to text in their language.
2. **Retrieval.** The question is matched against a local knowledge base built from PACS bylaws, KCC rules and scheme guidelines. The base is stored in ChromaDB or SQLite.
3. **Answer.** A language model, either run locally with Ollama or reached through an API, writes a reply using only the retrieved documents.
4. **Speech out.** Bhashini converts the reply back to speech in the member's language.
5. **Action.** If the member wants to apply, the backend fills the KCC or scheme form on the PACS admin portal and prints a receipt.

## Why retrieval and not a general chatbot

A general chatbot can sound confident and be wrong. Answering only from verified government documents keeps replies consistent across every branch and lets us update knowledge by replacing a file.

## Keeping it working offline

Rural connectivity is unreliable. The kiosk keeps a cached copy of its knowledge base in SQLite. During an outage it answers from that copy and syncs once the connection is back.

## Stack

Python and Flask for the backend, a kiosk interface built with PyQt, CustomTkinter or Electron, Bhashini for voice, ChromaDB or SQLite for retrieval, and Ollama or an API-based model for responses.
```


## `src/content/blog/the-problem.md`

```markdown
---
title: "Why rural cooperative members are locked out of their own schemes"
summary: "Language, literacy and delays keep PACS members from schemes, Kisan Credit Card benefits and legal guidance they are entitled to."
part: "1"
order: 1
tag: "Problem"
date: 2026-09-24
---
Primary Agricultural Cooperative Societies (PACS) and other cooperative institutions serve millions of rural farmers and members across India. Information about schemes, Kisan Credit Card (KCC) benefits, legal guidance and cooperative governance still reaches members mostly through staff and paperwork.

## Three barriers

**Language.** Most digital government tools support only English or Hindi. A large share of rural members speak a regional language and are left out.

**Literacy and access.** App-based solutions assume a smartphone and comfort with digital tools. Many PACS members have neither.

**Delay.** Scheme applications, KCC processing and legal questions can take several physical visits, manual forms and a staff member who is free to help. This often takes days.

## What this means for a member

A farmer who wants to know if they qualify for a scheme has to travel to the branch, wait, explain the question in a language the process was not designed for, and often return another day.

<!-- TODO: add a real measured example here, such as the number of visits or days a KCC request takes today, with the source (NABARD visit or team research). Do not publish a number without a source. -->

## Where we started

We asked a simple question: what if the branch itself could answer, in the member's own language, without needing a phone? The next post introduces that idea.
```
