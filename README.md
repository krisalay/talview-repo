Simple Documentation
===================
This micro-service is just a prototype. Some of the validations are not considered like if by mistake user uploads a png/jpg file then, it may throw error. This validations are not handled due to the time constraints.

PREREQUISITE
===
install ffmpeg globally in your system.

PRIMARY STEP
===
Add the aws credentials in .env file of the root folder.

STEP 1
===
Create folders "uploads" and "thumbnails" in the root directory.

STEP 2
===
Upload any .mp4 file using the below api, and the screen shots will be saved in the folder: thumbnails/.

APIs
===
/api/upload
This api used to upload the media file onto the server.

example:  curl -F 'data=@test.mp4' http://localhost:4000/api/upload


1. CI has been integrated using travis.
2. The logic for uploading the raw and processed data has been implemented in lib/utils/aws-s3.js file, but it has not been integrated in the code because of the lack of S3 api. My aws account has been suspended, and creation of new aws account was giving error for some reason.  