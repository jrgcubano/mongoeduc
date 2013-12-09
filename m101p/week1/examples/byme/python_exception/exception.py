import sys

try:
	print 5/0
except:
	print "exception ", sys.exc_info()[0]
