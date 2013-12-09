# Write Concert

Notes:
w (write concern)
w : 1 (number of mongo replica)
w : 2 or 3 
w : "j" (if we crash we can recover the data based on the journal (j)
w : majority ...


Question:

What happens if we specify a write concern larger than the number of nodes we currently have up?


(OK) The write waits forever.

The driver throws an error.

The server throws an error.

The write goes to as many nodes as possible then the driver returns success.
