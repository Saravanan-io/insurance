import { jsPDF } from 'jspdf';
import { formatPdfCurrency, formatCurrencyInWords, formatDate, generateDocumentId } from './formatters';
import { companyDetails, insuranceFeaturesMeta } from '../data/insuranceData';
import { getFeatureImage, base64Images } from '../assets/base64Images';

// Color palette constants for jsPDF
const COLORS = {
  primary: [20, 43, 82],      // #142B52 Deep Navy
  navyDark: [14, 31, 61],     // #0E1F3D
  secondary: [36, 87, 167],   // #2457A7 Royal Blue
  accent: [214, 168, 79],     // #D6A84F Gold
  accentLight: [253, 247, 235], // #FDF7EB Light Gold
  textDark: [23, 36, 58],     // #17243A
  textMuted: [100, 116, 139], // #64748B Slate 500
  bgLight: [245, 247, 251],   // #F5F7FB Soft Off-White
  border: [226, 232, 240],    // #E2E8F0
  white: [255, 255, 255],
  success: [16, 185, 129]
};

/**
 * Draw Company Header on a PDF page
 */
const drawPageHeader = (doc, pageTitle, docId) => {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Top accent bar
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setFillColor(...COLORS.accent);
  doc.rect(0, 24, pageWidth, 1.5, 'F');

  // Company Brand Name
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('ESWARA MOORTHY INSURANCE', 15, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(210, 225, 250);
  doc.text('SMART FINANCIAL PLANNING & RISK ARCHITECTURE', 15, 18);

  // Right-aligned report category & doc ID
  doc.setTextColor(...COLORS.accent);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(pageTitle.toUpperCase(), pageWidth - 15, 12, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(210, 225, 250);
  doc.text(`REF: ${docId}`, pageWidth - 15, 18, { align: 'right' });
};

/**
 * Draw Company Footer on a PDF page
 */
const drawPageFooter = (doc, currentPage, totalPages) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerY = pageHeight - 14;

  // Thin separator
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.5);
  doc.line(15, footerY - 2, pageWidth - 15, footerY - 2);

  // Footer text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.textMuted);
  doc.text(
    `${companyDetails.name} • ${companyDetails.registration} • Advisory Helpline: ${companyDetails.tollFree}`,
    15,
    footerY + 4
  );

  doc.text(
    `Page ${currentPage} of ${totalPages}`,
    pageWidth - 15,
    footerY + 4,
    { align: 'right' }
  );

  doc.setFontSize(6.5);
  doc.text(
    'CONFIDENTIAL CLIENT PROPOSAL • GENERATED IN-BROWSER VIA SECURE CLIENT-SIDE PROCESSING',
    pageWidth / 2,
    footerY + 9,
    { align: 'center' }
  );
};

/**
 * Draw Cover Page for Combined PDF Portfolio
 */
