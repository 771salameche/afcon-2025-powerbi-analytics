import html2canvas from 'html2canvas';

/**
 * Exports a given HTML element (typically a chart container) as a PNG image.
 * It uses html2canvas to render the DOM element onto a canvas, then converts
 * the canvas content to a PNG data URL and triggers a download.
 *
 * @param {HTMLElement} element - The DOM element to be exported.
 * @param {string} fileName - The desired filename for the PNG image (e.g., 'my-chart.png').
 * @returns {Promise<void>} A promise that resolves when the download is initiated.
 */
export const exportChartAsPng = async (element, fileName) => {
  try {
    // Temporarily apply a white background to ensure charts look good on export
    // regardless of dark mode or transparent parent backgrounds.
    const originalBackgroundColor = element.style.backgroundColor;
    element.style.backgroundColor = 'white';

    const canvas = await html2canvas(element, {
      useCORS: true, // Important for images loaded from different origins (e.g., logos)
      scale: 2,     // Increase scale for higher resolution image
    });

    // Revert background color
    element.style.backgroundColor = originalBackgroundColor;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting chart as PNG:', error);
    alert('Failed to export chart. Please try again.');
  }
};
