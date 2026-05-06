import jsPDF from 'jspdf';

export const generateResultPDF = (result) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('KET QUA BAI THI TRAC NGHIEM', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(14);
    doc.text('VOICES PRE-INTERMEDIATE A2-B1', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Student Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Ho ten: ${result.studentName}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Lop: ${result.studentClass}`, 20, yPosition);
    yPosition += 8;

    const minutes = Math.floor(result.timeTaken / 60);
    const seconds = result.timeTaken % 60;
    doc.text(`Thoi gian lam bai: ${minutes} phut ${seconds} giay`, 20, yPosition);
    yPosition += 15;

    // Score
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`DIEM: ${result.score.toFixed(2)}/10`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`So cau dung: ${result.correctCount}/50`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 6;
    doc.text(`So cau sai: ${result.incorrectCount}/50`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Questions
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CHI TIET CAU TRA LOI:', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    result.questions.forEach((q, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 40) {
            doc.addPage();
            yPosition = 20;
        }

        // Question number and status
        const status = q.isCorrect ? '[DUNG]' : '[SAI]';
        doc.setFont('helvetica', 'bold');
        doc.text(`Cau ${index + 1} ${status}`, 20, yPosition);
        yPosition += 6;

        // Question text (wrap if too long)
        doc.setFont('helvetica', 'normal');
        const questionLines = doc.splitTextToSize(q.questionText, pageWidth - 40);
        doc.text(questionLines, 20, yPosition);
        yPosition += questionLines.length * 5;

        // Student answer
        doc.text(`Ban chon: ${q.studentAnswer || 'Khong tra loi'}`, 20, yPosition);
        yPosition += 5;

        // Correct answer
        doc.text(`Dap an dung: ${q.correctAnswer}`, 20, yPosition);
        yPosition += 5;

        // Explanation (wrap if too long)
        const explanationLines = doc.splitTextToSize(`Giai thich: ${q.explanation}`, pageWidth - 40);
        doc.text(explanationLines, 20, yPosition);
        yPosition += explanationLines.length * 5 + 5;
    });

    // Save PDF
    doc.save(`KetQua_${result.studentName}_${Date.now()}.pdf`);
};
