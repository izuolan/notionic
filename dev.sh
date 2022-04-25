#!/bin/bash
kill $(ps -ef | grep -v grep | grep yarn | awk '{print $2}') 2>/dev/null 
kill $(ps -ef | grep -v grep | grep next | awk '{print $2}') 2>/dev/null 
yarn dev