const drawCoverPage = (doc, selectedPlansList, plansState, docId, totalPages) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background tint
  doc.setFillColor(...COLORS.bgLight);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top Navy Header Banner
  doc.setFillColor(...COLORS.primary);
  doc.rect(0, 0, pageWidth, 58, 'F');

  // Gold accent line
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, 58, pageWidth, 2.5, 'F');

  // Brand Name
  doc.setTextColor(...COLORS.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('ESWARA MOORTHY INSURANCE', 20, 26);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(...COLORS.accent);
  doc.text('PREMIER FINANCIAL SECURITY & LIFE MILESTONE PLANNING', 20, 36);

  doc.setFontSize(8.5);
  doc.setTextColor(210, 225, 250);
  doc.text('Regulated by Insurance Regulatory and Development Authority of India (IRDAI)', 20, 46);

  // Big Document Title Box
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.5);
  doc.roundedRect(20, 68, pageWidth - 40, 32, 3, 3, 'FD');

  // Gold accent tab on left of title
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(20, 68, 4, 32, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.primary);
  doc.text('PERSONALIZED INSURANCE PLANNING PORTFOLIO', 30, 82);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.textMuted);
  doc.text('Customized Client Portfolio Document • Multi-Milestone Financial Blueprint', 30, 92);

  // Hero Cover Image
  const heroImg = base64Images.hero;
  if (heroImg) {
    try {
      doc.addImage(heroImg, 'JPEG', 20, 106, pageWidth - 40, 58, undefined, 'FAST');
      // Subtle border around image
      doc.setDrawColor(...COLORS.accent);
      doc.setLineWidth(1);
      doc.rect(20, 106, pageWidth - 40, 58);
    } catch (e) {
      console.warn('Cover image render note:', e);
    }
  }

  // Determine Primary Client Name
  let primaryName = 'Valued Client';
  for (const plan of selectedPlansList) {
    const data = plansState[plan.id];
    if (data?.fullName) {
      primaryName = `${data.prefix ? data.prefix + ' ' : ''}${data.fullName.trim()}`;
      break;
    }
  }

  // Client Details Card
  const clientCardY = 170;
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(20, clientCardY, pageWidth - 40, 32, 3, 3, 'FD');

  // 2 columns of details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.primary);
  doc.text('PREPARED SPECIFICALLY FOR:', 26, clientCardY + 10);
  doc.text('PORTFOLIO REFERENCE ID:', 115, clientCardY + 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.secondary);
  doc.text(primaryName, 26, clientCardY + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.textDark);
  doc.text(docId, 115, clientCardY + 20);

  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textMuted);
  doc.text(`Date of Issuance: ${formatDate()}`, 26, clientCardY + 28);
  doc.text(`Advisory Division: High-Net-Worth & Family Protection`, 115, clientCardY + 28);

  // Table of Contents / Executive Summary Table
  const tableY = 208;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.primary);
  doc.text('PORTFOLIO SUMMARY & TABLE OF CONTENTS', 20, tableY);

  // Table Header
  const headerY = tableY + 5;
  doc.setFillColor(...COLORS.primary);
  doc.rect(20, headerY, pageWidth - 40, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text('SECTION / PLAN MODULE', 26, headerY + 5.5);
  doc.text('BENEFICIARY / LIFE ASSURED', 95, headerY + 5.5);
  doc.text('TARGET VALUE (INR)', pageWidth - 26, headerY + 5.5, { align: 'right' });

  // Rows
  let rowY = headerY + 8;
  let totalPortfolioValue = 0;

  selectedPlansList.forEach((plan, idx) => {
    const data = plansState[plan.id];
    let val = 0;
    let person = data?.fullName || 'Client';

    if (plan.id === 'marriage') {
      val = Number(data?.marriageValue) || 0;
      person = `${data?.prefix || ''} ${data?.fullName || ''}`;
    } else if (plan.id === 'education') {
      val = Number(data?.educationValue) || 0;
      person = `${data?.fullName || ''} (${data?.gender || ''})`;
    } else if (plan.id === 'retirement') {
      val = Number(data?.retirementValue) || 0;
      person = `${data?.prefix || ''} ${data?.fullName || ''}`;
    } else if (plan.id === 'accidentalRisk') {
      val = Number(data?.coverageValue) || 0;
      person = `${data?.prefix || ''} ${data?.fullName || ''}`;
    } else if (plan.id === 'lifeRisk') {
      val = Number(data?.coverageValue) || 0;
      person = `${data?.prefix || ''} ${data?.fullName || ''}`;
    }

    totalPortfolioValue += val;

    // Alternate row colors
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 253);
    doc.rect(20, rowY, pageWidth - 40, 7.5, 'F');
    doc.setDrawColor(...COLORS.border);
    doc.line(20, rowY + 7.5, pageWidth - 20, rowY + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.textDark);
    doc.text(`${idx + 1}. ${plan.title}`, 26, rowY + 5);

    doc.setTextColor(...COLORS.textMuted);
    doc.text(person.slice(0, 26), 95, rowY + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.primary);
    doc.text(formatPdfCurrency(val), pageWidth - 26, rowY + 5, { align: 'right' });

    rowY += 7.5;
  });

  // Total Row
  doc.setFillColor(...COLORS.accentLight);
  doc.rect(20, rowY, pageWidth - 40, 8.5, 'F');
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.8);
  doc.rect(20, rowY, pageWidth - 40, 8.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.primary);
  doc.text('TOTAL COMBINED PORTFOLIO COMMITMENT', 26, rowY + 5.5);

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.secondary);
  doc.text(formatPdfCurrency(totalPortfolioValue), pageWidth - 26, rowY + 5.8, { align: 'right' });

  // Page Footer
  drawPageFooter(doc, 1, totalPages);
};

/**
 * Draw an Individual Plan Page (used in both single plan PDF and combined PDF pages)
 */
