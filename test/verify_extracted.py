import re
import subprocess
import json

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract script content
m = re.search(r'<script type="text/babel">(.*?)</script>', html, re.DOTALL)
if not m:
    print("No script found in index.html!")
    exit(1)

js_content = m.group(1)

# Let's extract FRANCHISE_DEFAULTS, calculateDashboard, validateInputs
script_to_run = """
""" + js_content + """

const defs = FRANCHISE_DEFAULTS;
const res = calculateDashboard(defs);

console.log(JSON.stringify({
    totalSeats: res.investment.totalSeats,
    totalInvestment: res.investment.totalInvestment,
    totalIncomeM: res.totalIncomeM,
    totalIncomeA: res.totalIncomeA,
    totalOpexM: res.opex.totalOpexM,
    totalOpexA: res.opex.totalOpexA,
    netProfitM: res.profit.netProfitM,
    netProfitY1: res.profit.netProfitY1,
    roi: res.roi,
    payback: res.payback,
    blendedOccupancy: res.ticket.blendedOccupancy,
    blendedAtp: res.ticket.blendedAtp,
    streams: res.streams,
    allocation: res.allocation,
    projections: res.projections
}, null, 2));
"""

# Since it has JSX, we can strip the React App component or just extract calculateDashboard and FRANCHISE_DEFAULTS
m_defs = re.search(r'const FRANCHISE_DEFAULTS = \{.*?\};', js_content, re.DOTALL)
m_calc = re.search(r'function calculateDashboard\(inputs\) \{.*?\n    \}', js_content, re.DOTALL)

test_node_code = f"""
{m_defs.group(0)}
{m_calc.group(0)}

const res = calculateDashboard(FRANCHISE_DEFAULTS);
console.log(JSON.stringify({{
    totalSeats: res.investment.totalSeats,
    totalInvestment: res.investment.totalInvestment,
    totalIncomeM: res.totalIncomeM,
    totalIncomeA: res.totalIncomeA,
    totalOpexM: res.opex.totalOpexM,
    totalOpexA: res.opex.totalOpexA,
    netProfitM: res.profit.netProfitM,
    netProfitY1: res.profit.netProfitY1,
    roi: res.roi,
    payback: res.payback,
    blendedOccupancy: res.ticket.blendedOccupancy,
    blendedAtp: res.ticket.blendedAtp,
    streams: res.streams,
    allocation: res.allocation,
    projections: res.projections
}}, null, 2));
"""

with open('test/test_extracted.js', 'w', encoding='utf-8') as f:
    f.write(test_node_code)

res = subprocess.run(
    ["C:\\Users\\Admin\\AppData\\Roaming\\Antigravity\\bin\\agy-node.cmd", "test/test_extracted.js"],
    capture_output=True,
    text=True
)
print("STDOUT:", res.stdout)
if res.stderr:
    print("STDERR:", res.stderr)
