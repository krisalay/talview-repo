Simple Documentation
===================
This micro-service is just a prototype. Some of the validations are not considered like if by mistake user uploads a png/jpg file then, it may throw error. This validations are not handled due to the time constraints.

STEP 1: Create folders "uploads" and "thumbnails" in the root directory.
STEP 2: Upload any .mp4 file using the below api, and the screen shots will be saved in the folder: thumbnails/.

APIs: /api/upload, This api used to upload the media file onto the server.
example:  curl -F 'data=@test.mp4' http://localhost:4000/api/upload