import scrapy
import CrunchBase
from selenium import webdriver

class LoginSpider(scrapy.Spider):
    name = 'Login'
    start_urls = ["https://www.crunchbase.com/funding-rounds"]
    handle_httpstatus_list = [416]
    def parse(self, response):
    	return scrapy.FormRequest.from_response(
            response,
            formname='demoForm',
            method='post',
            formdata={'first_name':'zubair','last_name':'hussain','email': 'zubairhussain918@gmail.com','city':'islamabad'},
            callback=self.after_login
        )
        

    def after_login(self, response):
    	print 'response of login : ', response.body