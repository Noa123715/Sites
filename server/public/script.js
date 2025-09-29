const apiBase = '/api/sites';

async function fetchSites() {
    const res = await fetch(apiBase);
    return res.json();
}

function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function render(sites) {
    const body = document.getElementById('sitesBody');
    body.innerHTML = '';
    sites.forEach(site => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
      <td style="width:100px;"><img src="${site.image}" alt="${site.name}" style="width:80px; height:50px; object-fit:cover; border-radius:6px;"></td>
      <td>${escapeHtml(site.name)}</td>
      <td><a href="#" class="site-link" data-url="${escapeHtml(site.url)}">${escapeHtml(site.url)}</a></td>
      <td>${site.score}</td>
      <td>
        <button class="btn btn-sm btn-secondary btn-edit" data-id="${site._id}">Edit</button>
        <button class="btn btn-sm btn-danger btn-delete" data-id="${site._id}">Delete</button>
      </td>
    `;

        body.appendChild(tr);
    });

    // attach handlers
    document.querySelectorAll('.site-link').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            openInNewTab(e.currentTarget.dataset.url);
        });
    });

    document.querySelectorAll('.btn-delete').forEach(b => {
        b.addEventListener('click', async () => {
            if (!confirm('למחוק את הרשומה?')) return;
            const id = b.dataset.id;
            await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
            load();
        });
    });

    document.querySelectorAll('.btn-edit').forEach(b => {
        b.addEventListener('click', async () => {
            const id = b.dataset.id;
            const name = prompt('Name?', b.closest('tr').children[1].innerText);
            if (name == null) return;
            const url = prompt('URL?', b.closest('tr').children[2].innerText);
            if (url == null) return;
            const image = prompt('Image URL?', b.querySelector('img') ? b.querySelector('img').src : '');
            if (image == null) return;
            const score = prompt('Score (0-10)?', b.closest('tr').children[3].innerText);
            if (score == null) return;

            const payload = { name, url, image, score: Number(score) };
            const res = await fetch(`${apiBase}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) load();
            else {
                const err = await res.json();
                alert('Error: ' + (err.error || JSON.stringify(err)));
            }
        });
    });
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}

async function load() {
    const sites = await fetchSites();
    render(sites);
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const url = document.getElementById('url').value.trim();
    const image = document.getElementById('image').value.trim();
    const score = Number(document.getElementById('score').value);

    const payload = { name, url, image, score };

    const res = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        document.getElementById('addForm').reset();
        load();
    } else {
        const err = await res.json();
        alert('Error: ' + (err.error || JSON.stringify(err)));
    }
});

load();
