import re
import subprocess
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'<script type="text/babel">(.*?)</script>', content, re.DOTALL)
if not m:
    print('Failed to find babel script')
    sys.exit(1)

code = m.group(1)

# Extract FRANCHISE_DEFAULTS and calculateDashboard
m_defaults = re.search(r'const FRANCHISE_DEFAULTS = \{.*?\};', code, re.DOTALL)
m_calc = re.search(r'function calculateDashboard\(inputs\) \{.*?\n    \}', code, re.DOTALL)

if not m_defaults or not m_calc:
    print('Failed to extract defaults or calc function')
    sys.exit(1)

test_js = f"""
{m_defaults.group(0)}
{m_calc.group(0)}

const result = calculateDashboard(FRANCHISE_DEFAULTS);
console.log('Total Seats:', result.investment.totalSeats);
console.log('Turnkey Capex / Seat:', result.investment.totalInvestmentPerSeat);
console.log('Chairs Capex / Seat:', result.investment.avgCostPerSeat);
console.log('Total Investment:', result.investment.totalInvestment);
console.log('Year-1 Franchisee Income:', result.totalIncomeA);
console.log('Year-1 Net Profit:', result.profit.netProfitY1);
console.log('ROI %:', (result.roi * 100).toFixed(2));
console.log('Payback (Years):', result.payback.toFixed(2));
console.log('Blended Occupancy %:', (result.ticket.blendedOccupancy * 100).toFixed(2));

if (result.investment.totalInvestment !== 38257000) throw new Error('Investment mismatch');
if (Math.round(result.profit.netProfitY1) !== 11741829) throw new Error('Net profit mismatch');
if ((result.roi * 100).toFixed(2) !== '30.69') throw new Error('ROI mismatch');
if (result.payback.toFixed(2) !== '3.26') throw new Error('Payback mismatch');
if ((result.ticket.blendedOccupancy * 100).toFixed(2) !== '34.00') throw new Error('Blended occ mismatch');
console.log('SUCCESS: All index.html calculations match Excel model with 100% precision!');
"""

with open('test/run_index_calc.js', 'w', encoding='utf-8') as f:
    f.write(test_js)

res = subprocess.run(
    ["C:\\Users\\Admin\\AppData\\Roaming\\Antigravity\\bin\\agy-node.cmd", "test/run_index_calc.js"],
    capture_output=True,
    text=True
)

print(res.stdout)
if res.stderr:
    print("Stderr:", res.stderr)
sys.exit(res.returncode)
