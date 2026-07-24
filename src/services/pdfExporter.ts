import { jsPDF } from 'jspdf';
import { Story } from '../types/story';

export const exportStoryToPDF = (story: Story) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Cover Page
  doc.setFillColor(30, 27, 75); // Deep night blue
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  doc.setTextColor(251, 191, 36); // Star yellow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text(story.title, pageWidth / 2, 70, { align: 'center', maxWidth: pageWidth - 40 });

  // Subtitle
  doc.setTextColor(224, 242, 254);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.text(`A Magical Bedtime Story for ${story.childName}`, pageWidth / 2, 100, { align: 'center' });

  // Story details
  doc.setFontSize(11);
  doc.setTextColor(196, 181, 253);
  doc.text(`Style: ${story.style} | Lesson: ${story.moralLesson}`, pageWidth / 2, 120, { align: 'center' });
  doc.text(`Reading Time: ~${story.readingTimeMinutes} mins | Age: ${story.childAge}`, pageWidth / 2, 128, { align: 'center' });

  doc.setTextColor(253, 230, 138);
  doc.text('⭐ DreamTales Bedtime Edition ⭐', pageWidth / 2, pageHeight - 30, { align: 'center' });

  // Story Pages
  story.pages.forEach((page) => {
    doc.addPage();

    // Background header band
    doc.setFillColor(243, 232, 255);
    doc.rect(0, 0, pageWidth, 25, 'F');

    doc.setFillColor(139, 92, 246);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`DreamTales - Page ${page.pageNumber}`, margin, 16);

    // Page text body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);

    const splitText = doc.splitTextToSize(page.content, pageWidth - margin * 2);
    doc.text(splitText, margin, 45);

    // Prompt badge box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, pageHeight - 50, pageWidth - margin * 2, 30, 3, 3, 'F');

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Illustration Concept (${story.illustrationStyle} style):`, margin + 5, pageHeight - 40);
    const splitPrompt = doc.splitTextToSize(page.imagePrompt, pageWidth - margin * 2 - 10);
    doc.text(splitPrompt, margin + 5, pageHeight - 33);
  });

  doc.save(`${story.childName}_${story.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
};
