import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InvoiceData } from '../types/invoice';
import { FiDownload, FiInstagram, FiMessageCircle } from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PreviewContainer = styled.div`
  padding: 30px;
  background: white;
  overflow-y: auto;
  max-height: 100vh;
`;

const InvoiceContainer = styled.div`
  width: 210mm;
  height: 297mm;
  background: white;
  margin: 0 auto;
  margin-top: 10px;
  padding: 20mm;
  padding-top: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  position: relative;
  font-family: 'Cairo', 'Noto Naskh Arabic', sans-serif;
  direction: rtl;
  text-align: right;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  direction: ltr; /* Force left-to-right for header layout */
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  order: 1; /* Force logo to be first (left side) */
  flex: 1;
`;

const Logo = styled.div`
  width: 180px;
  height: 120px;
  background: #8B4513;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background: #D2691E;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background: #CD853F;
    border-radius: 50%;
  }
`;

const CompanyName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #8B4513;
  margin: 0;
`;

const ManagerInfo = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 5px 0;
  margin-left: 35px;
  position: relative;
  top: -50px;
`;

const InvoiceInfo = styled.div`
  text-align: right;
  order: 2; /* Force invoice info to be second (right side) */
  flex: 1;
`;

const InvoiceNumber = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 40px;
`;

const InvoiceDate = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ClientSection = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
`;

const ClientText = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
`;

const ServicesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  border: 2px solid #000;
`;

const TableHeader = styled.th`
  border: 1px solid #000;
  padding: 12px;
  background: #f8f9fa;
  font-weight: 600;
  text-align: center;
`;

const TableCell = styled.td`
  border: 1px solid #000;
  padding: 12px;
  text-align: center;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  direction: ltr; /* Force left-to-right for summary layout */
`;

const SummaryTable = styled.div`
  width: fit-content;
  min-width: 200px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  order: 1; /* Force table to be first (left side) */
`;

const SummaryRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.div`
  background: #f8f9fa;
  padding: 10px 15px;
  font-weight: 600;
  width: 100px;
  text-align: center;
  white-space: nowrap;
`;

const SummaryValue = styled.div`
  padding: 10px 15px;
  min-width: 100px;
  text-align: center;
  white-space: nowrap;
`;

const USDValue = styled.div`
  background: #f8f9fa;
  padding: 10px 15px;
  text-align: center;
  font-weight: 600;
  border-top: 1px solid #ddd;
  white-space: nowrap;
`;

const ExchangeRate = styled.div`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
  padding: 5px 15px;
  white-space: nowrap;
`;

const StampSection = styled.div`
  width: 120px;
  height: 120px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  order: 2; /* Force stamp to be second (right side) */
`;

const StampLogo = styled.div`
  width: 60px;
  height: 60px;
  background: #8B4513;
  border-radius: 50%;
  margin-bottom: 8px;
`;

const StampText = styled.div`
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.2;
`;

const ContactInfo = styled.div`
  font-size: 0.6rem;
  text-align: center;
  margin-top: 8px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
`;

