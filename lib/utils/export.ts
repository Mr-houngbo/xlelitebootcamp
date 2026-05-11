import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToCSV = (filename: string, headers: string[], rows: any[][]) => {
  const csvContent = [
    headers,
    ...rows
  ].map(row => row.map(cell => `"${String(cell || '').replace(/"/g, '""')}"`).join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

export const exportToPDF = (filename: string, title: string, headers: string[], rows: any[][]) => {
  const doc = new jsPDF() as any;

  // Header Style
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 40, 'F');

  // Title
  doc.setTextColor(249, 115, 22); // orange-500
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('XL ELITE BOOTCAMP', 20, 25);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(title.toUpperCase(), 20, 33);

  // Date
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Généré le : ${new Date().toLocaleString()}`, 150, 25);

  // Table
  autoTable(doc, {
    startY: 50,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: {
      fillColor: [249, 115, 22],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [50, 50, 50]
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { top: 50 },
  });

  doc.save(`${filename}.pdf`);
};
