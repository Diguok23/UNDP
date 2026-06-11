import html2pdf from 'html2pdf.js';

// Type for html2pdf options
type Html2PdfOptions = any;

export interface ContractData {
  applicantName: string;
  position: string;
  startDate: string;
  salary?: string;
  companyName?: string;
  [key: string]: any;
}

export interface OfferLetterData {
  applicantName: string;
  position: string;
  startDate: string;
  salary: string;
  reportingTo?: string;
  location?: string;
  [key: string]: any;
}

/**
 * Generate contract PDF from HTML template
 */
export async function generateContractPDF(
  templateHtml: string,
  data: ContractData
): Promise<Blob> {
  const html = populateTemplate(templateHtml, data);

  return new Promise((resolve, reject) => {
    const opt: Html2PdfOptions = {
      margin: 10,
      filename: `contract-${data.applicantName.replace(/\s+/g, '-')}.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    html2pdf()
      .set(opt)
      .from(html)
      .outputPdf('blob')
      .then(resolve)
      .catch(reject);
  });
}

/**
 * Generate offer letter PDF from HTML template
 */
export async function generateOfferLetterPDF(
  templateHtml: string,
  data: OfferLetterData
): Promise<Blob> {
  const html = populateTemplate(templateHtml, data);

  return new Promise((resolve, reject) => {
    const opt: Html2PdfOptions = {
      margin: 10,
      filename: `offer-letter-${data.applicantName.replace(/\s+/g, '-')}.pdf`,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    html2pdf()
      .set(opt)
      .from(html)
      .outputPdf('blob')
      .then(resolve)
      .catch(reject);
  });
}

/**
 * Populate template with data by replacing placeholders
 */
function populateTemplate(template: string, data: Record<string, any>): string {
  let html = template;

  // Replace {{variableName}} with actual values
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    html = html.replace(regex, String(value || ''));
  });

  // Remove any remaining unpopulated variables
  html = html.replace(/{{[^}]+}}/g, '');

  return html;
}

/**
 * Generate a buffer for PDF instead of auto-downloading
 */
export async function generatePDFBuffer(
  templateHtml: string,
  data: Record<string, any>,
  filename: string
): Promise<Uint8Array> {
  const html = populateTemplate(templateHtml, data);

  return new Promise((resolve, reject) => {
    const opt: Html2PdfOptions = {
      margin: 10,
      filename: filename,
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    html2pdf()
      .set(opt)
      .from(html)
      .outputPdf('arraybuffer')
      .then((buffer: ArrayBuffer) => {
        resolve(new Uint8Array(buffer));
      })
      .catch(reject);
  });
}

/**
 * Default contract template
 */
export const DEFAULT_CONTRACT_TEMPLATE = `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 2px solid #333;
      padding-bottom: 20px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .date {
      color: #666;
      font-size: 12px;
    }
    .section {
      margin: 30px 0;
    }
    .section-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .signature-block {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
    }
    .signature-line {
      width: 45%;
    }
    .line {
      border-bottom: 1px solid #333;
      margin-bottom: 5px;
      height: 40px;
    }
    .label {
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">EMPLOYMENT CONTRACT</div>
    <div class="date">Date: {{date}}</div>
  </div>

  <div class="section">
    <p>This Employment Contract is entered into between UNEDP (the "Company") and {{applicantName}} (the "Employee").</p>
  </div>

  <div class="section">
    <div class="section-title">1. Position</div>
    <p>The Employee shall be employed in the position of <strong>{{position}}</strong>.</p>
  </div>

  <div class="section">
    <div class="section-title">2. Start Date</div>
    <p>The Employee's employment shall commence on <strong>{{startDate}}</strong>.</p>
  </div>

  <div class="section">
    <div class="section-title">3. Compensation</div>
    <p>The Employee shall receive an annual salary of <strong>{{salary}}</strong>, payable in accordance with the Company's standard payroll practices.</p>
  </div>

  <div class="section">
    <div class="section-title">4. Terms of Employment</div>
    <p>The Employee's employment is subject to the terms and conditions set forth in this Contract and in accordance with applicable laws and Company policies.</p>
  </div>

  <div class="section">
    <div class="section-title">5. Confidentiality</div>
    <p>The Employee agrees to maintain the confidentiality of all Company proprietary information and trade secrets during and after employment.</p>
  </div>

  <div class="signature-block">
    <div class="signature-line">
      <div class="line"></div>
      <div class="label">Employee Signature</div>
    </div>
    <div class="signature-line">
      <div class="line"></div>
      <div class="label">Company Representative</div>
    </div>
  </div>
</body>
</html>
`;

/**
 * Default offer letter template
 */
export const DEFAULT_OFFER_LETTER_TEMPLATE = `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 2px solid #1e40af;
      padding-bottom: 20px;
    }
    .logo {
      font-size: 20px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 10px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .date {
      color: #666;
      font-size: 12px;
      margin-bottom: 20px;
    }
    .recipient {
      margin-bottom: 30px;
    }
    .section {
      margin: 20px 0;
    }
    .section-title {
      font-weight: bold;
      margin-bottom: 10px;
    }
    .footer {
      margin-top: 40px;
      border-top: 1px solid #e5e7eb;
      padding-top: 20px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">UNEDP</div>
    <div style="font-size: 12px; color: #666;">UN Economic Development Programme</div>
  </div>

  <div class="title">OFFER OF EMPLOYMENT</div>
  <div class="date">Date: {{date}}</div>

  <div class="recipient">
    <p>{{applicantName}}</p>
  </div>

  <p>Dear {{applicantName}},</p>

  <p>We are pleased to offer you the position of <strong>{{position}}</strong> at UNEDP. After a thorough review of your qualifications and background, we believe you are an excellent fit for our organization.</p>

  <div class="section">
    <div class="section-title">Position Details:</div>
    <ul>
      <li><strong>Position:</strong> {{position}}</li>
      <li><strong>Start Date:</strong> {{startDate}}</li>
      <li><strong>Salary:</strong> {{salary}} per annum</li>
      <li><strong>Location:</strong> {{location}}</li>
      <li><strong>Reports to:</strong> {{reportingTo}}</li>
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Terms of Employment:</div>
    <p>This offer is contingent upon successful background verification and your ability to provide valid work authorization. The terms and conditions of employment will be detailed in your employment contract.</p>
  </div>

  <div class="section">
    <div class="section-title">Next Steps:</div>
    <p>Please confirm your acceptance of this offer by returning the signed copy of this letter within 5 business days. Should you have any questions, please contact our HR department.</p>
  </div>

  <p>We look forward to welcoming you to the UNEDP team.</p>

  <p>Sincerely,</p>
  <p style="margin-top: 50px;"><strong>UNEDP Recruitment Team</strong></p>

  <div class="footer">
    <p>This offer is confidential and intended solely for the addressed recipient. Unauthorized disclosure or use of this information is prohibited.</p>
  </div>
</body>
</html>
`;
