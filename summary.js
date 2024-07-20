window.onload = function() {
    // Recupera i dati dal localStorage
    const retrieverName = localStorage.getItem('retrieverName');
    const courier = localStorage.getItem('courier');
    const trackingNumber = localStorage.getItem('trackingNumber');
    const recipient = localStorage.getItem('recipient');
    const documentType = localStorage.getItem('documentType');
    const documentNumber = localStorage.getItem('documentNumber');
    const documentExpiry = localStorage.getItem('documentExpiry');
    const signature = localStorage.getItem('signature');

    // Imposta i dati nel riepilogo
    document.getElementById('retrieverNameDisplay').textContent = retrieverName || '';
    document.getElementById('courierDisplay').textContent = courier || '';
    document.getElementById('trackingNumberDisplay').textContent = trackingNumber || '';
    document.getElementById('recipientDisplay').textContent = recipient || '';
    document.getElementById('documentTypeDisplay').textContent = documentType || '';
    document.getElementById('documentNumberDisplay').textContent = documentNumber || '';
    document.getElementById('documentExpiryDisplay').textContent = documentExpiry || '';

    // Imposta il logo del corriere
    const courierLogo = document.getElementById('courierLogo');
    switch (courier) {
        case 'brt':
            courierLogo.src = 'brt.png';
            break;
        case 'inpost':
            courierLogo.src = 'inpost.png';
            break;
        case 'poste-italiane':
            courierLogo.src = 'poste_italiane.png';
            break;
        case 'dhl':
            courierLogo.src = 'dhl.png';
            break;
        case 'ups':
            courierLogo.src = 'ups.png';
            break;
        case 'fermo-point':
            courierLogo.src = 'fermopoint.png';
            break;
        case 'amazon':
            courierLogo.src = 'l/amazon.png';
            break;
        case 'gls':
            courierLogo.src = 'gls.png';
            break;
        default:
            courierLogo.src = 'corrier.png';
    }

    // Mostra la firma
    const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    const signatureImg = new Image();
    signatureImg.src = signature || '';
    signatureImg.onload = function() {
        ctx.drawImage(signatureImg, 0, 0);
    };
};

// Funzione per la stampa del riepilogo
function printSummary() {
    window.print();
}

// Aggiungi un listener per l'evento di stampa completata
window.onafterprint = function() {
    window.location.href = 'index.html';
};
