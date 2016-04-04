
/*
 * GET home page.
 */

exports.index = function(req, res) {

var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');

var Investments = [];
var Countries = [];
var Contributions = [];
var Investments_by_year = [];
var g_data = [];
var num,year,amount;
var count=0;
p_data = [];
var parser = parse({delimiter: ','});
var type = parse({delimiter: ','});
var years = parse({delimiter: ','});
var Investment_by_country = fs.createReadStream('../WebApplication/Data/country_total_investments.csv');
var Investment_type = fs.createReadStream('../WebApplication/Data/investment_type.csv');
var Investment_year = fs.createReadStream('../WebApplication/Data/Investments_by_year.csv');


years.on('readable', function(){
  while(record = years.read()){
  	year = Number(record[0]);
  	amount = Number(record[1]);
	if(count>2){
		Investments_by_year.push([year,amount]);
		}
    count=3;
  }
});



parser.on('readable', function(){
  while(record = parser.read()){
  	if(count!=0){	
  	num = Number(record[3])*10
  	num = num.toFixed(5);
    Contributions.push(num);
    Countries.push(record[1]);
    Investments.push(record[2]);
    }
    count=1;
  }
});

var p_data = []; // create an empty array
var names = [];
var values = [];
type.on('readable', function(){
  while(record = type.read()){
  	if(count>=1){
		names.push(record[0]);
		values.push(Number(record[1]));
    }
    count=2;
  }
});
// Catch any error
parser.on('error', function(err){
  console.log(err.message);
});

var p_ledgend = [];

type.on('finish', function(){
	console.log("type loaded....");
	for (var i=0;i<names.length;i++){
	p_data.push({
		name : names[i],
		value : values[i]
	});	
	}
	console.log(p_data);
});

years.on('finish', function(){
	console.log("years loaded....");
});

parser.on('finish', function(){
    console.log("loaded...");
	
});


var category_freq = fs.createReadStream('../WebApplication/Data/category_freq.csv');

var category = parse({delimiter: ','});

var categories = [];

category.on('readable', function(){
  while(record = category.read()){
  if(count>3){
      categories.push(record[2]);
    }
    count=4;
  }
});

category.on('finish', function(){
    console.log("categories loaded...");
      res.render('index', { total_companies:1, total_investments:2, total_acquisitions:3, total_funded_rounds:4, Investments:Investments, Countries:Countries, Contributions:Contributions, piedata:p_data,
                                                pieledgend:p_ledgend, graphdata:Investments_by_year,categories:categories});

  
});

Investment_type.pipe(type);
Investment_year.pipe(years);
Investment_by_country.pipe(parser);
category_freq.pipe(category);
    
};



