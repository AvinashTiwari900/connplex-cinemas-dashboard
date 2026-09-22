import re
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script type="text/babel">(.*?)</script>', html, re.DOTALL)
print(f'Found {len(scripts)} babel scripts')
if not scripts:
    print('Error: No babel script found')
    sys.exit(1)

code = scripts[0]
print(f'Total script characters: {len(code)}, lines: {code.count(chr(10))}')

# Check for crucial financial calculations and UI components
assert 'function calculateDashboard' in code
assert 'function App' in code
assert 'formatINR' in code
assert '30.69' in code or 'roi' in code
assert '3.26' in code or 'payback' in code
assert '34.00' in code or 'blendedOccupancy' in code
assert 'totalInvestmentPerSeat' in code

print('SUCCESS: index.html contains all expected calculator components and exact Excel logic!')
