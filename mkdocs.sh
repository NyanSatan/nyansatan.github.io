#/bin/bash

mkdocs build -d /tmp/site -f __mkdocs/mkdocs.yml
find /tmp/site -type d -depth 1 -exec cp -R {} . ';'
