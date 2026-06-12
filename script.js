// Daten im LocalStorage speichern
const STORAGE_KEY = 'kassenbon_data';

// Upload Area Setup
const uploadArea = document.getElementById('uploadArea');
const photoInput = document.getElementById('photoInput');
const formSection = document.getElementById('formSection');
const previewSection = document.getElementById('previewSection');
const previewImage = document.getElementById('previewImage');
const bonForm = document.getElementById('bonForm');

// Event Listener für Upload Area
uploadArea.addEventListener('click', () => photoInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.background = '#e0e5ff';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.background = '#f8f9ff';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.background = '#f8f9ff';
    handleFile(e.dataTransfer.files[0]);
});

photoInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
});

// Datei verarbeiten
function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Bitte wähle ein Bild aus!');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewSection.style.display = 'block';
        formSection.style.display = 'block';
        
        // Foto automatisch mit OCR scannen (Tesseract.js)
        scanReceiptWithOCR(e.target.result);
    };
    reader.readAsDataURL(file);
}

// OCR mit Tesseract.js (optional - für automatische Texterkennung)
async function scanReceiptWithOCR(imageData) {
    try {
        // Warnung: Dies erfordert Tesseract.js Library
        // Für jetzt: Manuelles Ausfüllen
        console.log('OCR-Funktion können Sie später aktivieren');
    } catch (error) {
        console.error('OCR Error:', error);
    }
}

// Formular absenden
bonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newEntry = {
        datum: document.getElementById('datum').value,
        aussteller: document.getElementById('aussteller').value,
        bonnummer: document.getElementById('bonnummer').value,
        gesamtbetrag: parseFloat(document.getElementById('gesamtbetrag').value)
    };

    // Zu Daten hinzufügen
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    data.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Tabelle aktualisieren
    updateTable();
    
    // Formular zurücksetzen
    resetForm();
    
    alert('✅ Kassenbon erfolgreich gespeichert!');
});

// Formular zurücksetzen
function resetForm() {
    bonForm.reset();
    formSection.style.display = 'none';
    previewSection.style.display = 'none';
    photoInput.value = '';
}

// Tabelle aktualisieren
function updateTable() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const tbody = document.getElementById('bonTableBody');
    tbody.innerHTML = '';

    let total = 0;

    data.forEach((entry, index) => {
        const row = tbody.insertRow();
        
        // Lfd. Nr.
        row.insertCell(0).textContent = index + 1;
        
        // Datum
        row.insertCell(1).textContent = formatDate(entry.datum);
        
        // Aussteller
        row.insertCell(2).textContent = entry.aussteller;
        
        // Bonnummer
        row.insertCell(3).textContent = entry.bonnummer;
        
        // Gesamtbetrag
        const amountCell = row.insertCell(4);
        amountCell.textContent = formatCurrency(entry.gesamtbetrag);
        
        // Aktionen
        const actionCell = row.insertCell(5);
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.textContent = '🗑️ Löschen';
        deleteBtn.onclick = () => deleteEntry(index);
        actionCell.appendChild(deleteBtn);

        total += entry.gesamtbetrag;
    });

    // Gesamtsumme aktualisieren
    document.getElementById('totalAmount').textContent = formatCurrency(total);
}

// Eintrag löschen
function deleteEntry(index) {
    if (confirm('Diesen Kassenbon wirklich löschen?')) {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        data.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        updateTable();
        alert('✅ Kassenbon gelöscht!');
    }
}

// Alle Daten löschen
function clearAllData() {
    if (confirm('ACHTUNG: Alle Kassenbons wirklich löschen? Dies kann nicht rückgängig gemacht werden!')) {
        localStorage.removeItem(STORAGE_KEY);
        updateTable();
        alert('✅ Alle Daten gelöscht!');
    }
}

// CSV Export
function exportToCSV() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    if (data.length === 0) {
        alert('Es gibt keine Daten zum Exportieren!');
        return;
    }

    let csv = 'Lfd. Nr.,Datum,Aussteller,Bonnummer,Gesamtbetrag (€)\n';
    
    let total = 0;
    data.forEach((entry, index) => {
        csv += `${index + 1},"${formatDate(entry.datum)}","${entry.aussteller}","${entry.bonnummer}",${entry.gesamtbetrag.toFixed(2)}\n`;
        total += entry.gesamtbetrag;
    });

    csv += `\nGesamtsumme:,,,${total.toFixed(2)}\n`;

    // CSV herunterladen
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kassenbons_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Hilfsfunktionen
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
}

function formatCurrency(amount) {
    return amount.toFixed(2).replace('.', ',') + ' €';
}

// Tabelle beim Laden aktualisieren
document.addEventListener('DOMContentLoaded', () => {
    updateTable();
});