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

  // Advisor Portrait & Credentials Card
  const heroImg = base64Images.hero;
  const advisorCardY = 106;
  const portraitW = 46;
  const portraitH = 58;

  if (heroImg) {
    try {
      doc.setFillColor(...COLORS.white);
      doc.roundedRect(20, advisorCardY, portraitW, portraitH, 2, 2, 'F');
      doc.addImage(heroImg, 'PNG', 20, advisorCardY, portraitW, portraitH, undefined, 'FAST');
      doc.setDrawColor(...COLORS.accent);
      doc.setLineWidth(0.8);
      doc.roundedRect(20, advisorCardY, portraitW, portraitH, 2, 2, 'D');
    } catch (e) {
      console.warn('Cover image render note:', e);
    }
  }

  // Right Side: Advisor Credential Box
  const credX = 20 + portraitW + 6; // 72mm
  const credW = pageWidth - 20 - credX; // 118mm
  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.6);
  doc.roundedRect(credX, advisorCardY, credW, portraitH, 3, 3, 'FD');

  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(credX, advisorCardY, credW, 8.5, 3, 3, 'F');
  doc.rect(credX, advisorCardY + 4, credW, 4.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.white);
  doc.text('OFFICIAL WEALTH & INSURANCE ADVISOR', credX + 6, advisorCardY + 5.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.primary);
  doc.text('Eswara Moorthy', credX + 6, advisorCardY + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.secondary);
  doc.text('Senior Financial Consultant & Risk Architect', credX + 6, advisorCardY + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.textMuted);
  doc.text('• 25+ Years of Dedicated Life Insurance Expertise', credX + 6, advisorCardY + 32);
  doc.text('• Specializing in Child Higher Education & Marriage Milestones', credX + 6, advisorCardY + 38);
  doc.text('• Comprehensive Family Protection & Retirement Annuity Plans', credX + 6, advisorCardY + 44);
  doc.text('• IRDAI Regulatory Compliance & Highest Claim Settlement Support', credX + 6, advisorCardY + 50);

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
 * Layout: Feature Image + Name + Financial Value + Header & Footer
 */
const drawPlanPage = (doc, featureMeta, formData, pageNumber, totalPages, docId) => {
  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. Standard Header
  drawPageHeader(doc, featureMeta.reportTitle, docId);

  // 2. Top Section: Category Title
  const contentStartY = 33;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.primary);
  doc.text(featureMeta.reportTitle, 15, contentStartY);

  // Subtle gold accent underline below title
  doc.setFillColor(...COLORS.accent);
  doc.rect(15, contentStartY + 3, 50, 1, 'F');

  // 3. Feature Image (Large, Prominent, High-Resolution Banner)
  const imageX = 15;
  const imageY = contentStartY + 10; // 43mm
  const imageW = pageWidth - 30; // 180mm
  const imageH = 100; // 100mm height

  const imgData = getFeatureImage(featureMeta.id, formData.gender);
  if (imgData) {
    try {
      doc.addImage(imgData, 'JPEG', imageX, imageY, imageW, imageH, undefined, 'FAST');
      // Elegant gold frame border around image
      doc.setDrawColor(...COLORS.accent);
      doc.setLineWidth(0.8);
      doc.rect(imageX, imageY, imageW, imageH);
    } catch (e) {
      console.warn('Plan image render note:', e);
    }
  }

  // 4. Beneficiary / Client Name Card
  const nameCardY = imageY + imageH + 10; // 153mm
  const nameCardW = pageWidth - 30; // 180mm
  const nameCardH = 34;

  doc.setFillColor(...COLORS.white);
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.6);
  doc.roundedRect(15, nameCardY, nameCardW, nameCardH, 3, 3, 'FD');

  // Gold accent left trim
  doc.setFillColor(...COLORS.accent);
  doc.roundedRect(15, nameCardY, 5, nameCardH, 2, 2, 'F');

  // Format Client / Student Name
  let nameLabel = 'CLIENT / BENEFICIARY NAME';
  let displayName = 'Client';

  if (featureMeta.id === 'marriage') {
    nameLabel = 'BENEFICIARY FULL NAME';
    displayName = `${formData.prefix ? formData.prefix + ' ' : ''}${formData.fullName || 'Client'}`.trim();
  } else if (featureMeta.id === 'education') {
    nameLabel = 'STUDENT FULL NAME';
    displayName = `${formData.fullName || 'Student'} (${formData.gender || 'Male'} Student)`;
  } else if (featureMeta.id === 'retirement') {
    nameLabel = 'RETIREE FULL NAME';
    displayName = `${formData.prefix ? formData.prefix + ' ' : ''}${formData.fullName || 'Client'}`.trim();
  } else if (featureMeta.id === 'accidentalRisk') {
    nameLabel = 'INSURED PERSON FULL NAME';
    displayName = `${formData.prefix ? formData.prefix + ' ' : ''}${formData.fullName || 'Client'}`.trim();
  } else if (featureMeta.id === 'lifeRisk') {
    nameLabel = 'LIFE ASSURED FULL NAME';
    displayName = `${formData.prefix ? formData.prefix + ' ' : ''}${formData.fullName || 'Client'}`.trim();
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.textMuted);
  doc.text(nameLabel, 26, nameCardY + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...COLORS.primary);
  doc.text(displayName, 26, nameCardY + 24);

  // 5. Highlighted Financial Target Value Banner
  const valueCardY = nameCardY + nameCardH + 10; // 197mm
  const valueCardW = pageWidth - 30; // 180mm
  const valueCardH = 46;

  doc.setFillColor(...COLORS.primary);
  doc.roundedRect(15, valueCardY, valueCardW, valueCardH, 3, 3, 'F');

  // Gold accent left trim
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
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.accent);
  doc.text(`PLANNED FINANCIAL VALUE: ${valueLabel}`, 26, valueCardY + 13);

  // Large Bold Amount
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.white);
  doc.text(formattedVal, 26, valueCardY + 26);

  // Words representation placed clearly on its own line below the number (eliminates any horizontal overlap)
  if (wordsVal) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(...COLORS.accent);
    doc.text(wordsVal, 26, valueCardY + 36);
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(180, 205, 240);
  doc.text('Calculated client proposal record • Eswara Moorthy Insurance Advisory', pageWidth - 26, valueCardY + 36, { align: 'right' });

  // 6. Page Footer
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
