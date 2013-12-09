# Network Errors

What are the reasons why an application may receive an error back even if the write was successful. Check all that apply.


(OK) The network TCP network connection between the application and the server was reset between the time of the write and the time of the getLastError call.

(OK) The MongoDB server terminates between the write and the getLastError call.

(OK) The network fails between the time of the write and the time of the getLastError call

The write violates a primary key constraint on the collection and must be rolled back.
