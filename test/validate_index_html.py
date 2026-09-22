import re
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

m = re.search(r'<script type="text/babel">(.*?)</script>', content, re.DOTALL)
if not m:
    print('ERROR: script text/babel not found in index.html!')
    sys.exit(1)

code = m.group(1)
print(f'Found script! Length: {len(code)} chars, {code.count(chr(10))} lines.')

# Basic sanity checks
required_tokens = [
    'calculateDashboard',
    'FRANCHISE_DEFAULTS',
    'formatINR',
    'formatPercent',
    'formatYears',
    'totalInvestmentPerSeat',
    'banquetGross',
    'activeTableTab',
    'ReactDOM.createRoot',
]

missing = [tok for tok in required_tokens if tok not in code]
if missing:
    print('ERROR: Missing tokens in script:', missing)
    sys.exit(1)

print('All required tokens present in index.html!')
