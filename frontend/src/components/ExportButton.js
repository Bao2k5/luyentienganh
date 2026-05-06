import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { generateResultPDF } from '../utils/pdfGenerator';

const ExportButton = ({ result }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleExport = async () => {
        setIsGenerating(true);
        try {
            await generateResultPDF(result);
        } catch (error) {
            alert('Lỗi khi xuất PDF: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Download className="w-5 h-5" />
            {isGenerating ? 'Đang xuất...' : 'XUẤT KẾT QUẢ PDF'}
        </button>
    );
};

export default ExportButton;
