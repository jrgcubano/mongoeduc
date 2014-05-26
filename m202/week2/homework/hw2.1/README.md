# Homework: Homework 2.1: Readahead scenarios

Under which of the following scenarios would you improve performance significantly by increasing readahead? Assume, unless the problem states otherwise, that:
You're working with a system where your indexes and part of your working set fit in memory
You're not constrained by write locks


(OK) Documents are often accessed in natural order sequentially

(OK) You are using a spinning disk, rather than an SSD

You very rarely access that portion of your data that is on disk

The working set is larger than memory