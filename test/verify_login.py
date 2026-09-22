import re
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

assert 'function LoginPage' in html, 'Missing LoginPage component'
assert 'reports@theconnplex.com' in html, 'Missing hardcoded ID'
assert 'Franchise@8966' in html, 'Missing hardcoded password'
assert 'function DashboardApp' in html, 'Missing DashboardApp component'
assert 'function App()' in html, 'Missing root App component'
assert 'onLogout' in html, 'Missing onLogout handler'
assert 'localStorage.getItem(\'connplex_auth_user\')' in html, 'Missing auth storage check'

# Verify there is NO demo login button or quickfill
assert 'demo login' not in html.lower(), 'Found unwanted demo login reference'
assert 'demologin' not in html.lower(), 'Found unwanted demologin reference'
assert 'quick fill' not in html.lower(), 'Found unwanted quick fill reference'

print('SUCCESS: LoginPage and hardcoded authentication verified without any demo login!')
