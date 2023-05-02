#!/bin/sh
# it requires "Times new roman" font by default
resvg ./images/logo.svg -w $1 -h $1 "./public/icons/logo-${1}x${1}.png"
