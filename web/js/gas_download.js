// DOWNLOAD TABLE with pdfMaker

// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js" integrity="sha512-a9NgEEK7tsCvABL7KqtUTQjl69z7091EVPpw5KxPlZ93T141ffe1woLtbXTX+r2/8TtTvRX/v4zTL2UlMUPgwg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.min.js" integrity="sha512-P0bOMePRS378NwmPDVPU455C/TuxDS+8QwJozdc7PGgN8kLqR4ems0U/3DeJkmiE31749vYWHvBOtR+37qDCZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

// Downloading detailed calculation
function downloadDetailCalculation() {

  // data for detailed calculation result
  const gCompany = document.getElementById("comp").rows[0].cells[0].innerHTML;
  const gContract = document.getElementById("comp").rows[0].cells[1].innerHTML;
  const gUsageMWh = document.getElementById("comp").rows[0].cells[2].innerHTML;
  const gMonths = document.getElementById("comp").rows[0].cells[3].innerHTML;
  const gTotal = document.getElementById("comp").rows[0].cells[4].innerHTML;
  const gAdvance = document.getElementById("comp").rows[0].cells[5].innerHTML;
  const gUsageRange = document.getElementById("comp").rows[0].cells[6].innerHTML;
  const gUsageM3 = document.getElementById("comp").rows[0].cells[7].innerHTML;
  const gCost = document.getElementById("comp").rows[0].cells[8].innerHTML;
  const gCostDistxMonths = document.getElementById("comp").rows[0].cells[9].innerHTML;
  const gCostDist = document.getElementById("comp").rows[0].cells[10].innerHTML;

  var dd = {
      header: { text: euDate(), style: 'header'},
      footer: {text: "Kalkulačka by WebCognito.com", style: 'footer'},
      watermark: {text: "WebCognito.com", color: '#0e6dfc', opacity: 0.05},
      
      content: [
          {text: 'Plyn - Vaše Údaje a Cena', margin: [0, 0, 0, 10], style: 'title'},
          {   
              style: 'table',
              table: {
                  margin: [0, 15, 0, 20], // left , top, right, bottom
                  widths: ['17%', '17%', '16%', '16%', '17%', '17%'],
                  heights: [0, 0, 0, 0, 0, 0, 12, 0, 0, 12],
                  body: [
                          [
                              {text: 'Dodavatel', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}, 
                              {text: 'Smlouva', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}, 
                              {text: 'Roční odběr', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}
                          ],
                          [
                              {text: gCompany, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gContract, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gUsageRange, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}
                          ],
                          [
                              {text: '', colSpan: 2, fillColor: '#fffe72', border: [true, false, false, false]}, 
                              {},  
                              {text: 'Spotřeba Plynu', colSpan: 2, fillColor: '#fffe72', border: [false, false, false, false], style: 'firstRow'},  
                              {}, 
                              {text: '', colSpan: 2, fillColor: '#fffe72', border: [false, false, true, false]},
                              {}
                          ],
                          [
                              {text: gUsageM3 + ' m3', colSpan: 3, fillColor: '#fffe72', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}, 
                              {text: gUsageMWh + ' MWh', colSpan: 3, fillColor: '#fffe72', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}
                          ],
                          [
                              {text: 'Cena za Plyn', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}, 
                              {text: 'Stálá Platba', colSpan: 4, border: [true, true, true, false], style: 'firstRow'},  
                              {}, 
                              {},  
                              {}
                          ],
                          
                          [
                              {text: gCost + ' Kč', colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gCostDistxMonths + ' Kč za ' + gMonths + ' měsícu', colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gCostDist + ' Kč za měsíc', colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}
                          ],
                          [
                              {text: '', colSpan: 3, border: [true, false, true, false]}, 
                              {},  
                              {},  
                              {text: '', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, false]}, 
                              {},
                              {}
                          ], 
                          [
                              {text: 'Měsíčna Záloha', colSpan: 3, border: [true, false, true , false], style: 'firstRow'}, 
                              {},
                              {}, 
                              {text: 'Celková Cena za ' + gMonths + ' měsícu', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, false], style: 'firstRow'}, 
                              {}, 
                              {}
                          ],
                          [
                              {text: gAdvance + ' Kč', colSpan: 3, border: [true, false, true, false], alignment: 'center'}, 
                              {}, 
                              {}, 
                              {text: gTotal + ' Kč', colSpan: 3, fillColor: '#ff9999', fontSize: 15, bold: true, border: [true, false, true, false], decoration: 'underline', decorationStyle: 'double', alignment: 'center'}, 
                              {}, 
                              {}
                          ],
                          [
                              {text: '', colSpan: 3, border: [true, false, true, true]}, 
                              {},  
                              {},  
                              {text: '', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, true], alignment: 'center'}, 
                              {},
                              {}
                          ],      
                  ]
              },
          
              layout: '',
          },
      ],
      styles: {
          title: {
              alignment: 'center',
              fontSize: 23,
              bold: true,
              margin: [0, 30, 0, 0],
              color: '#0e6dfc',
          },
          header: {
              alignment: "right", 
              margin: [0, 10, 20, 0],
          },
          footer: {
              alignment: "center", 
              margin: [0, 10, 0, 0],
          },
          firstRow: {
               
              alignment: 'center', 
              bold: true, 
              fontSize: 14, 
               
              decoration: 'underline',
              
          },
      },
  };
