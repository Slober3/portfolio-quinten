#!/usr/bin/env node
/**
 * Generates clean, executive 1-page NL & EN PDF resumes under public/cv/.
 * Zero placeholder copy, zero personal address/GSM/email/age (OpSec-safe).
 */
import fs from 'node:fs';
import path from 'node:path';

function esc(s) {
  return s.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
}

function buildExecutivePdf({ title, subtitle, meta, sections }) {
  const cmds = [];
  // Top dark header band
  cmds.push('0.075 0.094 0.133 rg 0 742 595 100 re f');
  // Amber accent bar
  cmds.push('0.961 0.620 0.043 rg 0 738 595 4 re f');
  // Header title
  cmds.push(`BT /F2 22 Tf 0.929 0.949 0.969 rg 48 800 Td (${esc(title)}) Tj ET`);
  cmds.push(`BT /F1 11 Tf 0.961 0.620 0.043 rg 48 778 Td (${esc(subtitle)}) Tj ET`);
  cmds.push(`BT /F1 9.5 Tf 0.604 0.659 0.745 rg 48 758 Td (${esc(meta)}) Tj ET`);

  let y = 710;
  for (const sec of sections) {
    cmds.push(`BT /F2 11 Tf 0.012 0.412 0.631 rg 48 ${y} Td (${esc(sec.heading.toUpperCase())}) Tj ET`);
    cmds.push(`0.835 0.863 0.902 RG 0.8 w 48 ${y - 5} m 547 ${y - 5} l S`);
    y -= 22;
    for (const item of sec.lines) {
      if (item.bold) {
        cmds.push(`BT /F2 10 Tf 0.059 0.090 0.165 rg 48 ${y} Td (${esc(item.text)}) Tj ET`);
        y -= 14;
      } else {
        cmds.push(`BT /F1 9.5 Tf 0.278 0.333 0.412 rg 48 ${y} Td (${esc(item.text)}) Tj ET`);
        y -= 13.5;
      }
    }
    y -= 12;
  }

  // Footer
  cmds.push('0.835 0.863 0.902 RG 0.5 w 48 44 m 547 44 l S');
  cmds.push('BT /F1 8.5 Tf 0.45 0.50 0.58 rg 48 28 Td (Quinten Desmyter - Regio Lier / Kempen, Belgie - github.com/Slober3) Tj ET');

  const stream = cmds.join('\n');
  const objects = [];
  const addObj = (body) => {
    objects.push(body);
    return objects.length;
  };

  addObj('<< /Type /Catalog /Pages 2 0 R >>');
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  addObj('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  addObj(`<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`);

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefPos = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
  return Buffer.from(pdf, 'latin1');
}

fs.mkdirSync(path.join('public', 'cv'), { recursive: true });

fs.writeFileSync(
  path.join('public', 'cv', 'quinten-desmyter-cv-nl.pdf'),
  buildExecutivePdf({
    title: 'Quinten Desmyter',
    subtitle: 'Praktijklector Cloud, Netwerken & Cybersecurity | Auteur',
    meta: 'Regio Lier / Kempen, Belgie  |  GitHub: github.com/Slober3  |  YouTube: @QuintenMoto',
    sections: [
      {
        heading: 'Profiel',
        lines: [
          { text: 'Praktijklector aan Thomas More Hogeschool (IT Factory, Campus Geel) met focus op Cloud, Netwerken,' },
          { text: 'Windows SysAdmin, Cybersecurity en IoT/Electronics. Sterk in Flip the Classroom, reproduceerbare labs' },
          { text: 'en het helder vertalen van complexe infrastructuur naar de praktijk.' },
        ],
      },
      {
        heading: 'Ervaring & Onderwijs',
        lines: [
          { bold: true, text: 'Praktijklector IT Factory - Thomas More Hogeschool, Campus Geel (2020 - heden)' },
          { text: '- Vakken in 1ITF (NL) en 1ACS (EN): AWS, Docker, Kubernetes, Linux, Cisco CCNA 1 & 2, IoT/Electronics.' },
          { text: '- Windows SysAdmin: Active Directory, Registry, PowerShell-automatisering en Systems as Code (Pester).' },
          { text: '- Betrokken als coach bij studentenorganisatie SIN.' },
          { bold: true, text: 'Workshopbegeleider & Train-the-Trainer - RTC Antwerpen (Doorlopend)' },
          { text: '- Praktijkgerichte Cisco-netwerkworkshops en kennisdeling met leerkrachten secundair onderwijs.' },
        ],
      },
      {
        heading: 'Publicaties',
        lines: [
          { bold: true, text: 'Thoughts on cyber security (2020) - ISBN 9798651810475' },
          { text: 'Praktische inzichten over hedendaagse dreigingen, preventie en menselijk bewustzijn.' },
          { bold: true, text: 'Informatica: Programmeren met Python (2020) - ISBN 9798654331892' },
          { text: 'Toegankelijk handboek van programmeerlogica naar leesbare Python-code.' },
        ],
      },
      {
        heading: 'Open Source, Hardware & Certificering',
        lines: [
          { text: '- GitHub (@Slober3): PotHead (PHP honeypot), ESP32-Public-Honeypot, BeeHive IoT, Pester-Test-Examples.' },
          { text: '- Hardware: Home+ Domotica Svejr Station (eigen printplaat-ontwerp via PCBWay).' },
          { text: '- TryHackMe: CompTIA Pentest+ Path, Web Fundamentals, Cyber Defense Path.' },
        ],
      },
      {
        heading: 'Opleiding & Engagement',
        lines: [
          { bold: true, text: 'Professionele Bachelor Elektronica-ICT & Pedagogisch Getuigschrift' },
          { text: 'Technische basis in elektronica en netwerken, praktijkervaring in het secundair onderwijs (o.a. VTI)' },
          { text: 'en betrokkenheid rond onderwijskwaliteit via VVS / VLOR.' },
        ],
      },
      {
        heading: 'Talen & Interesses',
        lines: [
          { text: 'Talen: Nederlands (moedertaal), Engels (vloeiend, doceertaal 1ACS).' },
          { text: 'Interesses: Motorrijden (Honda CB750 Hornet), fotografie, bordspelontwerp (Weavers Fate), laser-cutting.' },
        ],
      },
    ],
  })
);

fs.writeFileSync(
  path.join('public', 'cv', 'quinten-desmyter-cv-en.pdf'),
  buildExecutivePdf({
    title: 'Quinten Desmyter',
    subtitle: 'Senior Lecturer in Cloud, Networking & Cybersecurity | Author',
    meta: 'Lier / Campine Region, Belgium  |  GitHub: github.com/Slober3  |  YouTube: @QuintenMoto',
    sections: [
      {
        heading: 'Profile',
        lines: [
          { text: 'Senior Lecturer at Thomas More University of Applied Sciences (IT Factory, Geel Campus), teaching Cloud,' },
          { text: 'Networking, Windows SysAdmin, Cybersecurity, and IoT/Electronics. Focused on Flipped Classroom didactics,' },
          { text: 'reproducible labs, and translating complex infrastructure into clear hands-on practice.' },
        ],
      },
      {
        heading: 'Experience & Teaching',
        lines: [
          { bold: true, text: 'Senior Lecturer IT Factory - Thomas More, Geel Campus (2020 - present)' },
          { text: '- Teaching in both Dutch (1ITF) and English (1ACS): AWS, Docker, Kubernetes, Linux, Cisco CCNA 1 & 2, IoT.' },
          { text: '- Windows SysAdmin: Active Directory, Registry, PowerShell automation, and Systems as Code (Pester).' },
          { text: '- Involved as a coach at student organization SIN.' },
          { bold: true, text: 'Cisco Workshop Instructor & Train-the-Trainer - RTC Antwerp (Ongoing)' },
          { text: '- Delivering hands-on Cisco networking labs and teacher training across the Antwerp province.' },
        ],
      },
      {
        heading: 'Publications',
        lines: [
          { bold: true, text: 'Thoughts on cyber security (2020) - ISBN 9798651810475' },
          { text: 'Practical perspectives on modern cybersecurity threats, defense hygiene, and human awareness.' },
          { bold: true, text: 'Informatica: Programmeren met Python (2020) - ISBN 9798654331892' },
          { text: 'Approachable handbook guiding beginners from structured logic to clean Python code.' },
        ],
      },
      {
        heading: 'Open Source, Hardware & Certifications',
        lines: [
          { text: '- GitHub (@Slober3): PotHead (PHP honeypot), ESP32-Public-Honeypot, BeeHive IoT, Pester-Test-Examples.' },
          { text: '- Hardware: Home+ Domotica Svejr Station (custom PCB design shared on PCBWay).' },
          { text: '- TryHackMe: CompTIA Pentest+ Path, Web Fundamentals, Cyber Defense Path.' },
        ],
      },
      {
        heading: 'Education & Governance',
        lines: [
          { bold: true, text: 'B.Sc. Electronics-ICT & Pedagogical Teaching Certificate' },
          { text: 'Engineering foundation in electronics and networking combined with formal teaching practice and' },
          { text: 'Flemish higher-education curriculum quality contributions via VVS / VLOR.' },
        ],
      },
      {
        heading: 'Languages & Interests',
        lines: [
          { text: 'Languages: Dutch (native), English (fluent, teaching language in 1ACS).' },
          { text: 'Interests: Motorcycling (Honda CB750 Hornet), photography, tabletop game design (Weavers Fate), laser-cutting.' },
        ],
      },
    ],
  })
);

console.log('[generate-cv-pdfs] Clean NL and EN executive CV PDFs written to public/cv/.');
