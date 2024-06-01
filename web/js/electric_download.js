// DOWNLOAD E-TABLE with pdfMaker

// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js" integrity="sha512-a9NgEEK7tsCvABL7KqtUTQjl69z7091EVPpw5KxPlZ93T141ffe1woLtbXTX+r2/8TtTvRX/v4zTL2UlMUPgwg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.min.js" integrity="sha512-P0bOMePRS378NwmPDVPU455C/TuxDS+8QwJozdc7PGgN8kLqR4ems0U/3DeJkmiE31749vYWHvBOtR+37qDCZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

// Downloading detailed calculation
function downloadDetailCalculation() {

  // data for detailed calculation result
  const eCompany = document.getElementById("comp").rows[0].cells[0].innerHTML;
  const eContract = document.getElementById("comp").rows[0].cells[1].innerHTML;
  const eDistCode = document.getElementById("comp").rows[0].cells[2].innerHTML;
  const eUsageVT = document.getElementById("comp").rows[0].cells[3].innerHTML;
  const eUsageNT = document.getElementById("comp").rows[0].cells[4].innerHTML;
  const eMainBreaker = document.getElementById("comp").rows[0].cells[5].innerHTML;
  const ePhases = document.getElementById("comp").rows[0].cells[6].innerHTML;
  const eCostVT = document.getElementById("comp").rows[0].cells[7].innerHTML;
  const eCostNT = document.getElementById("comp").rows[0].cells[8].innerHTML;
  const eCostMonth = document.getElementById("comp").rows[0].cells[9].innerHTML;
  const ePoze = document.getElementById("comp").rows[0].cells[10].innerHTML;
  const eNumberOfMonths = document.getElementById("comp").rows[0].cells[11].innerHTML;
  const eTotal = document.getElementById("comp").rows[0].cells[12].innerHTML;
  const eAdvance = document.getElementById("comp").rows[0].cells[13].innerHTML;

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
                              {text: 'Dist. sazba', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}
                            ],
                            [
                              {text: eCompany, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: eContract, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: eDistCode, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}
                            ],
                            [
                              {text: '', colSpan: 2, fillColor: '#0e6dfc', border: [true, false, false, false]}, 
                              {},  
                              {text: 'Spotřeba Elektřiny', colSpan: 2, color:'white', fillColor: '#0e6dfc', border: [false, false, false, false], style: 'firstRow'},  
                              {}, 
                              {text: '', colSpan: 2, fillColor: '#0e6dfc', border: [false, false, true, false]},
                              {}
                            ],
                            [
                                {text: 'Vysoký Tarif', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, false], style: 'firstRow'}, 
                                {}, 
                                {}, 
                                {text: 'Nizky Tarif', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, false], style: 'firstRow'}, 
                                {}, 
                                {}
                              ],
                            [
                              {text: eUsageVT + ' MWh', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}, 
                              {text: eUsageNT + ' MWh', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}
                            ],
                            [
                              {text: 'Hlavní jističe', colSpan: 3, border: [true, false, true, false], style: 'firstRow'}, 
                              {},  
                              {},  
                              {text: 'Počet fází', colSpan: 3, border: [true, false, true, false], style: 'firstRow'}, 
                              {},
                              {}
                            ], 
                            [
                              {text: eMainBreaker + ' A', colSpan: 3, border: [true, false, true , false], alignment: 'center'}, 
                              {},
                              {}, 
                              {text: ePhases, colSpan: 3, fillColor: '', border: [true, false, true, false], alignment: 'center'}, 
                              {}, 
                              {}
                            ],
                            [
                              {text: 'Cena za Vysoký Tarif', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, true, true, false], style: 'firstRow'}, 
                              {},
                              {},
                              {text: 'Cena za Nizky Tarif', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, true, true, false], style: 'firstRow'}, 
                              {},  
                              {}
                            ],
                            [
                              {text: eCostVT + ' Kč', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {},
                              {},
                              {text: eCostNT + ' Kč', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}
                            ],
                            [
                              {text: 'Měsíční platby', colSpan: 3, border: [true, true, true, false], style: 'firstRow'}, 
                              {},
                              {},
                              {text: 'POZE', colSpan: 3, border: [true, true, true, false], style: 'firstRow'}, 
                              {},  
                              {}
                            ],
                            [
                              {text: eCostMonth + ' Kč', colSpan: 3, border: [true, false, true, true], alignment: 'center'}, 
                              {},
                              {},
                              {text: ePoze + ' Kč', colSpan: 3, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
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
                                {text: 'Celková Cena za ' + eNumberOfMonths + ' měsícu', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, false], style: 'firstRow'}, 
                                {}, 
                                {}
                            ],
                            [
                                {text: eAdvance + ' Kč', colSpan: 3, border: [true, false, true, false], alignment: 'center'}, 
                                {}, 
                                {}, 
                                {text: eTotal + ' Kč', colSpan: 3, fillColor: '#ff9999', fontSize: 15, bold: true, border: [true, false, true, false], decoration: 'underline', decorationStyle: 'double', alignment: 'center'}, 
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
  const eRows = getFromLocalStorage();

  // Columns display order
  let columns = ['company', 'contract', 'usageVT', 'usageNT', 'months', 'total', 'advance'];

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
        {text: 'Porovnání Nákladů na Elektřinu', style: 'title'},
        // Defining the table
          {   
              style: 'table',
              table: {
                  margin: [0, 20, 0, 0], // left , top, right, bottom
                  headerRows: 1,
                  widths: ['15%', '19%', '13%', '13%', '*', '18%', '17%'],
                  //Function to build table
                  body: buildTableBody(
                          // External Data
                          eRows,
                          // Columns display order
                          columns,
                          // Show headers?
                          true,
                          // Custom table headers 
                          [{text: 'Dodavatel', fontSize: 10, color:'white', alignment: 'left', alignmentChild: 'left'},
                          {text: 'Smlouva', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Spotřeba VT (MWh)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Spotřeba NT (MWh)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsícu', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Celková Cena (Kč)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsíčna Záloha (Kč)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'}]
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
  const eCompany = document.getElementById("comp").rows[0].cells[0].innerHTML;
  const eContract = document.getElementById("comp").rows[0].cells[1].innerHTML;
  const eDistCode = document.getElementById("comp").rows[0].cells[2].innerHTML;
  const eUsageVT = document.getElementById("comp").rows[0].cells[3].innerHTML;
  const eUsageNT = document.getElementById("comp").rows[0].cells[4].innerHTML;
  const eMainBreaker = document.getElementById("comp").rows[0].cells[5].innerHTML;
  const ePhases = document.getElementById("comp").rows[0].cells[6].innerHTML;
  const eCostVT = document.getElementById("comp").rows[0].cells[7].innerHTML;
  const eCostNT = document.getElementById("comp").rows[0].cells[8].innerHTML;
  const eCostMonth = document.getElementById("comp").rows[0].cells[9].innerHTML;
  const ePoze = document.getElementById("comp").rows[0].cells[10].innerHTML;
  const eNumberOfMonths = document.getElementById("comp").rows[0].cells[11].innerHTML;
  const eTotal = document.getElementById("comp").rows[0].cells[12].innerHTML;
  const eAdvance = document.getElementById("comp").rows[0].cells[13].innerHTML;

   // get data from local storage 
  // Format: [{company: "PRE", contract: "1 year", usageVT: "3", usageNT: "2", months: "12", total: "2400", advance: "200"}]
  const eRows = getFromLocalStorage();

  // Columns display order
  let columns = ['company', 'contract', 'usageVT', 'usageNT', 'months', 'total', 'advance'];
  
  // layout function for comp table
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
                              {text: 'Dist. sazba', colSpan: 2, border: [true, true, true, false], style: 'firstRow'}, 
                              {}
                            ],
                            [
                              {text: eCompany, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: eContract, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {text: eDistCode, colSpan: 2, border: [true, false, true, true], alignment: 'center'}, 
                              {}
                            ],
                            [
                              {text: '', colSpan: 2, fillColor: '#0e6dfc', border: [true, false, false, false]}, 
                              {},  
                              {text: 'Spotřeba Elektřiny', colSpan: 2, color:'white', fillColor: '#0e6dfc', border: [false, false, false, false], style: 'firstRow'},  
                              {}, 
                              {text: '', colSpan: 2, fillColor: '#0e6dfc', border: [false, false, true, false]},
                              {}
                            ],
                            [
                                {text: 'Vysoký Tarif', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, false], style: 'firstRow'}, 
                                {}, 
                                {}, 
                                {text: 'Nizky Tarif', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, false], style: 'firstRow'}, 
                                {}, 
                                {}
                              ],
                            [
                              {text: eUsageVT + ' MWh', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}, 
                              {text: eUsageNT + ' MWh', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}
                            ],
                            [
                              {text: 'Hlavní jističe', colSpan: 3, border: [true, false, true, false], style: 'firstRow'}, 
                              {},  
                              {},  
                              {text: 'Počet fází', colSpan: 3, border: [true, false, true, false], style: 'firstRow'}, 
                              {},
                              {}
                            ], 
                            [
                              {text: eMainBreaker + ' A', colSpan: 3, border: [true, false, true , false], alignment: 'center'}, 
                              {},
                              {}, 
                              {text: ePhases, colSpan: 3, fillColor: '', border: [true, false, true, false], alignment: 'center'}, 
                              {}, 
                              {}
                            ],
                            [
                              {text: 'Cena za Vysoký Tarif', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, true, true, false], style: 'firstRow'}, 
                              {},
                              {},
                              {text: 'Cena za Nizky Tarif', colSpan: 3, bold: true, color:'white', fillColor: '#0e6dfc', border: [true, true, true, false], style: 'firstRow'}, 
                              {},  
                              {}
                            ],
                            [
                              {text: eCostVT + ' Kč', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {},
                              {},
                              {text: eCostNT + ' Kč', colSpan: 3, color:'white', fillColor: '#0e6dfc', border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
                              {}
                            ],
                            [
                              {text: 'Měsíční platby', colSpan: 3, border: [true, true, true, false], style: 'firstRow'}, 
                              {},
                              {},
                              {text: 'POZE', colSpan: 3, border: [true, true, true, false], style: 'firstRow'}, 
                              {},  
                              {}
                            ],
                            [
                              {text: eCostMonth + ' Kč', colSpan: 3, border: [true, false, true, true], alignment: 'center'}, 
                              {},
                              {},
                              {text: ePoze + ' Kč', colSpan: 3, border: [true, false, true, true], alignment: 'center'}, 
                              {}, 
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
                                {text: 'Celková Cena za ' + eNumberOfMonths + ' měsícu', colSpan: 3, fillColor: '#ff9999', border: [true, false, true, false], style: 'firstRow'}, 
                                {}, 
                                {}
                            ],
                            [
                                {text: eAdvance + ' Kč', colSpan: 3, border: [true, false, true, false], alignment: 'center'}, 
                                {}, 
                                {}, 
                                {text: eTotal + ' Kč', colSpan: 3, fillColor: '#ff9999', fontSize: 15, bold: true, border: [true, false, true, false], decoration: 'underline', decorationStyle: 'double', alignment: 'center'}, 
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
          {text: 'Porovnání Nákladů na Elektřinu', style: 'title'},
        // Defining the table
          {   
              style: 'table',
              table: {
                  margin: [0, 20, 0, 0], // left , top, right, bottom
                  headerRows: 1,
                  widths: ['15%', '19%', '13%', '13%', '*', '18%', '17%'],
                  //Function to build table
                  body: buildTableBody(
                          // External Data
                          eRows,
                          // Columns display order
                          columns,
                          // Show headers?
                          true,
                          // Custom table headers 
                          [{text: 'Dodavatel', fontSize: 10, color:'white', alignment: 'left', alignmentChild: 'left'},
                          {text: 'Smlouva', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Spotřeba VT (MWh)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Spotřeba NT (MWh)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsícu', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Celková Cena (Kč)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'},
                          {text: 'Měsíčna Záloha (Kč)', fontSize: 10, color: 'white', alignment: 'center', alignmentChild: 'center'}]
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
  downloadName = year + "_" + month + "_" + day + "_Elektrina_Vypocet.pdf";
  return downloadName
}
function pdfNameComp() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    downloadName = year + "_" + month + "_" + day + "_Elektrina_Srovnani.pdf";
    return downloadName
  }
  function pdfNameCalcComp() {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    downloadName = year + "_" + month + "_" + day + "_Elektrina.pdf";
    return downloadName
  }