const Button = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #5a6fd8;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const calculateTotal = () => {
    return invoiceData.services.reduce((sum, service) =>
      sum + (service.breakfastMeals * invoiceData.summary.breakfastPrice + service.lunchMeals * invoiceData.summary.lunchPrice), 0);
  };

  const calculateFinalTotal = () => {
    const total = calculateTotal();
    return total - invoiceData.summary.discount;
  };

  const calculateUSD = () => {
    const finalTotal = calculateFinalTotal();
    return (finalTotal / invoiceData.summary.exchangeRate).toFixed(0);
  };

  const generatePDF = async () => {
    if (!invoiceRef.current) {
      console.error('Invoice reference not found');
      alert('خطأ: لم يتم العثور على عنصر الفاتورة');
      return;
    }

    setIsGeneratingPDF(true);

    try {
      console.log('Starting PDF generation...');

      // Wait a bit for any pending renders
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true, // Enable logging for debugging
        width: invoiceRef.current.offsetWidth,
        height: invoiceRef.current.offsetHeight
      });

      console.log('Canvas created, dimensions:', canvas.width, 'x', canvas.height);

      const imgData = canvas.toDataURL('image/png');
      console.log('Image data created, length:', imgData.length);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = 210;
      const pageHeight = 297;

      // Calculate image dimensions to fit on one page
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      console.log('PDF dimensions - width:', imgWidth, 'height:', imgHeight);

      // Always fit to one page
      const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const finalWidth = imgWidth * scale;
      const finalHeight = imgHeight * scale;

      // Center the image on the page
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

      const filename = `invoice-${invoiceData.invoiceInfo.number}.pdf`;
      console.log('Saving PDF as:', filename);

      // Create blob and trigger download
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);

      // Create download link and trigger download
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);

      console.log('PDF saved successfully');

    } catch (error) {
      console.error('PDF generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`فشل في إنشاء PDF: ${errorMessage}`);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <PreviewContainer>
      <ActionButtons>
        <Button onClick={generatePDF} disabled={isGeneratingPDF}>
          {isGeneratingPDF ? 'جاري التحميل...' : ''}
          <FiDownload />
          تحميل PDF
        </Button>
      </ActionButtons>

      <InvoiceContainer ref={invoiceRef}>
        {/* Header - Logo on LEFT, Invoice info on RIGHT */}
        <Header>
          <LogoSection>
            {invoiceData.companyInfo.logo ? (
              <img
                src={invoiceData.companyInfo.logo}
                alt="Logo"
                style={{
                  width: '200px',
                  height: '200px',
                  marginBottom: '15px',
                  display: 'block',
                  // margin: '0 auto 15px auto'
                }}
              />
            ) : (
              <Logo />
            )}
            {/* <CompanyName>{invoiceData.companyInfo.name}</CompanyName>/ */}
            <ManagerInfo>المسؤول: {invoiceData.companyInfo.manager}</ManagerInfo>
          </LogoSection>

          <InvoiceInfo>
            <InvoiceNumber>No: {invoiceData.invoiceInfo.number}</InvoiceNumber>
            <InvoiceDate>Date: {new Date(invoiceData.invoiceInfo.date).toLocaleDateString('en-GB')}</InvoiceDate>
          </InvoiceInfo>
        </Header>

        {/* Client Section */}
        <ClientSection>
          <ClientText>حررت الفاتورة الى السيد/ة:   {invoiceData.clientInfo.name}</ClientText>
        </ClientSection>

        {/* Services Table */}
        <ServicesTable>
          <thead>
            <tr>
              <TableHeader>التاريخ</TableHeader>
              <TableHeader>عدد وجبات الفطور</TableHeader>
              <TableHeader>عدد وجبات الغداء</TableHeader>
              <TableHeader>السعر</TableHeader>
            </tr>
          </thead>
          <tbody>
            {invoiceData.services.map((service, index) => (
              <tr key={index}>
                <TableCell>{service.date}</TableCell>
                <TableCell>{service.breakfastMeals}</TableCell>
                <TableCell>{service.lunchMeals}</TableCell>
                <TableCell>{(service.breakfastMeals * invoiceData.summary.breakfastPrice + service.lunchMeals * invoiceData.summary.lunchPrice).toLocaleString()}</TableCell>
              </tr>
            ))}
          </tbody>
        </ServicesTable>

        {/* Summary Section */}
        <SummarySection>
          <SummaryTable>
            <SummaryRow>
              <SummaryValue>{invoiceData.summary.discount.toLocaleString()} {invoiceData.summary.currency}</SummaryValue>
              <SummaryLabel>الخصم</SummaryLabel>
            </SummaryRow>
            <SummaryRow>
              <SummaryValue>{calculateFinalTotal().toLocaleString()} {invoiceData.summary.currency}</SummaryValue>
              <SummaryLabel>المجموع</SummaryLabel>
            </SummaryRow>
            <USDValue>{calculateUSD()} $</USDValue>
            <ExchangeRate>{invoiceData.summary.currency} سعر الصرف: {invoiceData.summary.exchangeRate.toLocaleString()}</ExchangeRate>
          </SummaryTable>

          <StampSection>
            {invoiceData.companyInfo.stamp ? (
              <img
                src={invoiceData.companyInfo.stamp}
                alt="Stamp"
                style={{ width: '280px', height: '280px' }}
              />
            ) : (
              <>
                <StampLogo />
                <StampText>
                  {invoiceData.companyInfo.name}
                  <br />
                  manal.catering
                </StampText>
                <ContactInfo>
                  0951738476
                  <br />
                  <FiInstagram style={{ margin: '0 2px' }} />
                  <FiMessageCircle style={{ margin: '0 2px' }} />
                </ContactInfo>
              </>
            )}
          </StampSection>
        </SummarySection>
      </InvoiceContainer>
    </PreviewContainer>
  );
};

export default InvoicePreview; 