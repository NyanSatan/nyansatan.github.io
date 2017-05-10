#!/bin/sh
rm -rf Packages Packages.bz2
dpkg-scanpackages -m . /dev/null >Packages
bzip2 -k -z Packages