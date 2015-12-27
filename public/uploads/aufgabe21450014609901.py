import hashlib

correctLines = [line for line in open("aufgabe2", 'r') if (line.startswith('aa') or line.endswith('ee\n'))]
print hashlib.md5(("").join(map(lambda x: x.strip(), sorted(correctLines)))).hexdigest()