pdfMake.createPdf(dd).download(pdfNameCalc().toString());
}

// Download Comparison Table
function downloadComparision() {
  // get data from local storage 
  // Format: [{company: "PRE", contract: "1 year", usage: "3", months: "12", total: "2400", advance: "200"}]
  const gRows = getFromLocalStorage();
  
  // Columns display order
  let columns = ['company', 'contract', 'usage', 'months', 'total', 'advance'];

  tableLayouts = {
      compTable:{
          fillColor: function cellFill(rowIndex) {
              if (rowIndex === 0) {
                  return '#0e6dfc';
              }
              return (rowIndex %2 === 0) ? '#fffe72' : null;
          }
      }
  };
// Document Definitions
  var dd = {
      header: { text: euDate(), style: 'header'},
      footer: {text: "Kalkulačka by WebCognito.com", style: 'footer'},
      watermark: {text: "WebCognito.com", color: '#0e6dfc', opacity: 0.05},
      
      content: [
        // Title   
        {text: 'Porovnání Nákladů na Plyn', style: 'title'},
        // Defining the table
          {   
              style: 'table',
              table: {
                  margin: [0, 20, 0, 0], // left , top, right, bottom
                  headerRows: 1,
                  widths: ['20%', '16%', '15%', '10%', '*', '19%'],
                  //Function to build table
                  body: buildTableBody(
                          // External Data
                          gRows,
                          // Columns display order
                          columns,
                          // Show headers?
                          true,
                          // Custom table headers 
                          [{text: 'Dodavatel', fontSize: 12, color:'white', alignment: 'left', alignmentChild: 'left'},
                          {text: 'Smlouva', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Spotřeba (MWh)', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsícu', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Celková Cena (Kč)', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsíčna Záloha (Kč)', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'}]
                          )
              },
              // Layout defined outside doc definition (dd)
              layout:tableLayouts.compTable
          },
      ],
      styles: {
          title: {
              alignment: 'center',
              fontSize: 23,
              bold: true,
              margin: [0, 10],
              color: '#0e6dfc',
          },
          header: {
              alignment: "right", 
              margin: [0, 10, 20, 0],
          },
          footer: {
              alignment: "center", 
              margin: [0, 10, 0, 0],
          },
      },
  };
 // Create pdf and download
  pdfMake.createPdf(dd, tableLayouts).download(pdfNameComp().toString());
}

// Downloading both detail and comparision table
function downloadDetailWithComp() {
  
  // data for detailed calculation result
  const gCompany = document.getElementById("comp").rows[0].cells[0].innerHTML;
  const gContract = document.getElementById("comp").rows[0].cells[1].innerHTML;
  const gUsageMWh = document.getElementById("comp").rows[0].cells[2].innerHTML;
  const gMonths = document.getElementById("comp").rows[0].cells[3].innerHTML;
  const gTotal = document.getElementById("comp").rows[0].cells[4].innerHTML;
  const gAdvance = document.getElementById("comp").rows[0].cells[5].innerHTML;
  const gUsageRange = document.getElementById("comp").rows[0].cells[6].innerHTML;
  const gUsageM3 = document.getElementById("comp").rows[0].cells[7].innerHTML;
  const gCost = document.getElementById("comp").rows[0].cells[8].innerHTML;
  const gCostDistxMonths = document.getElementById("comp").rows[0].cells[9].innerHTML;
  const gCostDist = document.getElementById("comp").rows[0].cells[10].innerHTML;

  // data for comparision table
  const gRows = getFromLocalStorage();
  let columns = ['company', 'contract', 'usage', 'months', 'total', 'advance'];
  
  // layout function for comp table
  tableLayouts = {
      tableLayout:{
          fillColor: function cellFill(rowIndex) {
              if (rowIndex === 0) {
                  return '#0e6dfc';
              }
              return (rowIndex %2 === 0) ? '#fffe72' : null;
          }
      }
  };

  var dd = {
      header: { text: euDate(), style: 'header'},
      footer: {text: "Kalkulačka by WebCognito.com", style: 'footer'},
      watermark: {text: "WebCognito.com", color: '#0e6dfc', opacity: 0.05},
      
      content: [
          // Detailed table
          {text: 'Plyn - Vaše Údaje a Cena', margin: [0, 0, 0, 10], style: 'title'},
          {   
              style: 'table',
              table: {
                  margin: [0, 15, 0, 20], // left , top, right, bottom
                  widths: ['17%', '17%', '16%', '16%', '17%', '17%'],
                  heights: [0, 0, 0, 0, 0, 0, 12, 0, 0, 12],
                  body: [
                          [
                              {text: 'Dodavatel', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}, 
                              {text: 'Smlouva', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}, 
                              {text: 'Roční odběr', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}
                          ],
                          [
                              {text: gCompany, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gContract, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gUsageRange, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}
                          ],
                          [
                              {text: '', colSpan: 2, fillColor: '#fffe72', border: [true, false, false, false]}, 
                              {},  
                              {text: 'Spotřeba Plynu', colSpan: 2, fillColor: '#fffe72', border: [false, false, false, false], style: 'firstRow'},  
                              {}, 
                              {text: '', colSpan: 2, fillColor: '#fffe72', border: [false, false, true, false]},
                              {}
                          ],
                          [
                              {text: gUsageM3 + ' m3', colSpan: 3, fillColor: '#fffe72', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}, 
                              {text:  gUsageMWh + ' MWh', colSpan: 3, fillColor: '#fffe72', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}
                          ],
                          [
                              {text: 'Cena za Plyn', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}, 
                              {text: 'Stálá Platba', colSpan: 4, border: [true, true, true, false], style: 'firstRow'},  
                              {}, 
                              {},  
                              {}
                          ],
                          
                          [
                              {text: gCost + ' Kč', colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gCostDistxMonths + ' Kč za ' + gMonths + ' měsícu', colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: gCostDist + ' Kč za měsíc', colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}
                          ],
                          [
                              {text: '', colSpan: 3, border: [true, false, true, false]}, 
                              {},  
                              {},  
                              {text: '', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, false]}, 
                              {},
                              {}
                          ], 
                          [
                              {text: 'Měsíčna Záloha', colSpan: 3, border: [true, false, true , false], style: 'firstRow'}, 
                              {},
                              {}, 
                              {text: 'Celková Cena za ' + gMonths + ' měsícu', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, false], style: 'firstRow'}, 
                              {}, 
                              {}
                          ],
                          [
                              {text: gAdvance + ' Kč', colSpan: 3, border: [true, false, true, false], alignment: 'center'}, 
                              {}, 
                              {}, 
                              {text: gTotal + ' Kč', colSpan: 3, fillColor: '#ff9999', fontSize: 15, bold: true, border: [true, false, true, false], decoration: 'underline', decorationStyle: 'double', alignment: 'center'}, 
                              {}, 
                              {}
                          ],
                          [
                              {text: '', colSpan: 3, border: [true, false, true, true]}, 
                              {},  
                              {},  
                              {text: '', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, true], alignment: 'center'}, 
                              {},
                              {}
                          ],      
                  ]
              },
          
              layout: '',

          },
          // Comparision table
          {text: 'Porovnání Nákladů na Plyn', margin: [0, 30, 0, 10], style: 'title'},
          {   
              style: 'table',
              table: {
                  margin: [0, 20, 0, 0], // left , top, right, bottom
                  headerRows: 1,
                  widths: ['20%', '16%', '15%', '10%', '*', '19%'],
              
                  body: buildTableBody(
                          // External Data
                          gRows,
                          // Columns display order 
                          columns,
                          // Show headers?
                          true,
                          // Custom headers
                          [{text: 'Dodavatel', fontSize: 12, color:'white', alignment: 'left', alignmentChild: 'left'},
                          {text: 'Smlouva', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Spotřeba (MWh)', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsícu', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Celková Cena (Kč)', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsíčna Záloha (Kč)', fontSize: 12, color: 'white', alignment: 'center', alignmentChild: 'center'}]
                          )
              },
              layout:tableLayouts.tableLayout
          },
      ],
      styles: {
          title: {
              alignment: 'center',
              fontSize: 23,
              bold: true,
              margin: [0, 30, 0, 0],
              color: '#0e6dfc',
          },
          header: {
              alignment: "right", 
              margin: [0, 10, 20, 0],
          },
          footer: {
              alignment: "center", 
              margin: [0, 10, 0, 0],
          },
          firstRow: {
               
              alignment: 'center', 
              bold: true, 
              fontSize: 14, 
               
              decoration: 'underline',
              
          },
      },
  };

pdfMake.createPdf(dd, tableLayouts).download(pdfNameCalcComp().toString());
}
// Building table body
function buildTableBody(data, columns, showHeaders, headers) {
  const body = [];
  // Inserting headers
  if (showHeaders) {
    body.push(headers);
  }

  // Inserting items from external data array
  data.forEach(function(row) {
    const dataRow = [];
    let i = 0;

    columns.forEach(function(column) {
      dataRow.push({text: row[column].toString(), alignment: headers[i].alignmentChild});
      i++;
    })

    body.push(dataRow);

  });

  return body;
}
// Display date in format '21.05.2023'
function euDate() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  date = day + "/" + month + "/" + year;
  return date
}
// Generate Pdf download name 2023_5_21_*.pdf
function pdfNameCalc() {
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  downloadName = year + "_" + month + "_" + day + "_Plyn_Vypocet.pdf";
  return downloadName
}
function pdfNameComp() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    downloadName = year + "_" + month + "_" + day + "_Plyn_Srovnani.pdf";
    return downloadName
  }
  function pdfNameCalcComp() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    downloadName = year + "_" + month + "_" + day + "_Plyn.pdf";
    return downloadName
  }
