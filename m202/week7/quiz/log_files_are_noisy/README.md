# Quiz: Log files are noisy

Download and extract the handout if you haven't already. Using grep or some other method, determine the type of error encountered in the most recent socket exception. Enter the type of error (without the surrounding brackets) in the text field below. The error should be of the form XXXXXXX_ERROR.

# Answer
You can find this out in the shell by running
grep "socket exception" mongod.log
The output probably won't fit on one screen, but you only need to see the last line:
Apr  5 22:06:18 m202-ubuntu mongod.27017[17999]: Fri Apr  5 22:06:18
[rsHealthPoll] replSet info m202-ubuntu-3:27017 is down (or slow to respond):
socket exception [CONNECT_ERROR] for m202-ubuntu-3:27017
You could also open the file in vim or less, jump to the end with G, and search backward for "socket exception" with ?socket exception.
