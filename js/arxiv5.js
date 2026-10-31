/* arxiv5.app: static JSON-driven table, no external dependencies. */
(() => {
  'use strict';

  const tbody = document.getElementById('readingpoints-body');
  if (!tbody) return;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };

  const safeLink = (value, label) => {
    if (typeof value !== 'string') return el('span', '', '—');
    try {
      const url = new URL(value, window.location.href);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') throw Error('Invalid URL');
      const a = el('a', '', label);
      a.href = url.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      return a;
    } catch {
      return el('span', '', '—');
    }
  };

  const show = value => value === null || value === undefined || value === ''
    ? '—' : Array.isArray(value) ? (value.length ? value.join(', ') : '—') : String(value);

  const makeDetail = (label, value, url) => {
    const group = el('div');
    group.append(el('dt', '', label));
    const dd = el('dd');
    if (url) dd.append(safeLink(url, show(value)));
    else dd.textContent = show(value);
    group.append(dd);
    return group;
  };

  function renderPoint(point, index) {
    const paper = point.arxiv || {};
    const lean = point.lean || {};
    const row = el('tr', 'point-row');
    const id = `rpi-detail-${index}`;
    const nameCell = el('td');
    nameCell.append(el('div', 'reading-point', show(point.reading_point)));
    const toggle = el('button', 'more-button', 'More info');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', id);
    nameCell.append(toggle);
    row.append(nameCell);

    const specCell = el('td', 'lean-specification', show(point.lean_specification));
    row.append(specCell);
    const arxivCell = el('td', 'arxiv-id');
    arxivCell.append(safeLink(paper.url || (paper.id ? `https://arxiv.org/abs/${encodeURIComponent(paper.id)}` : null), show(paper.id)));
    row.append(arxivCell);
    row.append(el('td', 'category', show(paper.category)));
    row.append(el('td', 'paper-title', show(paper.title)));
    const tweetCell = el('td', 'twitter-link');
    tweetCell.append(safeLink(point.twitter?.url, 'Discussion'));
    row.append(tweetCell);

    const detailRow = el('tr', 'detail-row');
    detailRow.id = id;
    detailRow.hidden = true;
    const detailCell = el('td');
    detailCell.colSpan = 6;
    const panel = el('div', 'detail-panel');
    const grid = el('dl', 'detail-grid');
    grid.append(makeDetail('RPI', point.rpi));
    const statusGroup = el('div');
    statusGroup.append(el('dt', '', 'Lean status'));
    const statusDD = el('dd');
    const status = el('span', 'status', show(lean.status));
    status.dataset.status = String(lean.status || '').toLowerCase();
    statusDD.append(status);
    statusGroup.append(statusDD);
    grid.append(statusGroup);
    grid.append(makeDetail('Authors', paper.authors));
    grid.append(makeDetail('arXiv version', paper.version));
    grid.append(makeDetail('All categories', paper.categories));
    grid.append(makeDetail('Lean declaration', lean.declaration));
    grid.append(makeDetail('Dependencies', lean.dependencies));
    grid.append(makeDetail('Repository', lean.repository, lean.repository));
    grid.append(makeDetail('Commit', lean.commit));
    grid.append(makeDetail('Toolchain', lean.toolchain));
    grid.append(makeDetail('Verification', lean.verification));
    grid.append(makeDetail('Notes', point.notes));
    grid.append(makeDetail('Updated', point.updated_at));
    panel.append(grid);
    detailCell.append(panel);
    detailRow.append(detailCell);

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      detailRow.hidden = expanded;
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.textContent = expanded ? 'More info' : 'Less info';
    });
    return [row, detailRow];
  }

  async function load() {
    try {
      const response = await fetch('data/arxiv5.json', { cache: 'no-cache' });
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      const points = await response.json();
      if (!Array.isArray(points)) throw Error('Expected JSON array');
      tbody.replaceChildren();
      if (!points.length) {
        const row = el('tr');
        const cell = el('td', 'empty-state', 'No reading points yet.');
        cell.colSpan = 6;
        row.append(cell);
        tbody.append(row);
        return;
      }
      points.forEach((point, index) => tbody.append(...renderPoint(point, index)));
    } catch (error) {
      const row = el('tr');
      const cell = el('td', 'error-state', 'Could not load data/arxiv5.json. Check that the file exists and contains valid JSON.');
      cell.colSpan = 6;
      row.append(cell);
      tbody.replaceChildren(row);
      console.error('Reading points load failed:', error);
    }
  }

  load();
})();
