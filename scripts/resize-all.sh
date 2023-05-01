#!/bin/sh
for size in 16 32 48 128 256; do
	./scripts/render-svg.sh $size
done
