function generateExamPaper() {
    var url = '../data/verbs.csv';
    var rowsForms = [];
    fetch(url)
        .then(response => response.text())
        .then(text => {
          const rows = text.slice(text.indexOf('\n') + 1).split('\n');
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].length > 5) {
              vs = rows[i].split(',')
              rowsForms.push([vs[0], vs[1], vs[2]]);
            }
          }    
          rowsForms2 = rowsForms.sort(() => Math.random() - 0.5)
          const BLNK = '__________________'
          for (var i = 0; i < rowsForms.length; i++) {
            var rnd = Math.floor(Math.random() * 3);
            if (rnd == 0) {
              rowsForms[i][0] = BLNK
              rowsForms[i][1] = BLNK
            } else if (rnd == 1) {
              rowsForms[i][1] = BLNK
              rowsForms[i][2] = BLNK
            } else {
              rowsForms[i][0] = BLNK
              rowsForms[i][2] = BLNK
            }
          }
          var doc = new jsPDF();
          var head = [['V1', 'V2', 'V3']]
          var body = [
            ['fly', 'float', 'flitten'],
            ['nz', 'eu', 'uu'],
          ]
          body = rowsForms;
          doc.autoTable({ head: head, body: rowsForms })
          fileName = 'irregular-verb-exam-paper.pdf';
          //if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
            window.open(doc.output('bloburl', { filename: fileName }))
          //} else {
          //  doc.save(fileName)
          //}
        });
}
