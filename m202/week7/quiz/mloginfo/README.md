# Quiz: mtools: mloginfo

A few lessons ago you investigated the number of connections in a log file using hand-written shell pipelines. If you installed mtools, try doing the same thing using mloginfo instead.

# Answer
mloginfo's usage message shows its options:
mloginfo -h
usage: mloginfo [-h] [--version] [--no-progressbar] [--verbose]
                [--connections] [--distinct] [--queries]
                [--sort {namespace,pattern,count,min,max,mean,95%,sum}]
                [--restarts]
                [logfile [logfile ...]]

Extracts general information from logfile and prints it to stdout.

positional arguments:
  logfile               logfile(s) to parse

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
  --no-progressbar      disables progress bar
  --verbose             show more verbose output (depends on info section)

info sections:
  Below commands activate additional info sections for the log file.

  --connections         outputs information about opened and closed
                        connections
  --distinct            outputs distinct list of all log line by message type
                        (slow)
  --queries             outputs statistics about query patterns
  --sort {namespace,pattern,count,min,max,mean,95%,sum}
  --restarts            outputs information about every detected restart
mloginfo --connections mongod.log
     source: mongod.log
      start: 2014 Apr 05 06:39:57
        end: 2014 Apr 06 06:27:07
date format: ctime-pre2.4
     length: 58224
     binary: mongod
    version: 2.2.3

CONNECTIONS
     total opened: 24853
     total closed: 24719
    no unique IPs: 9
socket exceptions: 37

192.0.2.2        opened: 16120     closed: 16113   
127.0.0.1        opened: 2837      closed: 2832    
192.0.2.4        opened: 2677      closed: 2674    
192.0.2.3        opened: 2621      closed: 2620    
192.0.2.8        opened: 133       closed: 107     
192.0.2.5        opened: 126       closed: 122     
192.0.2.7        opened: 122       closed: 98      
192.0.2.10       opened: 110       closed: 74      
192.0.2.6        opened: 107       closed: 79      


