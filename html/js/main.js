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
        testMode = "check23";
        if ($('#toggle12formblank').is(':checked')) {
          testMode = "check123";
        }
        const BLNK = '<input class="verbform" />';
        const rows = text.slice(text.indexOf('\n') + 1).split('\n');
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].length > 5) {
            vs = rows[i].split(',')
            rowsForms.push([vs[0], vs[1], vs[2]]);
          }
        }    
        rowsForms2 = rowsForms.sort(() => Math.random() - 0.5)
        
        var myHtml = '<table id="testtable">';
        for (var i = 0; i < rowsForms.length; i++) {
          if (testMode == "check23") {
            myHtml += '<tr><td data-correct="' + rowsForms[i][0] + '">' + rowsForms[i][0] + '</td><td data-correct="' + rowsForms[i][1] + '">' + BLNK + '</td>';
            myHtml += '<td data-correct="' + rowsForms[i][2] + '">' + BLNK + '</td></tr>';
          } else {
            var rnd = Math.floor(Math.random() * 3);
            if (rnd == 0) {
              rf1 = BLNK
              rf2 = BLNK
              rf3 = rowsForms[i][2]
            } else if (rnd == 1) {
              rf1 = rowsForms[i][0]
              rf2 = BLNK
              rf3 = BLNK
            } else {
              rf1 = BLNK
              rf2 = rowsForms[i][1]
              rf3 = BLNK
            }
            myHtml += '<tr><td data-correct="' + rowsForms[i][0] + '">' + rf1 + '</td><td data-correct="' + rowsForms[i][1] + '">' + rf2 + '</td>';
            myHtml += '<td data-correct="' + rowsForms[i][2] + '">' + rf3 + '</td></tr>';
          }
        }
        myHtml += '</table>';
        $('#exampaper').html(myHtml);
      });
}

function checkExamPage() {
  goodOnes = 0;
  badOnes = 0;
    
  $('input.verbform').each(function(index){
    correctForm = $(this).parent().data('correct');
    if ($(this).val() != correctForm) {
      $(this).addClass('check-wrong');
      $(this).removeClass('check-right');
      badOnes += 1;
    } else {
      $(this).addClass('check-right');
      $(this).removeClass('check-wrong');
      goodOnes += 1;
    }
  })

  $('.result').html('Correct: ' + goodOnes.toString() + ' / Wrong: ' + badOnes.toString());
  $('.result').removeClass('resultBad');
  $('.result').removeClass('resultGood');
  
  if (badOnes > 0) {
    $('.result').addClass('resultBad');
  } else {
    $('.result').addClass('resultGood');
  }
}

$('input.verbform').on("click", function() {
  $(this).removeClass('check-right');
  $(this).removeClass('check-right');
  $('.result').removeClass('resultBad');
  $('.result').removeClass('resultGood');
  $('.result').html('');
});
