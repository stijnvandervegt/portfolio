#!/bin/bash
FILES=*
for i in $FILES
do
    echo "Prcoessing image $i ..."

    /usr/bin/convert -define jpeg:size=300x220 $i  -thumbnail 300x220^ -gravity center -extent 300x220  thumb.$i

done