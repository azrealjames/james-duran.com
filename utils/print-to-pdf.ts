"use client"

/**
 * Opens a new window with the content of the specified element,
 * styled for printing, and triggers the browser's print dialog.
 */
export const printToPDF = (elementId: string, title = "James Duran - Resume") => {
  // Get the element to print
  const element = document.getElementById(elementId)
  if (!element) {
    console.error(`Element with ID "${elementId}" not found`)
    return false
  }

  // Create a new window
  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert("Please allow popups for this website to download the resume")
    return false
  }

  // Get the styles from the current page to maintain appearance
  const styles = Array.from(document.styleSheets)
    .filter((styleSheet) => {
      try {
        // Filter out cross-origin stylesheets
        return styleSheet.cssRules && styleSheet.cssRules.length > 0
      } catch (e) {
        return false
      }
    })
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n")
      } catch (e) {
        return ""
      }
    })
    .join("\n")

  // Get the HTML content
  const content = element.innerHTML

  // Write the HTML to the new window
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          /* Base styles */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            color: #000;
            background: #fff;
            padding: 20mm;
            margin: 0;
          }
          
          /* Resume specific styles */
          h1, h2, h3, h4 {
            color: #000;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          
          h1 { font-size: 24px; }
          h2 { font-size: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          h3 { font-size: 18px; }
          
          p, li {
            color: #333;
            margin-bottom: 0.5em;
          }
          
          ul {
            padding-left: 20px;
          }
          
          a {
            color: #3b82f6;
            text-decoration: none;
          }
          
          .text-muted-foreground {
            color: #4b5563 !important;
          }
          
          .font-medium, .font-bold {
            font-weight: bold;
          }
          
          .italic {
            font-style: italic;
          }
          
          .mb-2, .mb-4, .mb-6, .mb-8 {
            margin-bottom: 1em;
          }
          
          .mt-1, .mt-2 {
            margin-top: 0.5em;
          }
          
          .space-y-1 > * + *, .space-y-2 > * + * {
            margin-top: 0.5em;
          }
          
          /* Print-specific styles */
          @media print {
            body {
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            button, .download-btn-container {
              display: none !important;
            }
            
            a {
              text-decoration: none !important;
            }
            
            @page {
              margin: 15mm;
            }
          }
          
          /* Additional custom styles */
          .resume-header {
            text-align: center;
            margin-bottom: 2em;
          }
          
          .section {
            margin-bottom: 1.5em;
          }
          
          .job-title {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          
          .job-title h3 {
            margin-bottom: 0;
          }
          
          .job-date {
            font-weight: normal;
            color: #4b5563;
          }
          
          /* Hide elements not needed in print */
          .download-btn-container, button {
            display: none !important;
          }
        </style>
      </head>
      <body>
        <div class="resume-container">
          ${content}
        </div>
        <script>
          // Auto-print when loaded
          window.onload = function() {
            setTimeout(() => {
              window.print();
              // Don't close the window immediately to allow the user to cancel if needed
            }, 500);
          };
        </script>
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()

  return true
}
