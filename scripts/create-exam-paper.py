import csv
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate
from reportlab.platypus.tables import Table,TableStyle,colors
from random import randrange,shuffle

setting_shuffle_words=True
setting_column_headers=['V1', 'V2', 'V3']
setting_csv_verb_file_path='../data/verbs.csv'
setting_export_pdf_path='irregular_verb_exam.pdf'
setting_blank_random_form=True

def get_from_csv():
    list_of_verbs = [];
    with open(setting_csv_verb_file_path) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                list_of_verbs.append((row[0], row[1], row[2]))
                line_count += 1
        print(f'Processed {line_count} lines.')
    return list_of_verbs

def insert_blanks(list_of_verbs):
    list_of_blanks_and_verbs = []
    blnk = "__________________"
    for v in list_of_verbs:
        first_form = blnk
        if setting_blank_random_form:
            nonblank = randrange(3)
        
            if nonblank == 0:
                blanks_and_verb = (v[0], blnk, blnk)
            elif nonblank == 1:
                blanks_and_verb = (blnk, v[1], blnk)
            else:
                blanks_and_verb = (blnk, blnk, v[2])
        else:
            blanks_and_verb = (v[0], blnk, blnk)

        list_of_blanks_and_verbs.append(blanks_and_verb)
    return list_of_blanks_and_verbs

def generate_pdf(list_of_verbs):
    my_data = list_of_verbs
    my_data.insert(0, setting_column_headers) # add headers
    my_doc=SimpleDocTemplate(setting_export_pdf_path,pagesize=A4)
    c_width=[60*mm,60*mm,60*mm]
    t=Table(my_data,rowHeights=20,repeatRows=1,colWidths=c_width)
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.lightgrey),
    ('FONTSIZE',(0,0),(-1,-1),9)]))
    elements=[]
    elements.append(t)
    my_doc.build(elements) 

list_of_verbs = get_from_csv()
list_of_blanks_and_verbs = insert_blanks(list_of_verbs)

if setting_shuffle_words:
    # randomize order of verbs
    shuffle(list_of_blanks_and_verbs)

generate_pdf(list_of_blanks_and_verbs)
