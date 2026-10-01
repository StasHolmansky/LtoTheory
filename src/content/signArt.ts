const RED = '#D0121A';
const BLUE = '#005EB8';
const YELLOW = '#F5C400';
const GREEN = '#0C7A3A';
const BLACK = '#1A1A1A';
const WHITE = '#FFFFFF';
const ROAD = '#4B5563';
const ORANGE = '#F5A000';
const FONT = 'Helvetica, Arial, sans-serif';

function svg(body: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${body}</svg>`;
}

function disc(inner: string): string {
  return svg(`<circle cx="50" cy="50" r="46" fill="${BLUE}"/>${inner}`);
}

function ring(inner: string): string {
  return svg(
    `<circle cx="50" cy="50" r="46" fill="${WHITE}" stroke="${RED}" stroke-width="8"/>${inner}`,
  );
}

function banned(inner: string): string {
  return ring(
    `${inner}<line x1="22" y1="78" x2="78" y2="22" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`,
  );
}

function triangle(icon: string): string {
  return svg(
    `<polygon points="50,5 96,90 4,90" fill="${WHITE}" stroke="${RED}" stroke-width="6" stroke-linejoin="round"/>` +
      `<g transform="translate(50 62) scale(0.42) translate(-50 -50)">${icon}</g>`,
  );
}

function diamond(icon: string): string {
  return svg(
    `<polygon points="50,3 97,50 50,97 3,50" fill="${YELLOW}" stroke="${BLACK}" stroke-width="4" stroke-linejoin="round"/>` +
      `<g transform="translate(50 52) scale(0.48) translate(-50 -50)">${icon}</g>`,
  );
}

function upArrow(fill: string): string {
  return `<polygon points="50,14 72,40 61,40 61,84 39,84 39,40 28,40" fill="${fill}"/>`;
}

function leftArrow(fill: string): string {
  return `<polygon points="14,50 40,28 40,39 84,39 84,61 40,61 40,72" fill="${fill}"/>`;
}

function rightArrow(fill: string): string {
  return `<polygon points="86,50 60,28 60,39 16,39 16,61 60,61 60,72" fill="${fill}"/>`;
}

const pedestrian =
  `<circle cx="50" cy="22" r="9" fill="${BLACK}"/>` +
  `<path d="M50 32 V58 M28 44 H72 M50 58 L32 84 M50 58 L68 84" stroke="${BLACK}" stroke-width="7" stroke-linecap="round" fill="none"/>`;

const bicycle =
  `<circle cx="28" cy="68" r="16" fill="none" stroke="${BLACK}" stroke-width="6"/>` +
  `<circle cx="74" cy="68" r="16" fill="none" stroke="${BLACK}" stroke-width="6"/>` +
  `<path d="M28 68 L46 40 H66 L74 68 M46 40 L58 68 H40" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linejoin="round"/>` +
  `<path d="M66 40 L78 28 H88" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;

const wheelchair =
  `<circle cx="62" cy="24" r="8" fill="${BLACK}"/>` +
  `<path d="M62 34 V52 H40" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<circle cx="40" cy="68" r="18" fill="none" stroke="${BLACK}" stroke-width="6"/>` +
  `<circle cx="78" cy="74" r="7" fill="none" stroke="${BLACK}" stroke-width="6"/>` +
  `<path d="M40 52 H70 L78 67" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;

const truck =
  `<rect x="8" y="36" width="50" height="28" rx="3" fill="${BLACK}"/>` +
  `<path d="M58 48 H78 L90 62 V64 H58 Z" fill="${BLACK}"/>` +
  `<circle cx="28" cy="72" r="8" fill="${BLACK}"/>` +
  `<circle cx="74" cy="72" r="8" fill="${BLACK}"/>` +
  `<circle cx="28" cy="72" r="3" fill="${WHITE}"/>` +
  `<circle cx="74" cy="72" r="3" fill="${WHITE}"/>`;

function curve(direction: 'left' | 'right', sharp: boolean): string {
  if (sharp) {
    if (direction === 'left') {
      return (
        `<path d="M72 84 V50 H44" stroke="${BLACK}" stroke-width="10" fill="none" stroke-linejoin="round"/>` +
        `<polygon points="22,50 46,34 46,66" fill="${BLACK}"/>`
      );
    }
    return (
      `<path d="M28 84 V50 H56" stroke="${BLACK}" stroke-width="10" fill="none" stroke-linejoin="round"/>` +
      `<polygon points="78,50 54,34 54,66" fill="${BLACK}"/>`
    );
  }
  const path =
    direction === 'left'
      ? 'M68 82 V62 C68 46 46 46 40 30'
      : 'M32 82 V62 C32 46 54 46 60 30';
  const head =
    direction === 'left'
      ? `<polygon points="28,32 46,20 46,44" fill="${BLACK}"/>`
      : `<polygon points="72,32 54,20 54,44" fill="${BLACK}"/>`;
  return `<path d="${path}" stroke="${BLACK}" stroke-width="9" fill="none" stroke-linecap="round"/>${head}`;
}

const winding =
  `<path d="M34 86 C62 74 34 62 58 50 C78 40 40 30 52 16" stroke="${BLACK}" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<polygon points="42,14 58,6 56,24" fill="${BLACK}"/>`;

const crossroads =
  `<rect x="42" y="10" width="16" height="80" rx="3" fill="${BLACK}"/>` +
  `<rect x="10" y="42" width="80" height="16" rx="3" fill="${BLACK}"/>`;

const sideLeft =
  `<rect x="54" y="8" width="16" height="84" rx="3" fill="${BLACK}"/>` +
  `<rect x="8" y="42" width="46" height="16" rx="3" fill="${BLACK}"/>`;

const sideRight =
  `<rect x="30" y="8" width="16" height="84" rx="3" fill="${BLACK}"/>` +
  `<rect x="46" y="42" width="46" height="16" rx="3" fill="${BLACK}"/>`;

const tee =
  `<rect x="10" y="28" width="80" height="16" rx="3" fill="${BLACK}"/>` +
  `<rect x="42" y="28" width="16" height="62" rx="3" fill="${BLACK}"/>`;

const roundabout =
  `<circle cx="50" cy="50" r="26" fill="none" stroke="${BLACK}" stroke-width="8"/>` +
  `<polygon points="74,28 90,42 68,46" fill="${BLACK}"/>`;

const signal =
  `<rect x="34" y="8" width="32" height="84" rx="8" fill="${BLACK}"/>` +
  `<circle cx="50" cy="28" r="9" fill="#E23B2F"/>` +
  `<circle cx="50" cy="50" r="9" fill="${YELLOW}"/>` +
  `<circle cx="50" cy="72" r="9" fill="#22A34A"/>`;

const slippery =
  `<rect x="24" y="36" width="40" height="18" rx="4" fill="${BLACK}"/>` +
  `<circle cx="34" cy="58" r="6" fill="${BLACK}"/>` +
  `<circle cx="56" cy="58" r="6" fill="${BLACK}"/>` +
  `<path d="M16 78 Q40 58 62 74 T90 62" stroke="${BLACK}" stroke-width="5" fill="none" stroke-linecap="round"/>`;

const hump =
  `<path d="M8 66 H28 Q50 18 72 66 H92" stroke="${BLACK}" stroke-width="8" fill="none" stroke-linecap="round"/>`;

const rocks =
  `<path d="M14 80 L48 28 L78 80" stroke="${BLACK}" stroke-width="7" fill="none" stroke-linejoin="round"/>` +
  `<rect x="58" y="18" width="14" height="14" rx="2" transform="rotate(18 65 25)" fill="${BLACK}"/>` +
  `<rect x="36" y="46" width="12" height="12" rx="2" transform="rotate(-12 42 52)" fill="${BLACK}"/>`;

const narrows =
  `<path d="M18 86 L38 16 M82 86 L62 16" stroke="${BLACK}" stroke-width="8" fill="none" stroke-linecap="round"/>`;

const bridge =
  `<path d="M16 72 L34 36 H66 L84 72" stroke="${BLACK}" stroke-width="8" fill="none" stroke-linejoin="round"/>` +
  `<path d="M34 36 H66" stroke="${BLACK}" stroke-width="8"/>`;

const twoWayArrows =
  `<polygon points="32,12 46,32 39,32 39,88 25,88 25,32 18,32" fill="${BLACK}"/>` +
  `<polygon points="68,88 54,68 61,68 61,12 75,12 75,68 82,68" fill="${BLACK}"/>`;

const descent =
  `<path d="M16 24 L16 78 H84" stroke="${BLACK}" stroke-width="7" fill="none" stroke-linejoin="round"/>` +
  `<path d="M16 24 L84 78" stroke="${BLACK}" stroke-width="7" fill="none"/>` +
  `<rect x="40" y="46" width="22" height="12" rx="2" transform="rotate(32 51 52)" fill="${BLACK}"/>`;

const animal =
  `<ellipse cx="46" cy="46" rx="24" ry="14" fill="${BLACK}"/>` +
  `<circle cx="72" cy="38" r="10" fill="${BLACK}"/>` +
  `<rect x="24" y="56" width="6" height="20" rx="2" fill="${BLACK}"/>` +
  `<rect x="38" y="56" width="6" height="20" rx="2" fill="${BLACK}"/>` +
  `<rect x="52" y="56" width="6" height="20" rx="2" fill="${BLACK}"/>` +
  `<rect x="64" y="54" width="6" height="20" rx="2" fill="${BLACK}"/>`;

const flood =
  `<path d="M12 36 Q28 24 44 36 T76 36 T92 28" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<path d="M12 54 Q28 42 44 54 T76 54 T92 46" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<path d="M12 72 Q28 60 44 72 T76 72 T92 64" stroke="${BLACK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;

const rail =
  `<path d="M22 22 L78 78 M78 22 L22 78" stroke="${BLACK}" stroke-width="10" stroke-linecap="round"/>`;

const worker =
  `<circle cx="42" cy="20" r="9" fill="${BLACK}"/>` +
  `<path d="M42 30 V58 M42 40 L24 52 M42 40 L66 28 L78 48" stroke="${BLACK}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<path d="M42 58 L28 84 M42 58 L58 84" stroke="${BLACK}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<rect x="74" y="22" width="6" height="36" rx="1" fill="${BLACK}"/>`;

function label(text: string, size: number, y: number, fill = BLACK): string {
  return `<text x="50" y="${y}" text-anchor="middle" font-family="${FONT}" font-size="${size}" font-weight="700" fill="${fill}">${text}</text>`;
}

function road(inner: string): string {
  return svg(`<rect width="100" height="100" fill="${ROAD}"/>${inner}`);
}

function dashes(x: number, fill: string): string {
  return [8, 28, 48, 68, 88]
    .map(y => `<rect x="${x}" y="${y}" width="5" height="12" rx="1" fill="${fill}"/>`)
    .join('');
}

const servicePlate = (icon: string) =>
  svg(`<rect x="8" y="8" width="84" height="84" rx="14" fill="${BLUE}"/>${icon}`);

export const signSvgs: Record<string, string> = {
  'dir-straight': disc(upArrow(WHITE)),
  'dir-left': disc(leftArrow(WHITE)),
  'dir-right': disc(rightArrow(WHITE)),
  'dir-left-ahead': disc(
    `<path d="M62 84 V48 H40" stroke="${WHITE}" stroke-width="14" fill="none" stroke-linejoin="round"/>` +
      `<polygon points="18,48 42,32 42,64" fill="${WHITE}"/>`,
  ),
  'dir-right-ahead': disc(
    `<path d="M38 84 V48 H60" stroke="${WHITE}" stroke-width="14" fill="none" stroke-linejoin="round"/>` +
      `<polygon points="82,48 58,32 58,64" fill="${WHITE}"/>`,
  ),
  'dir-keep-left': disc(
    `<circle cx="70" cy="46" r="7" fill="${WHITE}" opacity="0.45"/>` +
      `<polygon points="34,16 34,58 22,58 44,82 66,58 54,58 54,16" fill="${WHITE}"/>`,
  ),
  'dir-keep-right': disc(
    `<circle cx="30" cy="46" r="7" fill="${WHITE}" opacity="0.45"/>` +
      `<polygon points="66,16 66,58 78,58 56,82 34,58 46,58 46,16" fill="${WHITE}"/>`,
  ),
  'dir-either': disc(
    `<path d="M50 84 V52" stroke="${WHITE}" stroke-width="12" stroke-linecap="round"/>` +
      `<polygon points="16,52 40,30 40,52" fill="${WHITE}"/>` +
      `<polygon points="84,52 60,30 60,52" fill="${WHITE}"/>` +
      `<rect x="40" y="46" width="20" height="12" fill="${WHITE}"/>`,
  ),
  'dir-one-way': svg(
    `<rect x="6" y="28" width="88" height="44" rx="6" fill="${BLACK}"/>${rightArrow(WHITE)}`,
  ),
  'dir-two-way': svg(
    `<rect x="18" y="8" width="64" height="84" rx="8" fill="${WHITE}" stroke="${BLACK}" stroke-width="4"/>` +
      `<polygon points="40,18 50,32 45,32 45,78 35,78 35,32 30,32" fill="${BLACK}"/>` +
      `<polygon points="60,82 50,68 55,68 55,22 65,22 65,68 70,68" fill="${BLACK}"/>`,
  ),
  'pri-stop': svg(
    `<polygon points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30" fill="${RED}"/>` +
      label('STOP', 18, 56, WHITE),
  ),
  'pri-give-way': svg(
    `<polygon points="50,92 6,14 94,14" fill="${WHITE}" stroke="${RED}" stroke-width="7" stroke-linejoin="round"/>` +
      `<text x="50" y="42" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${BLACK}">GIVE</text>` +
      `<text x="50" y="58" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${BLACK}">WAY</text>`,
  ),
  'pri-left-give': svg(
    `<rect x="8" y="8" width="84" height="84" rx="8" fill="${WHITE}" stroke="${BLACK}" stroke-width="4"/>` +
      `<path d="M58 18 V82" stroke="${BLACK}" stroke-width="6" stroke-linecap="round"/>` +
      `<polygon points="58,78 50,64 66,64" fill="${BLACK}"/>` +
      `<path d="M36 78 V48 H18" stroke="${RED}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<polygon points="16,48 30,40 30,56" fill="${RED}"/>`,
  ),
  'park-no': svg(
    `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${RED}" stroke-width="8"/>` +
      `<line x1="24" y1="76" x2="76" y2="24" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`,
  ),
  'park-no-stop': svg(
    `<circle cx="50" cy="50" r="46" fill="${BLUE}" stroke="${RED}" stroke-width="8"/>` +
      `<line x1="24" y1="76" x2="76" y2="24" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>` +
      `<line x1="24" y1="24" x2="76" y2="76" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`,
  ),
  'park-allowed': svg(
    `<rect x="10" y="10" width="80" height="80" rx="10" fill="${BLUE}"/>` + label('P', 52, 68, WHITE),
  ),
  'park-loading': svg(
    `<rect x="6" y="18" width="88" height="64" rx="8" fill="${BLUE}"/>` +
      `<g transform="translate(50 48) scale(0.7) translate(-50 -50)">${truck.replaceAll(BLACK, WHITE)}</g>`,
  ),
  'park-no-loading': banned(`<g transform="translate(50 48) scale(0.62) translate(-50 -50)">${truck}</g>`),
  'lim-height': ring(
    `<line x1="30" y1="30" x2="30" y2="70" stroke="${BLACK}" stroke-width="3"/>` +
      `<polygon points="30,22 24,34 36,34" fill="${BLACK}"/>` +
      `<polygon points="30,78 24,66 36,66" fill="${BLACK}"/>` +
      `<text x="66" y="58" text-anchor="middle" font-family="${FONT}" font-size="22" font-weight="700" fill="${BLACK}">4.5</text>`,
  ),
  'lim-width': ring(
    `<line x1="24" y1="36" x2="76" y2="36" stroke="${BLACK}" stroke-width="3"/>` +
      `<polygon points="18,36 30,30 30,42" fill="${BLACK}"/>` +
      `<polygon points="82,36 70,30 70,42" fill="${BLACK}"/>` +
      label('2.5', 22, 68),
  ),
  'lim-weight': ring(label('10t', 32, 60)),
  'lim-length': ring(
    `<g transform="translate(50 40) scale(0.55) translate(-50 -50)">${truck}</g>` +
      `<line x1="22" y1="74" x2="78" y2="74" stroke="${BLACK}" stroke-width="3"/>` +
      `<polygon points="18,74 28,69 28,79" fill="${BLACK}"/>` +
      `<polygon points="82,74 72,69 72,79" fill="${BLACK}"/>`,
  ),
  'lim-axle': ring(
    `<circle cx="32" cy="58" r="12" fill="none" stroke="${BLACK}" stroke-width="4"/>` +
      `<circle cx="68" cy="58" r="12" fill="none" stroke="${BLACK}" stroke-width="4"/>` +
      `<line x1="32" y1="58" x2="68" y2="58" stroke="${BLACK}" stroke-width="4"/>` +
      label('8t', 16, 30),
  ),
  'lim-no-entry': svg(
    `<circle cx="50" cy="50" r="46" fill="${RED}"/>` +
      `<rect x="18" y="42" width="64" height="16" rx="2" fill="${WHITE}"/>`,
  ),
  'lim-no-trucks': banned(`<g transform="translate(50 50) scale(0.62) translate(-50 -50)">${truck}</g>`),
  'lim-speed': ring(label('60', 36, 62)),
  'lim-end-speed': svg(
    `<circle cx="50" cy="50" r="46" fill="${WHITE}" stroke="${BLACK}" stroke-width="6"/>` +
      label('60', 32, 60) +
      `<line x1="22" y1="78" x2="78" y2="22" stroke="${BLACK}" stroke-width="6" stroke-linecap="round"/>`,
  ),
  'aw-ped': diamond(pedestrian),
  'aw-bike': diamond(bicycle),
  'aw-pwd': diamond(wheelchair),
  'warn-curve-l': triangle(curve('left', false)),
  'warn-curve-r': triangle(curve('right', false)),
  'warn-sharp-l': triangle(curve('left', true)),
  'warn-sharp-r': triangle(curve('right', true)),
  'warn-winding': triangle(winding),
  'warn-cross': triangle(crossroads),
  'warn-side-l': triangle(sideLeft),
  'warn-side-r': triangle(sideRight),
  'warn-t': triangle(tee),
  'warn-round': triangle(roundabout),
  'warn-signal': triangle(signal),
  'warn-slip': triangle(slippery),
  'warn-hump': triangle(hump),
  'warn-rocks': triangle(rocks),
  'warn-narrow': triangle(narrows),
  'warn-bridge': triangle(bridge),
  'warn-two-way': triangle(twoWayArrows),
  'warn-down': triangle(descent),
  'warn-animal': triangle(animal),
  'warn-flood': triangle(flood),
  'warn-rail': triangle(rail),
  'warn-work': triangle(worker),
  'info-advance': svg(
    `<rect x="4" y="16" width="92" height="68" rx="6" fill="${GREEN}"/>` +
      `<text x="14" y="44" font-family="${FONT}" font-size="15" font-weight="700" fill="${WHITE}">CITY</text>` +
      `<polygon points="82,28 90,40 86,40 86,48 78,48 78,40 74,40" fill="${WHITE}"/>` +
      `<text x="14" y="70" font-family="${FONT}" font-size="15" font-weight="700" fill="${WHITE}">PORT</text>` +
      `<polygon points="70,62 88,70 70,78" fill="${WHITE}"/>`,
  ),
  'info-distance': svg(
    `<rect x="4" y="16" width="92" height="68" rx="6" fill="${GREEN}"/>` +
      `<text x="14" y="44" font-family="${FONT}" font-size="15" font-weight="700" fill="${WHITE}">CITY</text>` +
      `<text x="86" y="44" text-anchor="end" font-family="${FONT}" font-size="15" font-weight="700" fill="${WHITE}">12</text>` +
      `<text x="14" y="70" font-family="${FONT}" font-size="15" font-weight="700" fill="${WHITE}">PORT</text>` +
      `<text x="86" y="70" text-anchor="end" font-family="${FONT}" font-size="15" font-weight="700" fill="${WHITE}">40</text>`,
  ),
  'info-hospital': servicePlate(label('H', 48, 66, WHITE)),
  'info-fuel': servicePlate(
    `<rect x="38" y="22" width="24" height="40" rx="3" fill="${WHITE}"/>` +
      `<rect x="62" y="30" width="10" height="8" fill="${WHITE}"/>` +
      `<path d="M72 38 V58" stroke="${WHITE}" stroke-width="4" stroke-linecap="round"/>` +
      `<rect x="32" y="66" width="36" height="8" rx="2" fill="${WHITE}"/>`,
  ),
  'info-food': servicePlate(
      `<path d="M34 22 V58 M28 22 V38 M40 22 V38" stroke="${WHITE}" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M58 22 C74 22 76 40 64 48 V62" stroke="${WHITE}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  ),
  'info-phone': servicePlate(
    `<path d="M32 28 C32 28 28 46 40 58 C52 70 72 66 72 66 L64 54 L54 58 L46 48 L50 38 Z" fill="${WHITE}"/>`,
  ),
  'info-parking': servicePlate(label('P', 48, 66, WHITE)),
  'info-route': svg(
    `<path d="M50 6 L86 22 V54 C86 74 50 94 50 94 C50 94 14 74 14 54 V22 Z" fill="${WHITE}" stroke="${BLACK}" stroke-width="4" stroke-linejoin="round"/>` +
      label('1', 36, 62),
  ),
  'info-chevron': svg(
    `<rect x="24" y="4" width="52" height="92" rx="4" fill="${BLACK}"/>` +
      `<path d="M36 8 L66 18 L36 28" stroke="${WHITE}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<path d="M36 40 L66 50 L36 60" stroke="${WHITE}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` +
      `<path d="M36 72 L66 82 L36 92" stroke="${WHITE}" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`,
  ),
  'info-work': svg(
    `<rect x="6" y="14" width="88" height="72" rx="6" fill="${ORANGE}" stroke="${BLACK}" stroke-width="3"/>` +
      `<text x="50" y="42" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" fill="${BLACK}">ROAD WORK</text>` +
      `<text x="50" y="66" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="700" fill="${BLACK}">1 km</text>`,
  ),
  'mark-double-yellow': road(
    `<rect x="43" y="4" width="5" height="92" fill="${YELLOW}"/><rect x="52" y="4" width="5" height="92" fill="${YELLOW}"/>`,
  ),
  'mark-single-yellow': road(`<rect x="47" y="4" width="6" height="92" fill="${YELLOW}"/>`),
  'mark-broken-yellow': road(dashes(47, YELLOW)),
  'mark-mixed-yellow': road(`<rect x="43" y="4" width="5" height="92" fill="${YELLOW}"/>${dashes(53, YELLOW)}`),
  'mark-broken-white': road(dashes(47, WHITE)),
  'mark-solid-white': road(`<rect x="47" y="4" width="6" height="92" fill="${WHITE}"/>`),
  'mark-double-white': road(
    `<rect x="43" y="4" width="5" height="92" fill="${WHITE}"/><rect x="52" y="4" width="5" height="92" fill="${WHITE}"/>`,
  ),
  'mark-zebra': road(
    [18, 34, 50, 66, 82].map(y => `<rect x="8" y="${y}" width="84" height="8" fill="${WHITE}"/>`).join(''),
  ),
  'mark-box': road(
    `<rect x="22" y="22" width="56" height="56" fill="none" stroke="${YELLOW}" stroke-width="5"/>` +
      `<path d="M28 28 L72 72 M72 28 L28 72" stroke="${YELLOW}" stroke-width="5"/>`,
  ),
  'mark-stop': road(`<rect x="14" y="72" width="72" height="8" fill="${WHITE}"/>`),
  'mark-arrow': road(
    `<polygon points="50,16 68,40 58,40 58,84 42,84 42,40 32,40" fill="${WHITE}"/>`,
  ),
  'mark-edge': road(
    `<rect x="8" y="0" width="7" height="100" fill="${YELLOW}"/>` +
      `<rect x="62" y="8" width="4" height="14" fill="${WHITE}"/>` +
      `<rect x="62" y="32" width="4" height="14" fill="${WHITE}"/>` +
      `<rect x="62" y="56" width="4" height="14" fill="${WHITE}"/>` +
      `<rect x="62" y="80" width="4" height="14" fill="${WHITE}"/>`,
  ),
};
