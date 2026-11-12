#!/usr/bin/env python3
import json
from pathlib import Path

source_dir = Path("/usr/share/games/fortunes/off")
out_file = Path(__file__).resolve().with_name("fortunes.json")


def rot13(value: str) -> str:
    chars = []
    for ch in value:
        if "a" <= ch <= "z":
            offset = ord("a")
            chars.append(chr(((ord(ch) - offset + 13) % 26) + offset))
        elif "A" <= ch <= "Z":
            offset = ord("A")
            chars.append(chr(((ord(ch) - offset + 13) % 26) + offset))
        else:
            chars.append(ch)
    return "".join(chars)


fortunes = []
for path in sorted(source_dir.iterdir()):
    if not path.is_file():
        continue
    if path.name.endswith(".dat") or path.name.endswith(".u8"):
        continue

    text = path.read_text(encoding="utf-8", errors="replace")
    for chunk in text.split("%"):
        fortune = chunk.strip().replace("\r", "")
        if fortune:
            fortunes.append(rot13(fortune))

if not fortunes:
    raise SystemExit(f"No fortunes found in {source_dir}")

out_file.write_text(json.dumps(fortunes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(fortunes)} fortunes to {out_file}")
