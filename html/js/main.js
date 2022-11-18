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
          window.open(doc.output("bloburl"), "_blank");
          // doc.save(fileName)
        });
}


function generateExamPage() {
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
        
        var myHtml = '<table id="testtable">';
        for (var i = 0; i < rowsForms.length; i++) {
          myHtml += '<tr><td>' + rowsForms[i][0] + '</td><td data-correct="' + rowsForms[i][1] + '"><input class="verbform" /></td>';
          myHtml += '<td data-correct="' + rowsForms[i][2] + '"><input /></td></tr>';
        }
        myHtml += '</table>';
        $('#exampaper').html(myHtml);
      });
}

function checkExamPage() {
  $('input.verbform').each(function(index){
    correctForm = $(this).parent().getAttr('data-correct');
    if ($(this).val() != correctForm) {
      $(this).addClass('check-wrong');
      $(this).removeClass('check-right');
    } else {
      $(this).addClass('check-right');
      $(this).removeClass('check-wrong');
    }
  })
}
