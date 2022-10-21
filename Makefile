#==========INSTRUCTIONS=============#
#
# You'll have to replace the following fields 
# 1. `-i ~/.ssh/app` with the path to the private identity for the ssh target
# 2. `/var/www/app/` with the path to where you've hosted your app on the ssh target 
#
#==========INSTRUCTIONS=============#

deploy:
	ssh -i ~/.ssh/app user@api.example.com:/var/www/app/update

deploy_staging:
	ssh -i ~/.ssh/app user@api.staging.example.com:/var/www/app/update