const drawPlanPage = (doc, featureMeta, formData, pageNumber, totalPages, docId) => {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Standard Header
  drawPageHeader(doc, featureMeta.reportTitle, docId);

  // Top Section: Category Title
  const contentStartY = 33;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.primary);
  doc.text(featureMeta.reportTitle, 15, contentStartY);

  // Two Column Layout Top Area:
  // Left: Feature Image (Width: 85mm, Height: 58mm)
  // Right: Key Personal Details Box (Width: 90mm, Height: 58mm)
  const imageX = 15;
  const imageY = contentStartY + 8;
  const imageW = 85;
  const imageH = 58;

  // Resolve Image based on feature and gender
  const imgData = getFeatureImage(featureMeta.id, formData.gender);
  if (imgData) {
    try {
      doc.addImage(imgData, 'JPEG', imageX, imageY, imageW, imageH, undefined, 'FAST');
      // Subtle gold frame
      doc.setDrawColor(...COLORS.accent);
      doc.setLineWidth(1);
      doc.rect(imageX, imageY, imageW, imageH);
    } catch (e) {
      console.warn('Plan image render note:', e);
    }
  }

  // Right Side: Personal Details Card
  const detailsX = 105;
  const detailsY = imageY;
  const detailsW = pageWidth - 105 - 15; // 90mm
  const detailsH = imageH;

  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.6);
  doc.roundedRect(detailsX, detailsY, detailsW, detailsH, 2.5, 2.5, 'FD');

  // Details Header Tab
  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(detailsX, detailsY, detailsW, 9, 2.5, 2.5, 'F');
  doc.rect(detailsX, detailsY + 5, detailsW, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.white);
  doc.text('CLIENT & PLAN PROFILE', detailsX + 6, detailsY + 6);

  // Clean, focused client details without the removed generic rows
  let detailRows = [];

  if (featureMeta.id === 'marriage') {
    detailRows = [
      { label: 'Beneficiary Name', value: `${formData.prefix || ''} ${formData.fullName || ''}`.trim() },
      { label: 'Plan Category', value: 'Marriage Insurance Planning' },
      { label: 'Proposal Status', value: 'Active Client Planning' },
      { label: 'Date of Proposal', value: formatDate() }
    ];
  } else if (featureMeta.id === 'education') {
    detailRows = [
      { label: 'Student Full Name', value: formData.fullName || 'Student' },
      { label: 'Student Gender', value: `${formData.gender || 'Male'} Student` },
      { label: 'Plan Category', value: 'Education Insurance Planning' },
      { label: 'Date of Proposal', value: formatDate() }
    ];
  } else if (featureMeta.id === 'retirement') {
    detailRows = [
      { label: 'Retiree Full Name', value: `${formData.prefix || ''} ${formData.fullName || ''}`.trim() },
      { label: 'Plan Category', value: 'Retirement Insurance Planning' },
      { label: 'Proposal Status', value: 'Active Client Planning' },
      { label: 'Date of Proposal', value: formatDate() }
    ];
  } else if (featureMeta.id === 'accidentalRisk') {
    detailRows = [
      { label: 'Insured Person', value: `${formData.prefix || ''} ${formData.fullName || ''}`.trim() },
      { label: 'Plan Category', value: 'Accidental Risk Protection' },
      { label: 'Coverage Class', value: '24x7 Comprehensive Shield' },
      { label: 'Date of Proposal', value: formatDate() }
    ];
  } else if (featureMeta.id === 'lifeRisk') {
    detailRows = [
      { label: 'Life Assured Name', value: `${formData.prefix || ''} ${formData.fullName || ''}`.trim() },
      { label: 'Plan Category', value: 'Life Risk Protection' },
      { label: 'Coverage Class', value: 'Pure Term Protection Cover' },
      { label: 'Date of Proposal', value: formatDate() }
    ];
  }

  let rowY = detailsY + 16;
  detailRows.forEach((row) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...COLORS.textMuted);
    doc.text(row.label.toUpperCase(), detailsX + 6, rowY);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.textDark);
    doc.text(String(row.value).slice(0, 36), detailsX + 6, rowY + 4.5);

    rowY += 10;
  });

  // Highlight Financial Value Banner
  const valueCardY = imageY + imageH + 7; // ~107
  const valueCardW = pageWidth - 30; // 180mm
  const valueCardH = 34;

  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(15, valueCardY, valueCardW, valueCardH, 3, 3, 'F');

  // Gold side trim
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(15, valueCardY, 5, valueCardH, 2, 2, 'F');

  // Value Extract
  let numericVal = 0;
  let valueLabel = featureMeta.statLabel.toUpperCase();

  if (featureMeta.id === 'marriage') numericVal = Number(formData.marriageValue) || 0;
  else if (featureMeta.id === 'education') numericVal = Number(formData.educationValue) || 0;
  else if (featureMeta.id === 'retirement') numericVal = Number(formData.retirementValue) || 0;
  else if (featureMeta.id === 'accidentalRisk') numericVal = Number(formData.coverageValue) || 0;
  else if (featureMeta.id === 'lifeRisk') numericVal = Number(formData.coverageValue) || 0;

  const formattedVal = formatPdfCurrency(numericVal);
  const wordsVal = formatCurrencyInWords(numericVal);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.accent);
  doc.text(`RECOMMENDED FINANCIAL COMMITMENT: ${valueLabel}`, 26, valueCardY + 11);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.setTextColor(...COLORS.white);
  doc.text(formattedVal, 26, valueCardY + 23);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(215, 230, 255);
  doc.text(wordsVal, 28 + doc.getTextWidth(formattedVal) + 4, valueCardY + 22.5);

  doc.setFontSize(8);
  doc.setTextColor(180, 205, 240);
  doc.text('Calculated based on actuarial compounding, inflation resilience, and goal maturity timelines.', 26, valueCardY + 30);

  // Strategic Advisory & Planning Insight Section
  const insightY = valueCardY + valueCardH + 8; // ~149
  const insightH = 56;
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.border);
  doc.roundedRect(15, insightY, valueCardW, insightH, 3, 3, 'FD');

  doc.setFillColor(...COLORS.accentLight);
  doc.roundedRect(15, insightY, valueCardW, 9, 3, 3, 'F');
  doc.rect(15, insightY + 5, valueCardW, 4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.primary);
  doc.text('STRATEGIC ADVISORY & PERSONALIZED PLANNING SUMMARY', 22, insightY + 6.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.textDark);

  // Clean ASCII currency in text to avoid font glyph errors
  const clientName = formData.fullName || 'Valued Client';
  const insightParagraph1 = `Dear ${clientName}, our dedicated insurance advisory team has prepared this strategic framework for your ${featureMeta.title}. Setting aside a targeted sum of ${formattedVal} ensures that your milestone aspirations are thoroughly insulated against macroeconomic fluctuations, rising lifestyle costs, and unanticipated contingencies.`;

  const insightParagraph2 = `${featureMeta.planningInsight} Systematic allocation towards this goal facilitates structured capital preservation while delivering superior financial security under prevailing statutory guidelines.`;

  const lines1 = doc.splitTextToSize(insightParagraph1, valueCardW - 14);
  const lines2 = doc.splitTextToSize(insightParagraph2, valueCardW - 14);

  doc.text(lines1, 22, insightY + 17);
  doc.text(lines2, 22, insightY + 17 + (lines1.length * 4.4) + 3);

  // Sign-off & Seal Block (Clean, spacious, without the removed recommendations box)
  const signY = insightY + insightH + 20; // ~225

  // Digital verification badge
  doc.setFillColor(...COLORS.accentLight);
  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.6);
  doc.roundedRect(pageWidth - 75, signY - 14, 60, 7, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.accent);
  doc.text('★ DIGITALLY CERTIFIED ★', pageWidth - 45, signY - 9.5, { align: 'center' });

  // Signature titles
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.primary);
  doc.text('CLIENT ACKNOWLEDGEMENT', 22, signY);
  doc.text('AUTHORIZED ADVISORY SEAL', pageWidth - 75, signY);

  // Signature lines
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.5);
  doc.line(22, signY + 16, 80, signY + 16);
  doc.line(pageWidth - 75, signY + 16, pageWidth - 15, signY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.textMuted);
  doc.text('Signature of Proposed Client', 22, signY + 21);
  doc.text('Eswara Moorthy Insurance Advisory', pageWidth - 75, signY + 21);

  // Page Footer
  drawPageFooter(doc, pageNumber, totalPages);
};

