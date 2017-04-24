#!/usr/bin/env bash

set -e

rm -rf docs
cp -r out docs
cp tools/index.head.rst docs/index.rst
for d in docs/*
do
    if [ -d $d ]
    then
        app=$(basename $d)
        echo $app > docs/$app.rst
        cat tools/mod.head.rst >> docs/$app.rst
        echo "   $app" >> docs/index.rst
        for f in $d/*.rst
        do
            mod=$(basename $f .rst)
            moddir=$(dirname $f)
            echo "   $app/$mod" >> docs/$app.rst
        done
    fi
done

echo "" >> docs/index.rst

