#!/bin/sh
# Lädt den OpenMoji-Vollsatz (CC BY-SA 4.0) einmalig nach buch/.openmoji/ (nicht im Repo).
# Danach kopiert build.py nur die tatsächlich benutzten Icons nach buch/icons/.
cd "$(dirname "$0")/.." && npm pack openmoji@15.1.0 --silent && mkdir -p .openmoji && tar xzf openmoji-15.1.0.tgz -C .openmoji && rm openmoji-15.1.0.tgz
