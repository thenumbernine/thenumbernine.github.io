#!/usr/bin/env bash
for f in `find . -type f -name .git`; do sh -c "cd `dirname -- $f` && git pull"; done
