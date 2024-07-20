const canvas = document.getElementById('signaturePad');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Imposta la dimensione del canvas
const canvasWidth = 600;
const canvasHeight = 200;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Imposta la linea di default
ctx.strokeStyle = '#000';
ctx.lineWidth = 2;
ctx.lineCap = 'round'; // Aggiungi un aspetto arrotondato alla linea

// Gestione del touch
function getTouchPosition(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const pos = getTouchPosition(e);
    lastX = pos.x;
    lastY = pos.y;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const pos = getTouchPosition(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita lo scrolling della pagina
    isDrawing = true;
    const pos = getTouchPosition(e.touches[0]);
    lastX = pos.x;
    lastY = pos.y;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Evita lo scrolling della pagina
    if (isDrawing) {
        const pos = getTouchPosition(e.touches[0]);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('signature'); // Rimuove la firma precedente
}

function confirmSignature() {
    if (ctx.getImageData(0, 0, canvas.width, canvas.height).data.every(channel => channel === 255)) {
        // Verifica se il canvas è vuoto
        alert('La firma è vuota. Per favore, firma prima di confermare.');
        return;
    }
    const signatureData = canvas.toDataURL('image/png', 0.5); // Riduce la qualità per adattare la dimensione
    localStorage.setItem('signature', signatureData);
    window.location.href = 'summary.html';
}

// Mostra il nome e il cognome del ritirante
document.getElementById('retrieverNameDisplay').textContent = localStorage.getItem('retrieverFirstName') || '';
document.getElementById('retrieverLastNameDisplay').textContent = localStorage.getItem('retrieverLastName') || '';
