#!/bin/bash

if [ -z $1 ]
  then
    echo "No argument supplied"
    exit 1
fi

echo "FILE: $1"
if [ ${PORT+x} ]; then
    echo "PORT: $PORT"
    echo "listen $PORT;" > $1
else
    echo "PORT: default"
fi
