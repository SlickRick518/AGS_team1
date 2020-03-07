import sys
import xml
import csv
from collections import namedtuple
import requests
from typing import NamedTuple

def main():
    if len(sys.argv) > 1 :
    read_file(sys.argv[1])
    
class ImportData(NamedTuple):
    id: int
    name: str
    num: int

def read_file(x):
    if x.find(".csv") > 0:
        read_csv(x)
    elif x.find(".json") > 0:
        read_json(x)
    elif x.find(".xml") > 0:
        read_xml(x)

def read_json(x):
    print("read_json")

def read_csv(x):
    with open(x) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            print(row)
            struct = ImportData(row['id'],row['name'],row['num'])
            print(struct)

def read_xml(x):
    print("read_xml")


main()
