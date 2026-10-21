import { jsPDF } from 'jspdf';
import { DateTime } from 'luxon';
import { Inquiry } from '../types';

// --- THEME & LAYOUT CONSTANTS ---
const THEME = {
    colors: {
        primary: [37, 99, 235] as [number, number, number],   // Brand Electric Blue
        deepSlate: [15, 23, 42] as [number, number, number], // Rich Text Dark
        midSlate: [71, 85, 105] as [number, number, number], // Secondary Text
        lightSurface: [248, 250, 252] as [number, number, number], // Background Gray
        white: [255, 255, 255] as [number, number, number],
        divider: [226, 232, 240] as [number, number, number]
    },
    fonts: {
        bold: 'helvetica',
        normal: 'helvetica',
        italic: 'helvetica'
    }
};

/**
 * Generates an ultra-premium, high-fidelity PDF contract for WQuicks Web Solutions.
 */
export const generateContractPDF = (inquiry: Inquiry) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    const date = DateTime.now();

    // --- RENDER HELPERS ---
    const setStyle = (size: number, color: keyof typeof THEME.colors = 'deepSlate', weight: 'bold' | 'normal' | 'italic' = 'normal') => {
        doc.setFontSize(size);
        const [r, g, b] = THEME.colors[color];
        doc.setTextColor(r, g, b);
        doc.setFont(THEME.fonts[weight], weight);
    };

    const drawSectionHeader = (title: string, y: number) => {
        setStyle(9, 'deepSlate', 'bold');
        doc.text(title, margin, y);
    };

    // --- 1. BRANDED HEADER ---
    doc.setFillColor(THEME.colors.deepSlate[0], THEME.colors.deepSlate[1], THEME.colors.deepSlate[2]);
    doc.rect(0, 0, pageWidth, 50, 'F');

    // Logo & Name
    doc.setDrawColor(THEME.colors.primary[0], THEME.colors.primary[1], THEME.colors.primary[2]);
    doc.setLineWidth(1.2);
    doc.circle(margin + 8, 22, 8);
    doc.line(margin + 14, 28, margin + 19, 33);

    setStyle(24, 'white', 'bold');
    doc.text('WQUICKS', margin + 22, 28);

    setStyle(7, 'primary', 'normal');
    doc.text('SASKATCHEWAN SOFTWARE ENGINEERING', margin + 22, 35);

    // Contact Details
    setStyle(7, 'white', 'normal');
    const contactX = pageWidth - margin;
    doc.text('contact@wquicks.com', contactX, 21, { align: 'right' });
    doc.text('+1 (437) 449-2404', contactX, 28, { align: 'right' });
    doc.text('Regina, SK, Canada', contactX, 35, { align: 'right' });

    // --- 2. DOCUMENT INFO BAR ---
    let currentY = 65;
    setStyle(16, 'deepSlate', 'bold');
    doc.text('SERVICE LEVEL AGREEMENT', margin, currentY);

    currentY += 8;
    setStyle(8, 'midSlate', 'normal');
    const refId = `WQ-MSA-${date.toFormat('yyyy')}-${inquiry.id.toString().padStart(3, '0')}`;
    doc.text(`REFERENCE ID: ${refId}`, margin, currentY);
    doc.text(`ISSUED ON: ${date.toFormat('MMMM dd, yyyy')}`, pageWidth - margin, currentY, { align: 'right' });

    doc.setDrawColor(THEME.colors.divider[0], THEME.colors.divider[1], THEME.colors.divider[2]);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY + 5, pageWidth - margin, currentY + 5);

    // --- 3. CONTRACTING PARTIES ---
    currentY += 20;
    drawSectionHeader('01. CONTRACTING PARTIES', currentY);

    currentY += 6;
    doc.setFillColor(THEME.colors.lightSurface[0], THEME.colors.lightSurface[1], THEME.colors.lightSurface[2]);
    doc.roundedRect(margin, currentY, contentWidth, 30, 2, 2, 'F');

    setStyle(7, 'midSlate', 'normal');
    doc.text('CLIENT / RECIPIENT', margin + 8, currentY + 10);
    setStyle(11, 'primary', 'bold');
    doc.text(inquiry.name.toUpperCase(), margin + 8, currentY + 18);
    setStyle(8, 'midSlate', 'normal');
    doc.text(`EMAIL: ${inquiry.email}`, margin + 8, currentY + 24);
    doc.text(`PHONE: ${inquiry.phone}`, margin + 8, currentY + 30);

    // --- 4. PROJECT SCOPE ---
    currentY += 45;
    drawSectionHeader('02. ARCHITECTURAL SCOPE & OBJECTIVES', currentY);

    currentY += 6;
    setStyle(8, 'midSlate', 'normal');
    const scopeIntro = "The project involves the development of high-performance digital infrastructure as follows:";
    doc.text(doc.splitTextToSize(scopeIntro, contentWidth), margin, currentY);

    currentY += 10;
    const details = inquiry.contract_details || inquiry.message || 'Standard web development implementation.';
    const splitDetails = doc.splitTextToSize(details, contentWidth - 16);
    const boxHeight = Math.max(30, (splitDetails.length * 5) + 15);

    doc.setDrawColor(THEME.colors.divider[0], THEME.colors.divider[1], THEME.colors.divider[2]);
    doc.rect(margin, currentY, contentWidth, boxHeight);
    setStyle(8.5, 'deepSlate', 'italic');
    doc.text(splitDetails, margin + 8, currentY + 10);

    // --- 5. TERMS ---
    currentY += boxHeight + 15;
    drawSectionHeader('03. ENGAGEMENT TERMS', currentY);

    currentY += 6;
    setStyle(8, 'primary', 'bold');
    doc.text(`DURATION: ${inquiry.contract_length || 'RETAINER BASIS'}`, margin, currentY);

    const termList = [
        " 100% intellectual property ownership remains with the client upon final disbursement.",
        " Strict confidentiality is maintained for all proprietary data and intelligence.",
        " A 30-day architectural stabilization period is included post-launch.",
        " All developments are audited for SEO readiness and local market compliance."
    ];
    if (inquiry.additional_terms) termList.push(` SPECIAL TERMS: ${inquiry.additional_terms}`);

    setStyle(8, 'midSlate', 'normal');
    termList.forEach((term, i) => {
        doc.text(`• ${term}`, margin + 5, currentY + 6 + (i * 6));
    });

    // --- 6. SIGNATURES ---
    currentY = pageHeight - 50;
    doc.setDrawColor(THEME.colors.divider[0], THEME.colors.divider[1], THEME.colors.divider[2]);
    const sigLineWidth = contentWidth / 2 - 10;

    doc.line(margin, currentY, margin + sigLineWidth, currentY);
    doc.line(pageWidth - margin - sigLineWidth, currentY, pageWidth - margin, currentY);

    setStyle(8, 'deepSlate', 'bold');
    doc.text('WQUICKS AUTHORIZED', margin, currentY + 6);
    doc.text('CLIENT ACCEPTANCE', pageWidth - margin, currentY + 6, { align: 'right' });

    setStyle(6, 'midSlate', 'normal');
    const footerText = `Formal Project ID: WQ-${inquiry.id}. Issued by WQuicks Web Solutions.`;
    doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: 'center' });

    // --- 7. SAVE ---
    const fileDate = date.toFormat('MMMdd');
    const fileYear = date.toFormat('yyyy');
    const safeName = inquiry.name.replace(/\s+/g, '');
    doc.save(`WQ_Contract_#${inquiry.id}_${safeName}_${fileYear}_${fileDate}.pdf`);
};
