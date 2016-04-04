
import scrapy
from scrapy.conf import settings
from scrapy.crawler import CrawlerProcess


class CrunchBase_Spider(scrapy.Spider):
	name= "CrunchBase"
	allowed_domains = ["crunchbase.com"]
	start_urls = ["https://www.crunchbase.com/funding-rounds"]
	handle_httpstatus_list = [416]



	def parse(self,response,request):
		if settings['dont_obey_robotstxt']:
			print "true"
		companyDomain = response.xpath('//title/text()').extract()
		print 'response : ',response.status
		