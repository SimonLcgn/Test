# Kassenbon Scanner 📸

Eine einfache Web-App zum Fotografieren und Scannen von Kassenbons mit automatischer Datenverwaltung.

## Features ✨

- 📷 **Foto hochladen** - Kassenbons fotografieren und hochladen
- 📋 **Daten erfassen** - Automatisches Erfassen von:
  - Laufende Nummer
  - Datum
  - Aussteller (REWE, Edeka, etc.)
  - Kassenbonnummer
  - Gesamtbetrag (Brutto)
- 📊 **Tabelle mit Übersicht** - Alle Kassenbons in einer übersichtlichen Tabelle
- 💰 **Automatische Summe** - Gesamtsumme aller Beträge wird automatisch berechnet
- 📥 **CSV Export** - Daten als CSV-Datei exportieren
- 💾 **Speicherung** - Daten werden im Browser gespeichert (LocalStorage)
- 🗑️ **Verwaltung** - Einzelne Einträge löschen oder alle Daten löschen

## Verwendung 🚀

1. Öffne die `index.html` Datei im Browser
2. Klicke auf den Upload-Bereich oder ziehe ein Foto rein
3. Fülle die Kassenbon-Daten aus:
   - Datum (Kalender wählen)
   - Aussteller (z.B. REWE, Edeka)
   - Bonnummer (von dem Bon)
   - Gesamtbetrag in Euro
4. Klicke "Speichern"
5. Der Eintrag erscheint automatisch in der Tabelle
6. Exportiere deine Daten als CSV oder lösche einzelne Einträge

## Struktur 📁

```
├── index.html    # HTML-Struktur
├── styles.css    # Styling und Design
├── script.js     # JavaScript-Logik
└── README.md     # Diese Datei
```

## Browser-Kompatibilität 🌐

- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅

## Zukünftige Erweiterungen 🔮

- OCR-Texterkennung (Tesseract.js) - Automatische Dateneingabe aus Fotos
- Cloud-Synchronisierung - Daten zwischen Geräten synchronisieren
- Kategorisierung - Kassenbons nach Kategorien sortieren
- Statistiken - Ausgabenanalyse und Grafiken
- Datenbank-Integration - Server-seitige Speicherung

## Lizenz 📄

Kostenlos nutzbar und erweiterbar