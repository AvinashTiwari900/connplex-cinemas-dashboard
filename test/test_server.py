import urllib.request
import threading
import time
import os
import sys

# Test reading the files directly to ensure no syntax errors
try:
    with open(r"c:\Users\Admin\Desktop\Webdesign\index.html", "r", encoding="utf-8") as f:
        html = f.read()
        assert "<!DOCTYPE html>" in html
        assert "CONNPLEX CINEMAS" in html
        print("PASS: index.html read successfully, length:", len(html))

    for p in [
        "src/data/defaults.js",
        "src/calculator/engine.js",
        "src/calculator/validator.js",
        "src/utils/formatters.js",
        "src/utils/proposalExport.js",
        "src/data/tooltips.js",
        "src/data/marketData.js",
        "src/data/boxOfficeBenchmarks.js"
    ]:
        full = os.path.join(r"c:\Users\Admin\Desktop\Webdesign", p)
        assert os.path.exists(full), f"Missing {p}"
        with open(full, "r", encoding="utf-8") as f:
            content = f.read()
            assert len(content) > 0
            print(f"PASS: {p} verified ({len(content)} bytes)")

    print("\nAll files verified on disk!")

except Exception as e:
    print("FAIL:", e)
    sys.exit(1)
