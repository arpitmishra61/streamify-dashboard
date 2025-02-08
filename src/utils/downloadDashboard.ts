import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadDashboard = async () => {
  try {
    const dashboard = document.getElementById("dashboard-content");
    if (!dashboard) return;

    // Show a loading message
    const loadingToast = document.createElement("div");
    loadingToast.style.position = "fixed";
    loadingToast.style.top = "20px";
    loadingToast.style.right = "20px";
    loadingToast.style.padding = "10px 20px";
    loadingToast.style.background = "#3182CE";
    loadingToast.style.color = "white";
    loadingToast.style.borderRadius = "4px";
    loadingToast.style.zIndex = "9999";
    loadingToast.textContent = "Generating PDF...";
    document.body.appendChild(loadingToast);

    // Capture the dashboard content
    const canvas = await html2canvas(dashboard, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: "#F7FAFC",
    });

    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");

    // Add title
    pdf.setFontSize(16);
    pdf.text("Streamify Dashboard Report", 105, 15, { align: "center" });

    // Add timestamp
    pdf.setFontSize(10);
    const timestamp = new Date().toLocaleString();
    pdf.text(`Generated on: ${timestamp}`, 105, 22, { align: "center" });

    // Add the dashboard image
    pdf.addImage(imgData, "PNG", 0, 30, imgWidth, imgHeight);

    // Save the PDF
    pdf.save("streamify-dashboard.pdf");

    // Remove loading message
    document.body.removeChild(loadingToast);

    // Show success message
    const successToast = document.createElement("div");
    successToast.style.position = "fixed";
    successToast.style.top = "20px";
    successToast.style.right = "20px";
    successToast.style.padding = "10px 20px";
    successToast.style.background = "#38A169";
    successToast.style.color = "white";
    successToast.style.borderRadius = "4px";
    successToast.style.zIndex = "9999";
    successToast.textContent = "PDF downloaded successfully!";
    document.body.appendChild(successToast);

    // Remove success message after 3 seconds
    setTimeout(() => {
      document.body.removeChild(successToast);
    }, 3000);
  } catch (error) {
    console.error("Error generating PDF:", error);

    // Show error message
    const errorToast = document.createElement("div");
    errorToast.style.position = "fixed";
    errorToast.style.top = "20px";
    errorToast.style.right = "20px";
    errorToast.style.padding = "10px 20px";
    errorToast.style.background = "#E53E3E";
    errorToast.style.color = "white";
    errorToast.style.borderRadius = "4px";
    errorToast.style.zIndex = "9999";
    errorToast.textContent = "Error generating PDF. Please try again.";
    document.body.appendChild(errorToast);

    // Remove error message after 3 seconds
    setTimeout(() => {
      document.body.removeChild(errorToast);
    }, 3000);
  }
};
