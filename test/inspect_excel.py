import sys
import zipfile
import xml.etree.ElementTree as ET
import re

sys.stdout.reconfigure(encoding='utf-8')

z = zipfile.ZipFile(r'source_reference/uploads/ConnPlex Signature - ROI Model (Investor Edition).xlsx')
ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

ss_xml = ET.fromstring(z.read('xl/sharedStrings.xml'))
strings = []
for si in ss_xml.findall('main:si', ns):
    t_el = si.find('main:t', ns)
    if t_el is not None and t_el.text:
        strings.append(t_el.text)
    else:
        text = ''.join([t.text or '' for t in si.findall('.//main:t', ns)])
        strings.append(text)

def get_sheet_cells(sheet_path):
    cells = {}
    s_xml = ET.fromstring(z.read(sheet_path))
    for row in s_xml.findall('.//main:row', ns):
        for c in row.findall('main:c', ns):
            coord = c.attrib.get('r')
            t = c.attrib.get('t')
            f_el = c.find('main:f', ns)
            v_el = c.find('main:v', ns)
            formula = f_el.text if f_el is not None else None
            val = v_el.text if v_el is not None else ''
            if t == 's' and val:
                val = strings[int(val)]
            cells[coord] = {'formula': formula, 'value': val}
    return cells

def coord_sort_key(c):
    digits = ''.join(filter(str.isdigit, c))
    letters = ''.join(filter(str.isalpha, c))
    return (int(digits) if digits else 0, letters)

for sheet_path, name in [
    ('xl/worksheets/sheet3.xml', 'Investment'),
    ('xl/worksheets/sheet2.xml', 'ROI Calculation'),
    ('xl/worksheets/sheet1.xml', 'Dashboard')
]:
    print(f"\n==================== {name} ====================")
    cells = get_sheet_cells(sheet_path)
    for coord in sorted(cells.keys(), key=coord_sort_key):
        item = cells[coord]
        f = item['formula']
        v = item['value']
        if f or (v and any(c.isdigit() for c in str(v))):
            print(f"{coord:5s} | Formula: {str(f):35s} | Value: {str(v)}")

