from selenium import webdriver
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get("https://www.crunchbase.com/funding-rounds")

first_name = driver.find_element_by_id('first_name')
last_name = driver.find_element_by_id('last_name')
email = driver.find_element_by_id('email')
city = driver.find_element_by_id('city')

first_name.send_keys('Zubair')
last_name.send_keys('Hussain')
email.send_keys('abc@hotmail.com')
city.send_keys('islamabad')

driver.find_element_by_class_name('btn-lg').click()

title=driver.find_element_by_tag_name('title')

print title


driver.close()
