import fitz
import glob
import os
import time
from PIL import Image

src = r"C:\Users\shlok\Desktop\shlokportfolio.github.io\CERTI\*.pdf"
src_upper = r"C:\Users\shlok\Desktop\shlokportfolio.github.io\CERTI\*.PDF"
out = r"C:\Users\shlok\Desktop\shlokportfolio.github.io\Spiderman Themed Portfolio\public\images\certificates"
os.makedirs(out, exist_ok=True)

files = set(glob.glob(src) + glob.glob(src_upper))
for f in files:
    try:
        doc = fitz.open(f)
        page = doc.load_page(0)
        pix = page.get_pixmap()
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        name = os.path.basename(f)[:-4] + ".webp"
        img.save(os.path.join(out, name), "webp")
        print(f"Converted {name}")
    except Exception as e:
        print(f"Failed to convert {f}: {e}")
