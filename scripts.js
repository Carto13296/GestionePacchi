function submitForm() {
    const courier = document.getElementById('courier').value;
    const trackingNumber = document.getElementById('trackingNumber').value;
    const recipient = document.getElementById('recipient').value;
    const retrieverFirstName = document.getElementById('retrieverFirstName').value;
    const retrieverLastName = document.getElementById('retrieverLastName').value;
    const documentType = document.getElementById('documentType').value;
    const documentNumber = document.getElementById('documentNumber').value;
    const documentExpiry = document.getElementById('documentExpiry').value;

    if (!courier || !trackingNumber || !recipient || !retrieverFirstName || !retrieverLastName || !documentType || !documentNumber || !documentExpiry) {
        alert('Per favore, compila tutti i campi.');
        return;
    }

    const today = new Date();
    const expiryDate = new Date(documentExpiry);

    if (expiryDate < today) {
        if (!confirm('La scadenza del documento è passata. Vuoi continuare?')) {
            return;
        }
    }

    // Salva i dati nel localStorage
    localStorage.setItem('courier', courier);
    localStorage.setItem('trackingNumber', trackingNumber);
    localStorage.setItem('recipient', recipient);
    localStorage.setItem('retrieverFirstName', retrieverFirstName);
    localStorage.setItem('retrieverLastName', retrieverLastName);
    localStorage.setItem('documentType', documentType);
    localStorage.setItem('documentNumber', documentNumber);
    localStorage.setItem('documentExpiry', documentExpiry);

    // Passa alla pagina di firma
    window.location.href = 'signature.html';
}