/**
 * OPTION A: Generate Individual Insurance Plan PDF
 */
export const generateIndividualPlanPDF = async (planKey, formData) => {
  const meta = insuranceFeaturesMeta.find((m) => m.id === planKey);
  if (!meta) throw new Error(`Unknown plan key: ${planKey}`);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const docId = generateDocumentId(meta.id.substring(0, 3).toUpperCase());
  const totalPages = 1;

  drawPlanPage(doc, meta, formData, 1, totalPages, docId);

  const sanitizedName = (formData.fullName || 'Client')
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '_');
  const planName = meta.title.replace(/\s+/g, '_');
  const fileName = `${planName}_${sanitizedName}.pdf`;

  doc.save(fileName);
  return { success: true, fileName };
};

/**
 * OPTION B: Generate Combined Insurance Portfolio PDF
 */
export const generateCombinedPortfolioPDF = async (selectedPlansKeys, plansState) => {
  if (!selectedPlansKeys || selectedPlansKeys.length === 0) {
    throw new Error('No insurance plans selected for portfolio generation.');
  }

  const selectedMetas = insuranceFeaturesMeta.filter((m) =>
    selectedPlansKeys.includes(m.id)
  );

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  const docId = generateDocumentId('PORTFOLIO');
  const totalPages = 1 + selectedMetas.length;

  // Page 1: Premium Cover Page
  drawCoverPage(doc, selectedMetas, plansState, docId, totalPages);

  // Following Pages: One page per selected category
  selectedMetas.forEach((meta, index) => {
    doc.addPage();
    const pageNum = index + 2;
    const planData = plansState[meta.id];
    drawPlanPage(doc, meta, planData, pageNum, totalPages, docId);
  });

  const fileName = 'Eswara_Moorthy_Insurance_Portfolio.pdf';
  doc.save(fileName);
  return { success: true, fileName, pageCount: totalPages };
};
