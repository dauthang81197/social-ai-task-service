INSERT INTO public.system_config ("key",value,"group",description) VALUES
	 ('AWS_CLOUD_FRONT_DOMAIN','https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/','SYSTEM','cdn AWS develop');


UPDATE public.review_files
SET "path" = REPLACE("path", 'https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/', 'https://cdn.com/')
WHERE "path" LIKE 'https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/%'


UPDATE public.plans
SET "image" = REPLACE("image", 'https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/', 'https://cdn.com/')
WHERE "image" LIKE 'https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/%'

UPDATE public.announcements
SET "image" = REPLACE("image", 'https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/', 'https://cdn.com/')
WHERE "image" LIKE 'https://shp23232-dev.s3.ap-southeast-2.amazonaws.com/%'