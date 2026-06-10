# Zahlungsweg — Invoice, SEPA, Alternativen

> Task R8 aus HANDOVER §9 · Stand 2026-06-10 · ⚠️ Vor Nutzung mit `research/legal-memo.md` (R7) und StB abgleichen — insbesondere USt-Zeile und Anzahlungshöhe.

## 1. Grundsätze (aus Landing-Copy bereits versprochen)
- Zahlung per **SEPA-Überweisung in EUR per Invoice auf ein Konto bei einer deutschen Bank** (FAQ-Wortlaut §4.2 — verbindlich)
- **Sicherungsschein vor jeder Zahlung** (§ 651t BGB: Anzahlung nur nach Übergabe des Sicherungsscheins!) → Reihenfolge im Prozess fest verdrahten: Vertrag + Sicherungsschein → dann erst Invoice
- Kein Wort „Firma/компания" in Gast-Kommunikation (Personal Brand)

## 2. Empfohlener Zahlungsplan (⚠️ Entwurf — Staffel mit Anwalt/AGB synchronisieren)
| Schritt | Zeitpunkt | Betrag |
|---|---|---|
| Anzahlung | bei Buchung (nach Sicherungsschein) | **20 %** (üblich; > 20 % nur mit besonderer Rechtfertigung zulässig) |
| Restzahlung | 30 Tage vor Reisebeginn (= bis 14.08.2026) | 80 % |
| Kurzfristbuchung < 30 Tage | sofort | 100 % |

## 3. Invoice-Vorlage — Pflichtfelder (RU/DE zweisprachig)
```
MARIA SCHRÖDER · сомелье / Sommelière
[Anschrift — D4] · [E-Mail — D1] · [USt-/Steuernummer — vom StB]

Инвойс / Rechnung Nr. 2026-___        Datum: ____
Гость / Gast: ____  ·  Бронь / Buchung: «От кратера — в бокал», 13–19.09.2026

Позиция / Position                          Betrag
Пакетный тур, тариф Riserva (1 гость)       3 290,00 €
[Early Bird −200,00 € / Einzelzimmer +480,00 € …]
ИТОГО / Gesamt                              ____ €
Анзалунг 20 % / Anzahlung                   ____ € — оплатить до ____
Остаток / Rest                              ____ € — оплатить до 14.08.2026

Оплата / Zahlung: SEPA-Überweisung in EUR
Получатель / Empfänger: Maria Schröder
IBAN: DE__ ____ ____ ____ ____ __   BIC: ____  Bank: [deutsche Bank — Konto einrichten]
Verwendungszweck / Назначение: 2026-___ + Name

USt-Hinweis (eine Variante, StB entscheidet — R7):
  a) «Sonderregelung für Reisebüros — Margenbesteuerung nach § 25 UStG; kein USt-Ausweis»
  b) «Kein USt-Ausweis gemäß § 19 UStG (Kleinunternehmerregelung)»
Begleittext RU: «НДС не выделяется (особый порядок налогообложения туристических услуг в Германии)»
```

## 4. Konto
- Eigenes **Geschäfts-/Unterkonto nur für die Reise** (saubere Trennung, einfaches Monitoring der Zahlungseingänge); deutsche IBAN ist Versprechen der Landing
- Kandidaten: bestehende Hausbank-Zweitkonto; Fintech mit deutscher IBAN ⚠️ prüfen, ob „Konto bei deutscher Bank"-Formulierung der FAQ dann sauber bleibt — im Zweifel klassische Bank

## 5. Optional: Stripe
- **Stripe SEPA-Lastschrift**: bequem für Gäste in DE/AT, Gebühr niedrig (⚠️ aktuellen Satz prüfen, Größenordnung < 1 % gedeckelt); Achtung 8-Wochen-Rückgaberecht der Lastschrift → für Restzahlung kurz vor Reise eher NICHT, für Anzahlung ok
- **Stripe Karten**: für Nicht-SEPA-Gäste (AE, KZ, IL, UK) einfachster Weg; Gebühr ⚠️ ~2–3 % einkalkulieren oder in Tarif einpreisen (Gebühr darf dem Gast in EU nicht aufgeschlagen werden — Surcharging-Verbot für Verbraucher in DE; ⚠️ verifizieren)
- Alternative für Nicht-SEPA: klassischer **SWIFT-Eingang** auf dasselbe Konto („все комиссии — за счёт отправителя / OUR") oder Wise — Formulierung für Gäste unten

## 6. Formulierung für Nicht-SEPA-Gäste (RU, in Buchungsbestätigung)
> «Если ваш банк вне зоны SEPA (например, ОАЭ, Казахстан, Израиль, Великобритания): вы можете оплатить обычным международным переводом SWIFT в евро на тот же счёт (комиссии банков — за счёт отправителя, опция OUR) или картой по защищённой ссылке Stripe. Напишите нам — пришлём удобный вариант.»

## 7. Offene Punkte → KANBAN
- [ ] StB: § 25 vs. § 19 → welcher USt-Hinweis auf Invoice (R7-Fragenkatalog)
- [ ] Konto eröffnen/bestimmen, IBAN in Vorlage
- [ ] Anzahlungs-%/Fristen mit AGB-Staffel synchronisieren
- [ ] Stripe-Konto ja/nein bis Verkaufsstart entscheiden
- [ ] Invoice-Nummernkreis festlegen (2026-001 ff.)
